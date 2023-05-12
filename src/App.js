import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import Login from "./components/Login";
import Alert from "./components/Alert";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminTemplate from "./components/AdminTemplate";
import AdminCompany from "./components/AdminCompany";
import NewCompany from "./components/NewCompany";
import Products from "./components/Products";
import NewProduct from "./components/NewProduct";

function App() {
  const [alert, setAlert] = useState({
    type: "",
    msg: "",
    show: false,
  });

  const toggleAlert = (type, msg) => {
    setAlert({ type, msg, show: true });
  };

  const hideAlert = () => {
    setAlert({ type: "", msg: "", show: false });
  };

  //Routes
  const Home = () => <Login alert={toggleAlert} close={hideAlert}></Login>;

  const Admin = () => (
    <ProSidebarProvider>
      <AdminTemplate alert={toggleAlert} />
      <div className="admin-content">
        <AdminCompany alert={toggleAlert} close={hideAlert} />
      </div>
    </ProSidebarProvider>
  );

  const CreateCompany = () => (
    <ProSidebarProvider>
      <AdminTemplate alert={toggleAlert} />
      <div className="admin-content">
        <NewCompany alert={toggleAlert} close={hideAlert} />
      </div>
    </ProSidebarProvider>
  );

  const ShowCompanyProducts = () => (
    <ProSidebarProvider>
      <AdminTemplate alert={toggleAlert} />
      <div className="admin-content">
        <Products alert={toggleAlert} close={hideAlert} />
      </div>
    </ProSidebarProvider>
  );

  const CreateProduct = () => (
    <ProSidebarProvider>
      <AdminTemplate alert={toggleAlert} />
      <div className="admin-content">
        <NewProduct alert={toggleAlert} close={hideAlert} />
      </div>
    </ProSidebarProvider>
  );
  return (
    <div className="App">
      {alert.show && (
        <Alert type={alert.type} msg={alert.msg} close={hideAlert} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/home" element={<Admin />} />
        <Route path="/admin/addCompany" element={<CreateCompany />} />
        <Route path="/admin/company/:nit" element={<ShowCompanyProducts />} />
        <Route path="/admin/addProduct/:nit" element={<CreateProduct />} />
      </Routes>
    </div>
  );
}

export default App;
