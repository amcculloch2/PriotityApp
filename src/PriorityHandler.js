import React, {useState} from "react";
import PriorityList from "./PriorityList";
import PriorityForm from "./PriorityForm";

export default function PriorityHandler() {
    const [priorities, setPriorities] = useState(initialisePriorities());
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priorityCount, setPriorityCount] = useState(initialisePriorityCount());
    const [priorityId, setPriorityId] = useState(initialisePriorityId());
    const [validation, setValidation] = useState("");

    function initialisePriorities() {
        const prioritiesJson = localStorage.getItem("priorities");
        if (prioritiesJson == null) {
            return [];
        }
        return JSON.parse(prioritiesJson);
    }

    function initialisePriorityCount() {
        return priorities.length + 1;
    }

    function initialisePriorityId() {
        let maxId = 0;
        for (const p in priorities) {
            if (p.id >= maxId) {
                maxId = p.id + 1;
            }
        }
        return maxId;
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        if (!name) {
            setValidation("Priorities must have a name TEST.");
            return;
        }
        if (!description) {
            setValidation( "Priorities must have a description.");
            return;
        }
        if (priorityCount > 3) {
            setValidation("You can have a maximum of 3 top priorities.");
            return;
        }
        setPriorityCount(previousCount => previousCount + 1);
        setPriorityId(previousId => previousId + 1);
        setPriorities([...priorities, {
            name: name,
            description: description,
            id: priorityId,
            tasks: []
        }]);
        setName("");
        setDescription("");
        setValidation("");
    }

    function removePriority(id) {
        setPriorityCount(previousCount => previousCount - 1);
        const newList = priorities.filter((item) => item.id !== id);
        newList.sort(function(a, b){return a.id - b.id});
        setPriorities(newList);
        localStorage.setItem("priorities", JSON.stringify(newList));
    }

    function saveState(priority) {
        const newList = priorities.filter((item) => item.id !== priority.id);
        newList.push(priority);
        newList.sort(function(a, b){return a.id - b.id});
        setPriorities(newList);
        localStorage.setItem("priorities", JSON.stringify(newList));
    }

    return <>
        <PriorityForm name={name} setName={setName} description={description} setDescription={setDescription} onFormSubmit={handleFormSubmit} validation={validation}/>
        <PriorityList priorities={priorities} removePriority={removePriority} saveState={saveState}></PriorityList>
    </>
}