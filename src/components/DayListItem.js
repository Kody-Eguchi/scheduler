import React from 'react';
import classNames from "classnames";
import "components/DayListItem.scss";

function DayListItem(props) {

  const dayClass = classNames({
    "day-list__item" : true,
    "day-list__item--selected": props.name === props.day,
    "day-list__item--full": !props.spots 
  });

  const formatSpots = (spot) => {
    if (spot === 0) {
      return "no spots remaining"
    } 

    if (spot ===1 ) {
      return "1 spot remaining"
    }

    return `${spot} spots remaining`
  }


  return (
    <li onClick={() =>props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  )
}

export default DayListItem
