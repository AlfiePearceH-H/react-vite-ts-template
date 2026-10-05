import './error.css'
export function ServerError() {
    return (
        <div id="errorContainer">
            <h1 id="serverHead">500</h1>
            <p id="serverBody">An unexpected server error occured</p>
        </div>
    )
}