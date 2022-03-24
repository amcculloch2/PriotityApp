import './App.css';
import { faAngleDown, faAngleUp, faCheckCircle, faCircle} from '@fortawesome/free-solid-svg-icons'
import {library} from "@fortawesome/fontawesome-svg-core";
import React, {useState, useEffect} from "react";
import Context from "./Context";

function App() {
    library.add(faAngleDown, faAngleUp, faCheckCircle, faCircle)

    const [contexts, setContexts] = useState([]);
    const [currentContext, setCurrentContext] = useState("Work");

    useEffect(() => {
        fetch("https://qc66xh7bse.execute-api.us-east-2.amazonaws.com/getcontexts")
            .then(response => response.json())
            .then(data => {
                setContexts(data);
            })
    }, [])

  return (
      <div className="App">
          <header className="App-header">
              <div>
                  <p>Context</p>
                  <ul className="contextsList">
                      {contexts?.map(context => <li key={context.contextName}>
                          <button className="listedContext" onClick={() => setCurrentContext(context)}>{context.contextName}</button>
                      </li>)}
                  </ul>
              </div>
              <h1>Top Priorities</h1>
              <p>History</p>
          </header>
          <Context contextName={currentContext.contextName} contextId={currentContext._id}></Context>
      </div>
  );
}

export default App;
