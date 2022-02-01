import React from "react";
import Priority from "./Priority";

export default function PriorityList(props) {
    const priorities = props.priorities;
    const removePriority = props.removePriority;
    const saveState = props.saveState;

    return <ol className="priorityList">
        {priorities?.map(priority => <li className="priorityListItem" key={priority.id}>
            <Priority details={priority} removePriority={removePriority} saveState={saveState}/>
            </li>)}
    </ol>;

}