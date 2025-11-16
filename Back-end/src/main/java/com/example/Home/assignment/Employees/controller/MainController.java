package com.example.Home.assignment.Employees.controller;

import com.example.Home.assignment.Employees.Employee;
import com.example.Home.assignment.Employees.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("api/main/")
@CrossOrigin
@RequiredArgsConstructor
public class MainController {

    private final MainService mainService;


    @GetMapping("employees")
    public List<Employee> getAllEmployees(){
        return mainService.getAllEmployees();
    }

    @GetMapping("employee/{id}")
    public Employee getEmployee(@PathVariable int id){
        return mainService.getEmployee(id);
    }

    @PutMapping
    public void updateEmployee(@RequestBody Employee employee) throws SQLException {
        mainService.updateEmployee(employee);
    }

    @PostMapping
    public String addEmployee(@RequestBody Employee employee){
        mainService.addEmployee(employee);
        return "Employee added!";
    }

    @DeleteMapping("{id}")
    public void deleteEmployee(@PathVariable int id) throws SQLException {
        mainService.deleteEmployee(id);
    }

}
