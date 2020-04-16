import React, { useState, useEffect, createRef } from 'react';
import { API } from 'aws-amplify';
import {useSelector} from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import EventModal from "./EventModal";

const googleEventToEvent = (item) => ({
  id: item.id,
  title: item.summary,
  start: item.start.dateTime || item.start.date, // try timed. will fall back to all-day
  end: item.end.dateTime || item.end.date, // same
  location: item.location,
  description: item.description
});

const Calendar = ({ sub }) => {
  const [events, setEvents] = useState();
  const [selected, setSelected] = useState();
  const user = useSelector(state => state.user.user);
  const calendarRef = createRef();

  useEffect(() => {
    if (!sub) return;
    API.get('api', '/google/events', { queryStringParameters: { sub } }).then(
      (data) => {
        setEvents(data.map(googleEventToEvent));
      }
    )
  }, [sub]);

  const handleDateSelect = (arg) => {
    if (arg.allDay) return;
    setSelected(arg);
  };

  const onEventClick = (info) => {
    console.log(info);
    setSelected(info.event);
  };

  const onSaveEvent = (data) => {
    setSelected();
    const event = {
      id: data.id,
      start: data.start,
      end: data.end,
      summary: data.title,
      sub,
    };
    API.post('api', '/google/events', { body: event }).then(
      (event) => {
        const updatedEvents = events.map(e => e.id === event.id ? googleEventToEvent(event) : e);
        if (!data.id) {
          updatedEvents.push(googleEventToEvent(event))
        }
        setEvents(updatedEvents);
      }
    );
  };

  const onDeleteEvent = () => {
    const { id } = selected;
    setSelected();
    API.del('api', `/google/events/${user.sub}/${id}`).then(
      () => {
        setEvents(events.filter(e => e.id !== id));
      }
    );
  };

  return (
    <div>
      <div>
        { !events ? <CircularProgress  /> : (
          <FullCalendar
            selectable
            selectMirror
            selectOverlap={false}
            ref={calendarRef}
            height="auto"
            defaultView="dayGridMonth"
            aspectRatio={1.8}
            eventOverlap={false}
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            events={events}
            select={handleDateSelect}
            eventClick={onEventClick}
          />
        )}
      </div>
      { selected && <EventModal onSubmit={onSaveEvent} event={selected} onDelete={onDeleteEvent} onClose={() => setSelected()} />}
    </div>
  )
};

export default Calendar;
