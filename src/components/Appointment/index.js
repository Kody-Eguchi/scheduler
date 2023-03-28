import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = async (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    try {
      await props.bookInterview(props.id, interview);
      transition(SHOW);
    } catch (err) {
      transition(ERROR_SAVE, true);
    }
  };

  const erase = async () => {
    transition(DELETING, true);
    try {
      await props.cancelInterview(props.id);
      transition(EMPTY);
    } catch (err) {
      transition(ERROR_SAVE, true);
    }
  };

  const edit = () => {
    transition(EDIT);
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} save={save} />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CONFIRM && (
        <Confirm
          cancelInterview={erase}
          back={back}
          message={"Are you sure you would like to delete?"}
        />
      )}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          confirm={() => transition(CONFIRM)}
          edit={edit}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          save={save}
        />
      )}
      {mode === ERROR_SAVE && <Error back={back} message={""} />}
    </article>
  );
}

export default Appointment;
