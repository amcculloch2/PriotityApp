import React from "react";

export default function TaskForm(props) {
    return <form onSubmit={props.onFormSubmit}>
        <label htmlFor="taskName" className="taskName"></label>
        <input type="text" value={props.task} onChange={e => props.setTask(e.target.value)} id="task-name" className="text-field"/>
    </form>
}