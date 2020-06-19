import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'

import { Appointment, AppointmentsDayView } from '../src/Appointment';

describe('Appointment', () => {
  let customer, container

  beforeEach(() => {
    container = document.createElement('div');
  });

  const render = component => ReactDOM.render(component, container);

  it('renders the customer first name', () => { 
    customer = { firstName: 'Ashley' };
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch('Ashley'); 
  });  
  it('renders the customer first name', () => { 
    customer = { firstName: 'Jordan' };
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch('Jordan'); 
  });  
})

describe('AppointmentDayView', () => {
  const today = new Date()
  const appointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: {firstName: 'Ashley'}
    },
    {
      startsAt: today.setHours(11, 0),
      customer: {firstName: 'Jordan'}
    }
  ]

  let container;

  beforeEach(() => {
    container = document.createElement('div')
  })

  const render = component => ReactDOM.render(component, container)

  it('render a div with the right id', () => {
    render(<AppointmentsDayView appointments={[]} />)
    expect(container.querySelector('div#appointmentsDayView')).not.toBeNull()
  })

  it('renders multiple appointments in an ol element', () => { 
    render(<AppointmentsDayView appointments={appointments} />)
    expect(container.querySelector('ol')).not.toBeNull();
    expect(container.querySelector('ol').children).toHaveLength(appointments.length);
  })

  it('renders each appointment in an li', () => { 
    render(<AppointmentsDayView appointments={appointments} />)
    expect(container.querySelectorAll('li')).toHaveLength(2)
    expect(container.querySelectorAll('li')[0].textContent).toEqual('12:00')
    expect(container.querySelectorAll('li')[1].textContent).toEqual('11:00')
  })


  it('initially shows a message saying there are no appointments today', () => {
    render(<AppointmentsDayView appointments={[]} />); 
    expect(container.textContent).toMatch('There are no appointments scheduled for today.'); 
  }); 
  
  it('it does not show a message when there are appointment today', () => {
    render(<AppointmentsDayView appointments={appointments} />); 
    expect(container.querySelectorAll('.no-appointment-msg')).toHaveLength(0)
  });

  it('selects the first appointment by default', () => { 
    render(<AppointmentsDayView appointments={appointments} />); 
    expect(container.textContent).toMatch('Ashley');
  });


  it('it has a button element in each li', () => {
    render(<AppointmentsDayView appointments={appointments} />); 
    expect(container.querySelectorAll('li > button')).toHaveLength(appointments.length)
    expect(container.querySelectorAll('li > button')[0].type).toEqual('button')
  })

  it('renders another appointment when selected', () => { 
    render(<AppointmentsDayView appointments={appointments} />); 
    const button = container.querySelectorAll('button')[1]; 
    ReactTestUtils.Simulate.click(button); 
    expect(container.textContent).toMatch('Jordan');
  });

 

})