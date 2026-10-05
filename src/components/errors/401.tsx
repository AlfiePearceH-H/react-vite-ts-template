import './error.css'
export function PermissionDenied() {
    return (
        <div id="errorContainer">
            <h1 id="permissionDeniedHead">401</h1>
            <p id="permissionDeniedBody">!Permission Denied!</p>
        </div>
    )
}