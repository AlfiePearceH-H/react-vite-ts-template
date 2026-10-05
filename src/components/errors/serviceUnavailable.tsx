import './error.css'
export function ServiceUnavailable() {
    return (
        <div id="errorContainer">
            <h1 id="serviceUnavailableHead">503</h1>
            <p id="serviceUnavailableBody">Service is temporarily unavailable</p>
        </div>
    )
}