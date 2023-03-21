import React from 'react';
import DayListItem from './DayListItem';

function DayList(props) {
  const dayListItemArr = props.days.map(day => {
    return (
    <DayListItem key={day.id} {...day} setDay={props.setDay} day={props.day}/>
    )
  })

  return (
    <ul>
      {dayListItemArr}
    </ul>
  )
}

export default DayList
