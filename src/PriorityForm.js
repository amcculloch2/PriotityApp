import React from "react";

export default function PriorityForm(props) {
    return <form onSubmit={props.onFormSubmit}>
        <div>
            <label htmlFor="priority-name">Priority:</label>
            <input type="text" value={props.name} onChange={e => props.setName(e.target.value)} id="priority-name" placeholder="Enter the name of the priority" className="textfield"/>
        </div>
        <div>
            <label htmlFor="priority-description">Description:</label>
            <input type="text" value={props.description} onChange={e => props.setDescription(e.target.value)} id="priority-name" placeholder="Enter a description for the priority" className="textfield"/>
        </div>
        <div className="validation-message">{props.validation}</div>
        <input type="submit" value="Add priority"/>

    </form>
}