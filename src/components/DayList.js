import React from 'react';
import DayListItem from './DayListItem';

function DayList(props) {
  const dayListItemArr = props.days.map(day => {
    return (
    <DayListItem 
      key={day.id} 
      {...day} 
      setDay={props.onChange} 
      selected={day.name === props.value}/>
    );
  })

  return (
    <ul>
      {dayListItemArr}
    </ul>
  )
}

export default DayList
