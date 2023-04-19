package com.fahim.crud.crud;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentService {

	private final StudentRepository studentRepository;
	@Autowired
	public StudentService(StudentRepository studentRepository) {
		this.studentRepository = studentRepository;
	}

    public List<Students> getStudents() {
		
		return studentRepository.findAll();
	}

	public void addNewStudent(Students student) {

		Optional<Students> studentOptional = studentRepository.findStudentByEmail(student.getEmail());
		if(studentOptional.isPresent()) {
			throw new IllegalStateException("email taken");
		}
		studentRepository.save(student);

	}

	public void deleteStudent(Long studentId) {
		// TODO Auto-generated method stub
		boolean exists = studentRepository.existsById(studentId);
		if(!exists) {
			throw new IllegalStateException("student with id " + studentId + " does not exists");
		}
		studentRepository.deleteById(studentId);
	}

	@Transactional
	public void updateStudent(Long studentId,Students students ){
		Students student = studentRepository.findById(studentId).orElseThrow(() -> new IllegalStateException("student with id " + studentId + " does not exists"));
		if(students.getName() != null && students.getName().length() > 0 && !students.getName().equals(student.getName())) {
			student.setName(students.getName());
		}

		if(students.getEmail() != null && students.getEmail().length() > 0 && !students.getEmail().equals(student.getEmail())) {
			Optional<Students> studentOptional = studentRepository.findStudentByEmail(students.getEmail());
			if(studentOptional.isPresent()) {
				throw new IllegalStateException("email taken");
			}
			student.setEmail(students.getEmail());
		}

		if(students.getDob() != null && students.getDob().length() > 0 && !students.getDob().equals(student.getDob())) {
			student.setDob(students.getDob());
		}

		if(students.getAge() != null && !students.getAge().equals(student.getAge())) {
			student.setAge(students.getAge());
		}
	}
}
