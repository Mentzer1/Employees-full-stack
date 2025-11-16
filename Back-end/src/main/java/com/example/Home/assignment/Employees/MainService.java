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
        if (employeeRepository.existsById(employee.getId())) // if the employee does already exist
            employeeRepository.save(employee); // save the new data
        else
            throw new EmployeeException("Employee not found!"); // else dont
    }

    public String addEmployee(Employee employee) {
        List<Employee> employees = employeeRepository.findAll(); // get all employees

        for (Employee emp : employees){ // for each employee
            if (emp.getEmail().equals(employee.getEmail())) //if the email equals the email of the employee we are trying to add
                throw new EmployeeException("Email already exists"); // throw an exception
        }
        employeeRepository.save(employee); //else add the employee
        return "New employee added";
    }

    public String deleteEmployee(int employeeID){
        employeeRepository.deleteById(employeeID);
        return "Employee deleted";
    }

}
