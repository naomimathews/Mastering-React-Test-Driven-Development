
import React, {useState} from 'react';


const appointmentTimeOfDay = startsAt => {
  const [h, m] = new Date(startsAt).toTimeString().split(':'); 
  return `${h}:${m}`;
}

export const Appointment = ({customer}) => <div>{customer.firstName}</div>;

export const AppointmentsDayView = ({appointments = []}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  return (
    <div id='appointmentsDayView'>
      {appointments.length ? <ol>
        {appointments.map((appointment, idx) => (
          <li key={idx}>
            <button type='button' onClick={() => setSelectedIndex(idx)}>
              {appointmentTimeOfDay(appointment.startsAt)}
            </button>
          </li>
        ))}
      </ol> : 
      <div className='no-appointment-msg'>There are no appointments scheduled for today.</div>}
      {appointments.length && selectedIndex >=0 && <Appointment {...appointments[selectedIndex]} />}
    </div>
  )
}