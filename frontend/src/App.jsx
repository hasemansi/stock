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
import Role from './components/Pages/Roles/Role';
import AddRole from "./components/Pages/Roles/AddRole";
import UpdateRole from "./components/Pages/Roles/UpdateRole";
import Faculty from "./components/Pages/Faculty/Faculty";
import AddFaculty from "./components/Pages/Faculty/AddFaculty";
import UpdateFaculty from "./components/Pages/Faculty/UpdateFaculty";
import DeptFaculty from "./components/Pages/DeptFaculty/DeptFaculty";
import AddDeptFaculty from "./components/Pages/DeptFaculty/AddDeptFaculty";
import UpdateDeptFaculty from "./components/Pages/DeptFaculty/UpdateDeptFaculty";
import DashboardHome from "./components/Auth/DashboardHome";
import Suppliers from "./components/Pages/Suppliers/Supplier";
import AddSupplier from "./components/Pages/Suppliers/AddSupplier";
import UpdateSupplier from "./components/Pages/Suppliers/UpdateSupplier";
import Product from "./components/Pages/Products/Product";
import AddProduct from "./components/Pages/Products/AddProduct";
import UpdateProduct from "./components/Pages/Products/UpdateProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/colleges" element={<College />} />
        <Route path="/add-college" element={<AddCollege />} />
        <Route path="/update-college/:id" element={<UpdateCollege />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/add-department" element={<AddDepartment />} />
        <Route path="/update-department/:id" element={<UpdateDepartment />} />
        <Route path="/roles" element={<Role />} />
        <Route path="/add-role" element={<AddRole />} />
        <Route path="/update-role/:id" element={<UpdateRole />} />
        <Route path="/faculties" element={<Faculty />} />
        <Route path="/add-faculty" element={<AddFaculty />} />
        <Route path="/update-faculty/:id" element={<UpdateFaculty />} />
        <Route path="/dept-faculty" element={<DeptFaculty />} />
        <Route path="/add-deptfaculty" element={<AddDeptFaculty />} />
        <Route path="/update-deptfaculty/:id" element={<UpdateDeptFaculty />} />
         <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/add-supplier" element={<AddSupplier />} />
        <Route path="/update-supplier/:id" element={< UpdateSupplier />} />
        <Route path="/products" element={<Product />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/update-product/:id" element={< UpdateProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
