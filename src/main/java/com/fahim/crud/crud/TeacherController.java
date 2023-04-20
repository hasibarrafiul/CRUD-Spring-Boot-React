package com.fahim.crud.crud;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path="/api/v1/teacher")
public class TeacherController {
	private final TeacherService teacherService;

	@Autowired
	public TeacherController(TeacherService teacherService) {
		this.teacherService = teacherService;
	}
	
    @GetMapping("")
	public List<Teacher> getTeachers() {
		return teacherService.getTeacher();
	}

	@PostMapping("")
	public void registerNewTeacher(@RequestBody Teacher teacher) {
		// TODO Auto-generated method stub
		teacherService.addNewTeacher(teacher);
	}

	@DeleteMapping("{teacherId}")
	public void deleteTeache(@PathVariable("teacherId") Long teacherId) {
		// TODO Auto-generated method stub
		teacherService.deleteTeacher(teacherId);
	}

	@PutMapping("{teacherId}")
	public void updatetTeache(@PathVariable("teacherId") Long teacherId, @RequestBody Teacher teacher) {
		// TODO Auto-generated method stub
		teacherService.updateTeacher(teacherId, teacher);
	}

}
