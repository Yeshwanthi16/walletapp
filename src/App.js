import { createMemoryHistory } from "history";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Page/Auth/Login";
import Register from "./Page/Auth/register";
import Dashboard from "./Page/dashboard";

function App() {
  // const history = createMemoryHistory();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={localStorage.getItem("token") ? <Dashboard /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
