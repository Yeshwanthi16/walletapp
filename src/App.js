import { createMemoryHistory } from 'history';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./Page/Auth/Login";

function App() {

      // const history = createMemoryHistory();
      return (
        <Router>
          <>
            {/* {localStorage.getItem("token") ? <Dashboard /> : <Login />}    */}
            <Login />
          </>
        </Router>
      );
    }


export default App;
