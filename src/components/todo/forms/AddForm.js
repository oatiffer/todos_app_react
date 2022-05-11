import { useState } from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import { buildRequest } from "../../../modules/request";
import css from "./AddForm.module.css";

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

export const AddForm = ({ onSubmitFunc }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    try {
      const json = buildRequest('get', 'http://127.0.0.1:8000/api/users');
      json.then((data) => setUserList(data));
    } catch(error) {
      console.log(error);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      description: '',
      user: undefined,
    },
    validate,
    onSubmit: (values) => {
      onSubmitFunc(values.description, values.user);
      values.description = "";
    },
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <div>
        <label className={css.label} htmlFor="description">
          Add task:
        </label>
        <input
          className={css.text}
          type="text"
          id="description"
          name="description"
          value={formik.values.description}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder="Add new task"
        />
        {formik.touched.description && formik.errors.description ? (
          <div className={css.error}>{formik.errors.description}</div>
        ) : null}
      </div>
      <div>
        <label className={css.label} htmlFor="user">
          Assign to:
        </label>
        <select
          className={css.select}
          id="user"
          name="user"
          value={formik.values?.user}
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
      <button className={css.submit} type="submit">
        Add
      </button>
    </form>
  );
};
