import React from 'react'

export default function Priority(props) {
    const {removePriority, details} = props;

    return <div className="priority">
            <p className="priorityName">{details.name}</p>
            <button className="priorityDone" onClick={() => removePriority(details.id)}>Done</button>
        <p className="priorityDescription">{details.description}</p>
        </div>
}