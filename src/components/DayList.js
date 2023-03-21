import React from 'react';
import DayListItem from './DayListItem';


const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

function DayList(props) {
  const dayListItemArr = days.map(day => {
    return (
    <DayListItem key={day.id} {...day}/>
    )
  })

  return (
    <ul>
      {dayListItemArr}
    </ul>
  )
}

export default DayList
