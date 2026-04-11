package com.student.student.Service;

import com.student.student.Model.StudentModel;
import com.student.student.Repository.RegisterRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StudentService {
    private final RegisterRepo registerRepo;

    public StudentService(RegisterRepo registerRepo) {
        this.registerRepo = registerRepo;
    }

    public StudentModel getMostRegistration() {
        Map<String, Integer> count = new HashMap<>();

        List<StudentModel> students = registerRepo.findAll();
        for(StudentModel s: students){
            if (count.containsKey(s.getRollNo()))
                count.put(s.getRollNo(), count.get(s.getRollNo())+1);
            else
                count.put(s.getRollNo(), 0);
        }
        String max_roll = "";
        Integer max_count = -1;
        for(String roll: count.keySet()){
            if(count.get(roll) > max_count){
                max_count = count.get(roll);
                max_roll = roll;
            }
        }
        return registerRepo.findByRollNo(max_roll);
    }
}
