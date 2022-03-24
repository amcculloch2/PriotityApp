import React, {useState, useEffect} from "react";
import PriorityList from "./PriorityList";
import PriorityForm from "./PriorityForm";

export default function Context(props) {
    const contextName = props.contextName;
    const contextId = props.contextId;

    const [priorities, setPriorities] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priorityCount, setPriorityCount] = useState(0);
    const [priorityId, setPriorityId] = useState(0);
    const [validation, setValidation] = useState("");


    useEffect(() => {
        const fetchUrl = "https://cuch3cwk71.execute-api.us-east-2.amazonaws.com/getprioritiesfromcontext?contextId="+contextId;
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setPriorities(data?.map(priority => createPriority(priority)));
                    setPriorityCount(data.length);
                    setPriorityId(data[data.length - 1]["_id"] + 1);
                } else {
                    setPriorities([]);
                    setPriorityCount(0);
                    setPriorityId(0);
                }
            })
    }, [contextId]);

    function createPriority(priority) {
        return {
            id: priority._id,
            name: priority.priorityName,
            description: priority.priorityDescription
        }
    }

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
            setValidation("You can have a maximum of 3 top priorities.");
            return;
        }
        setPriorityCount(previousCount => previousCount + 1);
        setPriorities([...priorities, {
            id: priorityId,
            name: name,
            description: description
        }]);
        saveNewPriority();
        setName("");
        setDescription("");
        setValidation("");
    }

    function saveNewPriority() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                priorityName: name,
                priorityDescription: description,
                contextId: contextId
            })
        };
        fetch('https://dvjrni9q02.execute-api.us-east-2.amazonaws.com/putpriorities', requestOptions)
            .then(response => console.log(response));
    }

    function removePriority(id) {
        setPriorityCount(previousCount => previousCount - 1);
        const newList = priorities.filter((item) => item.id !== id);
        newList.sort(function(a, b){return a.id - b.id});
        setPriorities(newList);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({priorityId: id})
        };
        fetch("https://k6gqwdx9d8.execute-api.us-east-2.amazonaws.com/remove-priority", requestOptions)
            .then(response => console.log(response));
    }

    return <>
        <PriorityForm name={name} setName={setName} description={description} setDescription={setDescription} onFormSubmit={handleFormSubmit} validation={validation}/>
        <h2>{contextName}</h2>
        <PriorityList priorities={priorities} removePriority={removePriority}></PriorityList>
    </>
}
