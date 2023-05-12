import React, { useState } from "react";
import CompanyService from "../services/CompanyService";
import { useNavigate } from "react-router-dom";

const NewCompany = (props) => {
  const [datos, setDatos] = useState({
    nit: "",
    name: "",
    image_url: "",
  });
  const navigate = useNavigate();
  const companyService = new CompanyService();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...datos, [name]: value };
    setDatos(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.close();
    companyService.createCompany(datos).then((response) => {
      const status = response.status;
      if (status !== 200) {
        response = response.json().then((response) => {
          props.alert("danger", response[Object.keys(response)[0]]);
          if (status === 401) {
            navigate("/");
          }
        });
      } else {
        navigate("/admin/home");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Company's NIT
        </label>
        <input
          type="number"
          onChange={(e) => handleInputChange(e)}
          className="form-control"
          name="nit"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Name
        </label>
        <input
          type="text"
          onChange={(e) => handleInputChange(e)}
          className="form-control"
          name="name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Logo
        </label>
        <input
          type="text"
          onChange={(e) => handleInputChange(e)}
          className="form-control"
          name="image_url"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default NewCompany;
