import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Auth/Dashboard";
import College from "./components/Pages/getCollege/College";
import AddCollege from "./components/Pages/addClg/addCollege";
import UpdateCollege from "./components/Pages/updateClg/UpdateCollege";
import Departments from "./components/Pages/Department/Departments";
import AddDepartment from "./components/Pages/Department/AddDepartment";
import UpdateDepartment from "./components/Pages/Department/UpdateDepartment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/colleges" element={<College />} />
        <Route path="/add-college" element={<AddCollege />} />
        <Route path="/update-college/:id" element={<UpdateCollege />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/add-department" element={<AddDepartment />} />
        <Route path="/update-department/:id" element={<UpdateDepartment />} />
      </Routes>
    </Router>
  );
}

export default App;
