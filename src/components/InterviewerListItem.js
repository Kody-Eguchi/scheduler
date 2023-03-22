import React from 'react';
import 'components/InterviewerListItem.scss';
import classNames from "classnames";

function InterviewerListItem(props) {

  const InterviewerClass = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": props.id === props.number,
  });

  return (
    <li className={InterviewerClass} onClick={()=> props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      { props.id === props.number && <span>{props.name}</span>}
    </li>
  )
}

export default InterviewerListItem
