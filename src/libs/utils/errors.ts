export class NotImplementedError extends Error {
    constructor(message = "Not implemented") {
        super(message);
        this.name = "NotImplementedError";
        Object.setPrototypeOf(this, new.target.prototype); //Fix Prototype chain
    }
}