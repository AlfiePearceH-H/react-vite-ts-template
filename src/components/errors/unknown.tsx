import './error.css'
export function Unkown({error} : {error: string}) {
    return (
        <div id="errorContainer">
            <p id="unkownErrorMessage">{error}</p>
        </div>
    )
}