import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment/index"

import selectors from "helpers/selectors";

import "components/Application.scss";


import appointments from 'components/appointmentData';

export default function Application() {

  const [day, setDay] = useState([]);
  const [days, setDays] = useState([]);

  //API REQUEST FOR DAYS DATA
  useEffect(() => {
    axios.get('/api/days').then(res => {
     setDays(res.data);
    })
  }, [days])
  
  
  
  const appointmentArr = Object.values(appointments).map(appointment => {
    return <Appointment key={appointment.id} {...appointment}/>
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            value={day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentArr}
      </section>
    </main>
  );
}
