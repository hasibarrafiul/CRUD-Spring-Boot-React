package com.fahim.crud.crud;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;

@RestController
@RequestMapping(path="/api/v1/students")
public class StudentController {
	private final StudentService studentService;

	public StudentController(StudentService studentService) {
		this.studentService = studentService;
	}
	
    @GetMapping("/")
	public ArrayList<Students> getStudents() {
		
		return studentService.getStudents();
	}
}
