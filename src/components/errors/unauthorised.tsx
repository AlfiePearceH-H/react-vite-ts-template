import './error.css'
export function Unauthorised() {
    return (
        <div id="errorContainer">
            <h1 id="permissionDeniedHead">401</h1>
            <p id="permissionDeniedBody">!Permission Denied! - You do not have access to this resource</p>
        </div>
    )
}