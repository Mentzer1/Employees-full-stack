import axios from "axios";
import type { EmployeeModel } from "./Employee";


const url = "http://localhost:8080/api/main/";


export async function getAllEmployeesApi(){
    return (await axios.get<EmployeeModel[]>(url + "employees")).data;
}

export async function getOneEmployeeApi(id: number){
    return (await axios.get<EmployeeModel>(url + "employee/" + id)).data;
}

export async function updateEmployeeApi(employee: EmployeeModel){
    return (await axios.put<void>(url, employee));
}

export async function addEmployeeApi(employee: EmployeeModel){
    return (await axios.post<void>(url, employee));
}

export async function deleteEmployeeApi(id:number){
    return (await axios.delete<void>(url + id));
}
