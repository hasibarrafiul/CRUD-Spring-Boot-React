package com.fahim.crud.crud;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path="/api/v1/students")
public class StudentController {
	private final StudentService studentService;

	@Autowired
	public StudentController(StudentService studentService) {
		this.studentService = studentService;
	}
	
    @GetMapping("")
	public List<Students> getStudents() {
		
		return studentService.getStudents();
	}

	@PostMapping("")
	public void registerNewStudent(@RequestBody Students student) {
		// TODO Auto-generated method stub
		studentService.addNewStudent(student);
	}

	@DeleteMapping("{studentId}")
	public void deleteStudent(@PathVariable("studentId") Long studentId) {
		// TODO Auto-generated method stub
		studentService.deleteStudent(studentId);
	}

}
