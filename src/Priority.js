import React, {useState} from 'react'
import TaskForm from "./TaskForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Task from "./Task";

export default function Priority(props) {
    const {removePriority, details} = props;
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [taskCounter, setTaskCounter] = useState(0);
    const [showTasks, setShowTasks] = useState(false);

    function handleFormSubmit(event) {
        event.preventDefault();
        setTasks([...tasks, {
            taskName: task,
            taskId: taskCounter
        }]);
        setTask("");
        setTaskCounter((prevState => prevState+1));
    }

    function removeTask(id) {
        const newList = tasks.filter((item) => item.taskId !== id);
        setTasks(newList);
    }

    function showHideTasks() {
        setShowTasks(prevState => !prevState);
    }

    return <div className="priority">
            <p className="priorityName">{details.name}</p>
            <button className="priorityDone" onClick={() => removePriority(details.id)}>Done</button>
            <p className="priorityDescription">{details.description}</p>
            <button className="showHideTasks" onClick={() => showHideTasks()}><FontAwesomeIcon icon={showTasks ? "angle-up" : "angle-down"} /></button>
            <div className="tasks" hidden={!showTasks}>
                <ul className="taskList">
                    {tasks?.map(taskItem => <Task taskName={taskItem.taskName} taskId={taskItem.taskId} removeTask={removeTask}/>)}
                </ul>
                <TaskForm task={task} setTask={setTask} onFormSubmit={handleFormSubmit}/>
            </div>
        </div>
}