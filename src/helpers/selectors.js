

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

// export function getAppointmentsForDay(state, day) {
  
//   const filteredAppointment = [];
//   if (state.days.length === 0) return filteredAppointment;
//   const matchedDay = state.days.filter(eachDay => eachDay.name === day);
 
//   if (matchedDay.length === 0) return filteredAppointment;
//   for (const appointmentNum of matchedDay[0].appointments) {
  
//     for(const appointment of Object.values(state.appointments)) {
     
//       if(appointment.id === appointmentNum) {
//         filteredAppointment.push(appointment)
        
//       }
//     }
//   }
 
//   return filteredAppointment;
// }


