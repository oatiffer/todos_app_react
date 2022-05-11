import { useState } from "react";
import { EditForm } from "../forms/EditForm.js";
import Checkbox from "../checkbox/Checkbox";
import css from "./Task.module.css";

export const Task = ({ task, onClickFunc, onCheckedFunc, onSubmitFunc }) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className={css.task}>
      <Checkbox task={task} onCheckedFunc={onCheckedFunc} />
      {!editing ? (
        <>
          <div className={css.spanContainer}>
            <span
              className={css.descSpan}
              style={{
                color: task.completed ? "darkgray" : "",
                textDecoration: task.completed ? "line-through" : "",
              }}
            >
              {task.description}
            </span>
            <span
              className={css.userSpan}
              style={{
                color: task.completed ? "darkgray" : "",
                textDecoration: task.completed ? "line-through" : "",
              }}
            >
              Assigned to: {task.user.name}
            </span>
          </div>
          <div className={css.btnContainer}>
            <button className={css.editBtn} onClick={() => setEditing(true)}>
              <i className="fas fa-edit fa-lg"></i>
            </button>
            <button className={css.delBtn} onClick={() => onClickFunc(task.id)}>
              <i className="far fa-trash-alt fa-lg"></i>
            </button>
          </div>
        </>
      ) : (
        <EditForm
          task={task} 
          onSubmitFunc={onSubmitFunc}
          setEditingFunc={() => setEditing(false)}
        />
      )}
    </div>
  );
};
