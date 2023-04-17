package com.fahim.crud.crud;
import java.util.ArrayList;
import org.springframework.stereotype.Component;

@Component
public class StudentService {
    public ArrayList<Students> getStudents() {
		ArrayList<Students> students= new ArrayList<Students>();
		students.add(new Students(1L, "Fahim", 24, "1997-01-01", "fahim@gmail.com"));
		students.add(new Students(2L, "Hasib", 22, "1997-01-01", "hasib@gmail.com"));
		return students;
	}
}
