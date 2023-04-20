package com.fahim.crud.crud;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long>{

    @Query("SELECT s FROM Students s WHERE s.email = ?1")
    Optional<Teacher> findTeacherByEmail(String email);
}
