import './error.css'
export function Unauthorised() {
    return (
        <div id="errorContainer">
            <h1 id="unauthorisedHead">401</h1>
            <p id="unauthorisedBody">!Permission Denied! - You do not have access to this resource</p>
        </div>
    )
}