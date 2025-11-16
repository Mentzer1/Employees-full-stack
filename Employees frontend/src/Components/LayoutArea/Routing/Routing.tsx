import type { JSX } from "react";
import { AddEmployee } from "../../AddEmployee/AddEmployee";
import { Home } from "../../Home/Home";
import "./Routing.css";
import { Route, Routes } from "react-router-dom";
import { UpdateEmployee } from "../../UpdateEmployee/UpdateEmployee";


export function Routing(): JSX.Element {
    return (
		<Routes>
            <Route path="/" Component={Home} />
            <Route path="/employee_add" Component={AddEmployee} />
            <Route path="/update_employee/:id" Component={UpdateEmployee} />

        </Routes>

    );
}
