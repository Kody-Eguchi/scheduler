//HELPER FUNCTION FOR RETURNING APPOINTMENTS OF GIVEN DAY
export function getAppointmentsForDay(state, day) {
  const appointments = state.appointments;
  const days = state.days;

  const dayObj = days.find((d) => d.name === day);
  if (!dayObj) {
    return [];
  }

  const appointmentIds = dayObj.appointments;
  const filteredAppointments = appointmentIds.map((id) => appointments[id]);

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

export function getInterview(state, interview) {
  if (interview === null) return null;
  const allAppointmentWithInterview = Object.values(state.appointments).filter(
    (appointment) => appointment.interview != null
  );

  const matchedInterview = allAppointmentWithInterview.filter(
    (a) => a.interview.student === interview.student
  );

  for (const interviewer of Object.values(state.interviewers)) {
    if (interviewer.id === matchedInterview[0].interview.interviewer) {
      matchedInterview[0].interview.interviewer = interviewer;
    }
  }

  return matchedInterview[0].interview;
}

export function getInterviewersForDay(state, day) {
  const interviewers = state.interviewers;
  const days = state.days;

  const dayObj = days.find((d) => d.name === day);
  if (!dayObj) {
    return [];
  }

  const interviewerIds = dayObj.interviewers;
  // console.log(interviewerIds);

  const filteredInterviewers = interviewerIds.map((id) => interviewers[id]);
  // console.log(filteredInterviewers )
  return filteredInterviewers;
}
