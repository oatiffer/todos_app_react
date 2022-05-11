import {Task} from './Task.js'

export const TaskList = (props) => {
    return props.taskList.map((task) => <Task key={task.id} task={task} {...props} />);
  };