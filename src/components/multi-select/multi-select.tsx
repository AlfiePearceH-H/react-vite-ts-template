import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import "./multi-select.css";

interface MultiSelectContextValue {
  selected: ReadonlySet<string>;
  toggle(value: string): void;
}

const MultiSelectContext = createContext<MultiSelectContextValue | null>(null);

interface MultiSelectProps {
  children: ReactNode;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

interface OptionProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
}

interface OptGroupProps {
  label: string;
  children: ReactNode;
}

export default function MultiSelect({
  children,
  value,
  defaultValue = [],
  onChange,
  placeholder = "Select options",
  disabled = false,
}: MultiSelectProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<CSSProperties>();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const dialogId = useId();
  const selectedValues = value ?? uncontrolledValue;
  const selected = new Set(selectedValues);

  const toggle = useCallback(
    (optionValue: string) => {
      const next = new Set(selectedValues);

      if (next.has(optionValue)) {
        next.delete(optionValue);
      } else {
        next.add(optionValue);
      }

      const nextValue = Array.from(next);
      if (value === undefined) {
        setUncontrolledValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [onChange, selectedValues, value],
  );

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const bounds = trigger.getBoundingClientRect();
    const viewportPadding = 8;
    const width = Math.min(
      Math.max(bounds.width, 200),
      window.innerWidth - viewportPadding * 2,
    );
    const left = Math.max(
      viewportPadding,
      Math.min(
        bounds.left,
        window.innerWidth - width - viewportPadding,
      ),
    );
    const maxHeight = Math.min(384, window.innerHeight - viewportPadding * 2);
    const spaceBelow = window.innerHeight - bounds.bottom - viewportPadding;
    const spaceAbove = bounds.top - viewportPadding;
    const openAbove = spaceBelow < Math.min(200, maxHeight) && spaceAbove > spaceBelow;
    const availableHeight = openAbove ? spaceAbove : spaceBelow;

    setPosition({
      position: "fixed",
      top: openAbove
        ? bounds.top - 4 - Math.min(maxHeight, availableHeight)
        : bounds.bottom + 4,
      left,
      width,
      maxHeight: Math.max(0, Math.min(maxHeight, availableHeight)),
      zIndex: 10000,
    });
  }, []);

  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;
      if (
        target instanceof Node &&
        !triggerRef.current?.contains(target) &&
        !dialogRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, updatePosition]);

  const contextValue = { selected, toggle };
  const dialog =
    isOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={dialogRef}
            id={dialogId}
            className="multi-select-dialog"
            role="dialog"
            aria-label="Select options"
            style={position}
          >
            <MultiSelectContext.Provider value={contextValue}>
              {children}
            </MultiSelectContext.Provider>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="multi-select">
      <button
        ref={triggerRef}
        type="button"
        className="multi-select-button dropdown-chevron"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={dialogId}
        disabled={disabled}
        onClick={() => setIsOpen((open) => !open)}
      >
        {selectedValues.length > 0
          ? `${selectedValues.length} selected`
          : placeholder}
      </button>
      {dialog}
    </div>
  );
}

export function Option({ value, children, disabled = false }: OptionProps) {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error("Option must be used inside a MultiSelect.");
  }

  return (
    <label className="multi-select-option">
      <input
        type="checkbox"
        value={value}
        checked={context.selected.has(value)}
        disabled={disabled}
        onChange={() => context.toggle(value)}
      />
      <span>{children}</span>
    </label>
  );
}

export function OptGroup({ label, children }: OptGroupProps) {
  if (!useContext(MultiSelectContext)) {
    throw new Error("OptGroup must be used inside a MultiSelect.");
  }

  return (
    <fieldset className="multi-select-group">
      <legend>{label}</legend>
      {children}
    </fieldset>
  );
}
