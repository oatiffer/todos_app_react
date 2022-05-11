import { useState } from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import { buildRequest } from "../../../modules/request";
import css from "./EditForm.module.css";

const validate = (values) => {
  const errors = {};

  if (!values.description) {
    errors.description = "Required";
  } else if (values.description.length > 200) {
    errors.description = "Must be 200 characters or less";
  }

  if (!values.user) {
    errors.user = "Required";
  }

  return errors;
};

export const EditForm = ({ task, onSubmitFunc, setEditingFunc }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    try {
      const json = buildRequest("get", "http://127.0.0.1:8000/api/users");
      json.then((data) => setUserList(data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      description: task.description,
      user: task.user.id,
    },
    validate,
    onSubmit: (values) => {
      onSubmitFunc(task.id, values.description, values.user);
      setEditingFunc();
    },
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <div className={css.inputContainer}>
        <div className={css.textContainer}>
          <textarea
            className={css.text}
            id="description"
            name="description"
            value={formik.values.description}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          ></textarea>
          {formik.touched.description && formik.errors.description ? (
            <div className={css.error}>{formik.errors.description}</div>
          ) : null}
        </div>
        <div className={css.selectContainer}>
          <label className={css.label} htmlFor="user">
            Assign to:
          </label>
          <select
            className={css.select}
            id="user"
            name="user"
            value={formik.values.user}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          >
            {userList.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
          {formik.touched.user && formik.errors.user ? (
            <div className={css.error}>{formik.errors.user}</div>
          ) : null}
        </div>
      </div>
      <div className={css.btnContainer}>
        <button className={css.submit} type="submit">
          <i className="fas fa-save fa-lg"></i>
        </button>
      </div>
    </form>
  );
};
