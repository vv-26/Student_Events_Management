package com.student.faculty.Service;

import com.student.faculty.Model.EventModel;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;

@Service
public class EventService {
    private final RestTemplate restTemplate;

    public EventService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public EventModel addEvent(EventModel model) {
        String url = "http://localhost:8081/event/add";
        ResponseEntity<EventModel> response = restTemplate.postForEntity(url, model, EventModel.class);
        if (response.getStatusCode().is2xxSuccessful())
                return response.getBody();
        return null;
    }

    public EventModel updateEvent(String eventId, String facultyId, EventModel model) {
        String url = "http://localhost:8081/event/update/" + eventId + "/" + facultyId;
        HttpEntity<EventModel> request = new HttpEntity<>(model);
        ResponseEntity<EventModel> response = restTemplate.exchange(url, HttpMethod.PUT, request, EventModel.class);
        if (response.getStatusCode().is2xxSuccessful())
            return response.getBody();
        return null;
    }

    public EventModel deleteEvent(String eventId, String facultyId) {
        String url = "http://localhost:8081/event/delete/" + eventId + "/" + facultyId;
        ResponseEntity<EventModel> response = restTemplate.exchange(url, HttpMethod.DELETE, null, EventModel.class);
        if (response.getStatusCode().is2xxSuccessful())
                return response.getBody();
        return null;
    }

    public EventModel[] viewEventsByMonth(Integer month, String facultyId) {
        LocalDate start = LocalDate.of(LocalDate.now().getYear(), month, 1);
        LocalDate end = start.plusMonths(1).minusDays(1);
        String url = "http://localhost:8081/event/"+ start + "/" + end + "/" + facultyId ;
        ResponseEntity<EventModel[]> response = restTemplate.getForEntity(url, EventModel[].class);

        if (response.getStatusCode().is2xxSuccessful())
                return response.getBody();
        return null;
    }
}
