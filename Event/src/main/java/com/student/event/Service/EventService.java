package com.student.event.Service;

import com.student.event.Model.EventModel;
import com.student.event.Repository.EventRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class EventService {
    private final EventRepo evRepo;

    public EventService(EventRepo evRepo) {
        this.evRepo = evRepo;
    }

    public EventModel[] getEventsByRollNo(String rollNo) {
        return evRepo.findByRollNo(rollNo);
    }

    public EventModel addEvent(EventModel ev) {
        return evRepo.save(ev);
    }

    public EventModel updateEvent(String eventId, String facultyId, EventModel ev) {
        EventModel model = evRepo.findByEventId(eventId);
        if(model==null)
            return null;
        if (!facultyId.equals(model.getFacultyId()))
            return null;
        if (ev.getStudName() != null)
            model.setStudName(ev.getStudName());

        if (ev.getEventName() != null)
            model.setEventName(ev.getEventName());

        if (ev.getRollNo() != null)
            model.setRollNo(ev.getRollNo());

        if (ev.getEventLocation() != null)
            model.setEventLocation(ev.getEventLocation());

        if (ev.getEventDate() != null)
            model.setEventDate(ev.getEventDate());

        if (ev.getEventDescription() != null)
            model.setEventDescription(ev.getEventDescription());

        return evRepo.save(model);

    }

    public EventModel deleteEvent(String eventId, String facultyId) {
        return evRepo.deleteByEventIdAndFacultyId(eventId, facultyId);
    }

    public EventModel[] viewEventsByMonth(LocalDate start, LocalDate end, String facultyId) {
        return evRepo.findEventsByFacultyAndDateRange(facultyId, start.toString(), end.toString());
    }


}
