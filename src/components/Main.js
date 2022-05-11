import { useState, useEffect } from "react";
import { AddForm } from "./todo/forms/AddForm.js";
import { TaskList } from "./todo/tasklist/TaskList.js";
import { buildRequest } from "../modules/request.js";
import css from "./Main.module.css";

export const Main = () => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    try {
      const json = buildRequest("get", "http://127.0.0.1:8000/api/tasks");
      json.then((data) => setTaskList(data));
    } catch(error) {
      console.log(error);
    }
  }, []);

  const addTask = async (description, user_id) => {
    console.log(description)
    const data = await buildRequest("post", "http://127.0.0.1:8000/api/tasks", { description, user_id });
    setTaskList([...taskList, data]);
  };

  const completeTask = async (id, completed) => {
    try {
      const data = await buildRequest("patch", `http://127.0.0.1:8000/api/tasks/${id}`, { completed });
      
      setTaskList(() => {
        return taskList.map((task) => {
          if (task.id === id) {
            return data;
          }
          
          return task;
        });
      });
    } catch(error) {
      console.log(error);
    }
  };

  const updateTask = async (id, description, userId) => {
    try {
      const data = await buildRequest("patch", `http://127.0.0.1:8000/api/tasks/${id}`, { user_id: userId, description });
      
      setTaskList(() => {
        return taskList.map((task) => {
          if (task.id === id) {
            return data;
          }
          
          return task;
        });
      });
    } catch(error) {
      console.log(error);
    }
  };

  const deleteTask = (id) => {
    try {
      buildRequest('delete', `http://127.0.0.1:8000/api/tasks/${id}`);
      setTaskList((taskList.filter((task) => task.id !== id)));
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div className={css.form}>
        <AddForm
          onSubmitFunc={addTask}
        />
      </div>
      <div className={css.tasklist}>
        <TaskList
          taskList={taskList}
          onClickFunc={deleteTask}
          onCheckedFunc={completeTask}
          onSubmitFunc={updateTask}
        />
      </div>
    </main>
  );
};
