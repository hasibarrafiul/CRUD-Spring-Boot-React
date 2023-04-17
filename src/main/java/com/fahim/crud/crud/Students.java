package com.fahim.crud.crud;

public class Students {
    private Long id;
    private String name;
    private Integer age;
    private String dob;
    private String email;

    public Students(Long id, String name, Integer age, String dob, String email) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.dob = dob;
        this.email = email;
    }

    public Students(String name, Integer age, String dob, String email) {
        this.name = name;
        this.age = age;
        this.dob = dob;
        this.email = email;
    }

    public Students() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String toString(){
        return "Student{"+
                "id="+id+
                ", name='"+name+'\''+
                ", age="+age+
                ", dob='"+dob+'\''+
                ", email='"+email+'\''+
                '}';
    }
}
