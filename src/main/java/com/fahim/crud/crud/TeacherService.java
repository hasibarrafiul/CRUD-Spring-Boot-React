package com.fahim.crud.crud;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TeacherService {

	private final TeacherRepository teacherRepository;
	@Autowired
	public TeacherService(TeacherRepository teacherRepository) {
		this.teacherRepository = teacherRepository;
	}

    public List<Teacher> getTeacher() {
		
		return teacherRepository.findAll();
	}

	public void addNewTeacher(Teacher teacher) {

		Optional<Teacher> teacherOptional = teacherRepository.findTeacherByEmail(teacher.getEmail());
		if(teacherOptional.isPresent()) {
			throw new IllegalStateException("email taken");
		}
		teacherRepository.save(teacher);

	}

	public void deleteTeacher(Long teacherId) {
		boolean exists = teacherRepository.existsById(teacherId);
		if(!exists) {
			throw new IllegalStateException("student with id " + teacherId + " does not exists");
		}
		teacherRepository.deleteById(teacherId);
	}

	@Transactional
	public void updateTeacher(Long teacherId,Teacher teacher ){
		Teacher teachers = teacherRepository.findById(teacherId).orElseThrow(() -> new IllegalStateException("student with id " + teacherId + " does not exists"));
		if(teacher.getName() != null && teacher.getName().length() > 0 && !teacher.getName().equals(teachers.getName())) {
			teachers.setName(teacher.getName());
		}

		if(teacher.getEmail() != null && teacher.getEmail().length() > 0 && !teacher.getEmail().equals(teachers.getEmail())) {
			Optional<Teacher> studentOptional = teacherRepository.findTeacherByEmail(teacher.getEmail());
			if(studentOptional.isPresent()) {
				throw new IllegalStateException("email taken");
			}
			teachers.setEmail(teacher.getEmail());
		}

		if(teacher.getDob() != null && teacher.getDob().length() > 0 && !teacher.getDob().equals(teachers.getDob())) {
			teachers.setDob(teacher.getDob());
		}

		if(teacher.getAge() != null && !teacher.getAge().equals(teachers.getAge())) {
			teachers.setAge(teacher.getAge());
		}
	}
}
