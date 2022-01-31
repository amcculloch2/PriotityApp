import './App.css';
import PriorityHandler from "./PriorityHandler";
import { faAngleDown, faAngleUp, faCheckCircle, faCircle} from '@fortawesome/free-solid-svg-icons'
import {library} from "@fortawesome/fontawesome-svg-core";

function App() {
    library.add(faAngleDown, faAngleUp, faCheckCircle, faCircle)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Top Priorities</h1>
        <PriorityHandler></PriorityHandler>
      </header>
    </div>
  );
}

export default App;
