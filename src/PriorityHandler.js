import React, {useState} from "react";
import PriorityList from "./PriorityList";
import PriorityForm from "./PriorityForm";

export default function PriorityHandler() {
    const [priorities, setPriorities] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priorityCount, setPriorityCount] = useState(1);
    const [priorityId, setPriorityId] = useState(0);
    const [validation, setValidation] = useState("");

    function handleFormSubmit(event) {
        event.preventDefault();

        if (!name) {
            setValidation("Priorities must have a name.");
            return;
        }
        if (!description) {
            setValidation( "Priorities must have a description.");
            return;
        }
        if (priorityCount > 3) {
            setValidation("You must have less than 3 top priorities.");
            return;
        }
        setPriorityCount(previousCount => previousCount + 1);
        setPriorityId(previousId => previousId + 1);
        setPriorities([...priorities, {
            name: name,
            description: description,
            id: priorityId
        }]);
        setName("");
        setDescription("");
        setValidation("");
    }
    function removePriority(id) {
        setPriorityCount(previousCount => previousCount - 1);
        const newList = priorities.filter((item) => item.id !== id);
        setPriorities(newList);
    }

    return <>
        <PriorityForm name={name} setName={setName} description={description} setDescription={setDescription} onFormSubmit={handleFormSubmit} validation={validation}/>
        <PriorityList priorities={priorities} removePriority={removePriority}></PriorityList>
    </>
}