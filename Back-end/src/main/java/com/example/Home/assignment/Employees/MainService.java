package com.example.Home.assignment.Employees;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class MainService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    public Employee getEmployee(int employeeID){
        return employeeRepository.findById(employeeID).orElseThrow();
    }

    public void updateEmployee(Employee employee){
        if (!employeeRepository.existsById(employee.getId())) // if the employee doesnt already exist
            throw new EmployeeException("Employee not found!"); // dont
        else if(!emailCheck(employee.getEmail())) //check if the email is acceptable
            throw new EmployeeException("Email must be gmail or outlook!"); //if not then throw
        else
            employeeRepository.save(employee); //if everything ok save
    }

    public String addEmployee(Employee employee) {
        if (employeeRepository.existsByEmail(employee.getEmail())) // if the employee does already exist
            throw new EmployeeException("Email already exists!"); // dont save the employee
        else if(!emailCheck(employee.getEmail()))//check if the email is acceptable
            throw new EmployeeException("Email must be gmail or outlook!");//if not then throw
         else
            employeeRepository.save(employee); // else save the new data

        return "New employee added";
    }

    public String deleteEmployee(int employeeID){
        employeeRepository.deleteById(employeeID);
        return "Employee deleted";
    }

    public boolean emailCheck(String email){
        if (email.endsWith("gmail.com") || email.endsWith("outlook.com")){

            return true;
        } else{
            return false;
        }
    }

}
