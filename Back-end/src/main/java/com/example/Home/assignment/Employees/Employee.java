package com.example.Home.assignment.Employees;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employees")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.PRIVATE)
    private int id;
    private String first_name;
    private String last_name;
    private String email;

}
