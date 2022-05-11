import { useState } from "react";
import css from "./Checkbox.module.css";

const Checkbox = ({ task, onCheckedFunc }) => {
  const [checked, setChecked] = useState(task.completed);

  const handleClick = () => {
    setChecked(!checked);
    onCheckedFunc(task.id, !checked);
  };

  return (
    <div
      className={css.checkbox}
      style={{ backgroundColor: checked && "lightblue" }}
      onClick={handleClick}
    >
      <i className="fas fa-check"></i>
    </div>
  );
};

export default Checkbox;
