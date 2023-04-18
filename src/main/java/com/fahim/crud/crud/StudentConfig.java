package com.fahim.crud.crud;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class StudentConfig {
    
    @Bean
    CommandLineRunner commandLineRunner(StudentRepository repository) {
        return args -> {
                Students Fahim = new Students("Fahim", 21, "1999-10-10", "fahim@gmail.com");
                Students Safa = new Students("Safa", 20, "1999-12-12", "safa@gmail.com");

                repository.saveAll(List.of(Fahim, Safa));
         };
        }
}
