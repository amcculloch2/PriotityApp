import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Task(props) {
    const {taskId, taskName, removeTask} = props;
    return <li className="taskName" key={taskId}><button className="taskDone" onClick={() => removeTask(taskId)}>
        <FontAwesomeIcon className="circle-icon" icon="circle" size="lg"/> <FontAwesomeIcon className="check-circle-icon" icon="check-circle" size="lg"/></button>{taskName}</li>
}