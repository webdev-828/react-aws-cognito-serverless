import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import moment from 'moment';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

const googleEventToEvent = (item, user) => {
  const isUserEvent = item.attendees
    ? !!item.attendees.find((i) => i.email === user.email)
    : false;
  return {
    id: item.id,
    start: item.start.dateTime || item.start.date, // try timed. will fall back to all-day
    end: item.end.dateTime || item.end.date, // same
    // url: item.htmlLink,
    location: item.location,
    title: isUserEvent ? item.summary : 'Busy',
    isUserEvent,
  };
};

const Calendar = ({ hcSub, lcSub }) => {
  const [events, setEvents] = useState();
  const [slots, setSlots] = useState([]);
  const [selected, setSelected] = useState();
  const [saving, setSaving] = useState(false);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!lcSub || !hcSub) return;
    API.get('api', '/google/events', { queryStringParameters: { sub: hcSub,  } }).then(
      (data) => {
        setEvents(data.map((e) => googleEventToEvent(e, user)).filter(e => e.isUserEvent));
      },
    );
    getSlots();
  }, [lcSub, hcSub]);

  const handleDateSelect = (arg) => {
    if (arg.allDay) return;
    setSelected(arg);
  };

  const getSlots = () => {
    API.get('api', '/calendar/slots', {
      queryStringParameters: { lcSub, hcSub, q: user.email },
    }).then((data) => {
      setSlots(data);
    });
  };

  const onSaveEvent = () => {
    const event = {
      slot: selected,
      sub: hcSub,
    };
    setSaving(true);
    API.post('api', '/google/events', { body: event }).then((event) => {
      setEvents(events.concat(googleEventToEvent(event, user)));
      setSaving(false);
      setSlots(slots.filter(s => s !== selected));
      setSelected();
    });
  };

  return (
    <div>
      <div>
        <div className="mb-5">
          <Select
            native
            style={{ width: 300, marginRight: 8 }}
            placeholder="Please select"
            inputProps={{
              name: 'slot',
              id: 'date-slot',
            }}
            name="slots"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Pick a slot</option>
            {slots.map((s) => (
              <option value={s} key={s}>
                {moment(s).format('LLL')}
              </option>
            ))}
          </Select>
          <Button
            disabled={!selected || saving}
            variant="contained"
            color="primary"
            onClick={onSaveEvent}
          >
            Submit
          </Button>
        </div>
        {!events ? (
          <CircularProgress />
        ) : (
          <FullCalendar
            selectable={false}
            selectMirror
            selectOverlap={false}
            height="auto"
            defaultView="dayGridMonth"
            aspectRatio={1.8}
            eventOverlap={false}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
            events={events}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
