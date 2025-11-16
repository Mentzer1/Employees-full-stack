import { BrowserRouter } from "react-router-dom";
import { Header } from "../Header/Header";
import { Routing } from "../Routing/Routing";
import "./Layout.css";
import type { JSX } from "react";

export function Layout(): JSX.Element {
    return (
        <div className="Layout">
        <BrowserRouter>
			<Header/>
            <Routing/>
        </BrowserRouter>
        </div>
    );
}
