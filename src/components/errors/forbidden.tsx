import './error.css'
export function Forbidden() {
    return (
        <div id="errorContainer">
            <h1 id="forbiddenHead">403</h1>
            <p id="forbiddenBody">You do not have access to this resource</p>
        </div>
    )
}