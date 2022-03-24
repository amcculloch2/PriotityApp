import React, {useState, useEffect} from 'react'
import TaskForm from "./TaskForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Task from "./Task";

export default function Priority(props) {
    const {removePriority, details} = props;
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [taskCounter, setTaskCounter] = useState(0);
    const [showTasks, setShowTasks] = useState(false);

    useEffect(() => {
        const fetchUrl = "https://a241hj7bik.execute-api.us-east-2.amazonaws.com/gettasks?priorityId="+details.id;
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => {
                if(data) {
                    console.log(data);
                    setTasks(data?.map(task => createTask(task)));
                    setTaskCounter(data.length);
                } else {
                    setTasks([]);
                    setTaskCounter(0);
                }
            })
    }, [details.id]);

    function createTask(task) {
        return {
            taskName: task.subtask,
            taskId: task._id
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        const newList = [...tasks, {
            taskName: task,
            taskId: taskCounter
        }];
        saveNewTask();
        setTasks(newList);
        setTask("");
        setTaskCounter((prevState => prevState+1));
    }

    function saveNewTask() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subtask: task,
                priorityId: details.id
            })
        };
        fetch('https://19mek6d581.execute-api.us-east-2.amazonaws.com/put-task', requestOptions)
            .then(response => console.log(response));
    }

    function removeTask(id) {
        const newList = tasks.filter((item) => item.taskId !== id);
        setTasks(newList);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({taskId: id})
        };
        fetch("https://j9rqath45d.execute-api.us-east-2.amazonaws.com/remove-task", requestOptions)
            .then(response => console.log(response));
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