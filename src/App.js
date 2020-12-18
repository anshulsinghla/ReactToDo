import React from "react";
import "./App.css";
class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      text: "",
    };
  }

  //handle text change on input box and update state
  handleChange = (e) => {
    if (e.target.value !== "") this.setState({ text: e.target.value });
  };

  //return the remaining tasks count
  remainingTasks = () => {
    return this.state.tasks.filter((task) => task.isCompleted === false).length;
  };

  //add task to the state object
  addTask = () => {
    if (this.state.text === "") return;
    let newTask = {
      id: Date.now(),
      isCompleted: false,
      msg: this.state.text,
    };
    //console.log(newTask);

    this.setState((state) => ({ tasks: [...state.tasks, newTask], text: "" }));
  };

  //mark a task complete or incomplete
  toggleTaskStatus = (key) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === key ? { ...task, isCompleted: !task.isCompleted } : task
      ),
    }));
  };

  // reset state object to initial state
  resetTasks = () => {
    this.setState({
      tasks: [],
      text: "",
    });
  };

  render() {
    // console.log("rendering");
    //console.log(this.state);
    return (
      <>
        <h1>ToDo App</h1>
        <input
          type="text"
          placeholder="Enter your task"
          value={this.state.text}
          onChange={this.handleChange}
        />
        <input type="button" value="Add Task" onClick={this.addTask} />
        <input type="button" value="RESET" onClick={this.resetTasks} />
        <p>
          {this.remainingTasks()} out of {this.state.tasks.length} task
          remaining
        </p>
        <ul>
          {this.state.tasks.map((task) => (
            <li
              key={task.id}
              onClick={() => this.toggleTaskStatus(task.id)}
              className={task.isCompleted ? "task-done" : null}
            >
              {task.msg}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default ToDo;
