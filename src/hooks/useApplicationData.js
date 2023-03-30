import { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // const setDay = (day) => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newState = {
      ...state,
      appointments,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState((prev) => ({
        ...prev,
        appointments: { ...prev.appointments, [id]: appointment },
      }));
      updateSpots(newState, state.day);
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newState = {
      ...state,
      appointments,
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState((prev) => ({
        ...prev,
        appointments: { ...prev.appointments, [id]: appointment },
      }));
      updateSpots(newState, state.day);
    });
  };

  const updateSpots = (state, day) => {
    const newDays = [...state.days];
    const appointments = getAppointmentsForDay(state, day);

    const index = state.days.findIndex((d) => d.name === day);

    const emptySpots = appointments.filter((a) => !a.interview).length;

    const newDay = {
      ...state.days[index],
      spots: emptySpots,
    };

    newDays[index] = newDay;

    setState({
      ...state,
      days: [...newDays],
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
