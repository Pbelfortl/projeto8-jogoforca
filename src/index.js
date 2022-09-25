import reactDOM from "react-dom"
import App from "./App";

function forca () {
    return(
        <App />
    )
}

reactDOM.render(forca(), document.querySelector(".root"))