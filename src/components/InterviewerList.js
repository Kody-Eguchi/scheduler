import React from 'react';
import 'components/InterviewerList.scss';

import InterviewerListItem from './InterviewerListItem';

function InterviewerList(props) {

  const InterviewerListItemArr = props.interviewers.map(interviewer => {
  return <InterviewerListItem 
    key={interviewer.id} 
    {...interviewer} 
    number={props.interviewer} 
    setInterviewer={props.setInterviewer}
  />
})




  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {InterviewerListItemArr}
      </ul>
    </section>
  )
}

export default InterviewerList
