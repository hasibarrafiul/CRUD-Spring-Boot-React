package com.fahim.crud.crud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;

@SpringBootApplication
@RestController
public class CrudApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudApplication.class, args);
		System.out.println("Hello World");
	}

	@GetMapping("/")
	public ArrayList<String> ShowIndex() {
		ArrayList list = new ArrayList();
		list.add("Hello");
		list.add("World");
		return list;
	}

}
