package com.student.student.Controller;

import com.student.student.Model.StudentModel;
import com.student.student.Service.StudentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/mostRegistration")
    public StudentModel getMostRegistration(){
        return studentService.getMostRegistration();
    }
}
