

//HELPER FUNCTION FOR RETURNING APPOINTMENTS OF GIVEN DAY
export function getAppointmentsForDay(state, day) {
  const appointments = state.appointments;
  const days = state.days;
  
  const dayObj = days.find(d => d.name === day);
  if (!dayObj) {
    return [];
  }
  
  const appointmentIds = dayObj.appointments;
  const filteredAppointments = appointmentIds.map(id => appointments[id]);
  
  return filteredAppointments;
}


