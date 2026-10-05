import './error.css'

interface UnkownErrorProps {
    error: string
}

export function UnkownError({error = "An unkown error has occured"} : UnkownErrorProps) {
    return (
        <div id="errorContainer">
            <p id="unkownErrorMessage">{error}</p>
        </div>
    )
}