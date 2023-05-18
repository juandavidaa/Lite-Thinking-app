import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import CompanyService from "../services/CompanyService";
import "./AdminCompany.css";
import AuthService from "../services/AuthService";
const AdminCompany = (props) => {
  const [companies, setCompanies] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const companyService = new CompanyService();
  const authService = new AuthService();
  const deleteCompany = (id, index) => {
    authService.isAdmin().then((response) => {
      const status = response.status;
      if (status === 200) {
        response.json().then((data) => {
          companyService.deleteCompany(id).then((response) => {
            if (response.status === 200) {
              response.json().then((data) => {
                props.alert("success", "Company was deleted");
                navigate("/admin/home");
              });
            } else {
              props.alert(
                "danger",
                "Please remove company's products before deleting"
              );
            }
          });
        });
      } else {
        navigate("/");
      }
    });
  };
  useEffect(() => {
    const fetchCompanies = () => {
      authService.isAdmin().then((response) => {
        const status = response.status;
        if (status === 200) {
          response.json().then((data) => {
            setIsAdmin(data.admin === 1);
            companyService
              .getCompanies()
              .then((response) => response.json())
              .then((data) => setCompanies(data));
          });
        } else {
          navigate("/");
        }
      });
    };

    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div>
        {isAdmin && (
          <div className="text-end">
            <Link to="/admin/addCompany">
              <button className="btn btn-primary btn-lg">+</button>
            </Link>
          </div>
        )}
        {companies.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover  ">
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>Nit</th>
                  <th>Name</th>
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company.nit}>
                    <td>
                      <img src={company.image_url} alt="logo" height="20" />
                    </td>
                    <td>{company.nit}</td>
                    <td>{company.name}</td>
                    {isAdmin && (
                      <td>
                        <Link to={`/admin/company/${company.nit}`}>
                          <i className="bi bi-list-ol text-primary fs-4"></i>
                        </Link>
                        <i
                          className="bi bi-trash text-danger fs-4"
                          onClick={() => deleteCompany(company.nit)}
                        ></i>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCompany;
