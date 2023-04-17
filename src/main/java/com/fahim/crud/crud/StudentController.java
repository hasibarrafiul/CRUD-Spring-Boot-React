package com.fahim.crud.crud;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;

@RestController
@RequestMapping(path="/api/v1/students")
public class StudentController {
    @GetMapping("/")
	public ArrayList<Students> getStudents() {
		ArrayList<Students> students= new ArrayList<Students>();
		students.add(new Students(1L, "Fahim", 24, "1997-01-01", "fahim@gmail.com"));
		students.add(new Students(2L, "Hasib", 22, "1997-01-01", "hasib@gmail.com"));
		return students;
	}
}
