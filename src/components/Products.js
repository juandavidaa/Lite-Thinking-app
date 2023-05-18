/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import ProductService from "../services/ProductService";
import AuthService from "../services/AuthService";
import CompanyService from "../services/CompanyService";

const Products = (props) => {
  const authService = new AuthService();
  const productService = new ProductService();
  const companyService = new CompanyService();
  const componentPDF = useRef();
  const close = document.getElementById("close");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState("");
  let { nit } = useParams();

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
  });

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };
  const deleteProduct = (id, index) => {
    authService.isAdmin().then((response) => {
      const status = response.status;
      if (status === 200) {
        response.json().then((data) => {
          productService.deleteProduct(id).then((response) => {
            if (response.status === 200) {
              response.json().then((data) => {
                setProducts(products.filter((v, i) => i !== index));
                props.alert("success", "product was deleted");
              });
            } else {
              props.alert("danger", "Couldn't delete product");
            }
          });
        });
      } else {
        props.alert("danger", "Couldn't delete product");
      }
    });
  };

  const sendPDF = (e) => {
    e.preventDefault();
    close.click();
    authService.isAdmin().then((response) => {
      const status = response.status;
      if (status === 200) {
        response.json().then((data) => {
          productService.sendPDF(nit, email).then((response) => {
            if (response.status === 200) {
              response.json().then((data) => {
                props.alert("success", "Email was sent!");
              });
            } else {
              response.json().then((data) => {
                props.alert("danger", data.message);
              });
            }
          });
        });
      } else {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    const fetchProducts = () => {
      authService.isAdmin().then((response) => {
        const status = response.status;
        if (status === 200) {
          response.json().then((data) => {
            companyService
              .getProducts(nit)
              .then((response) => response.json())
              .then((data) => setProducts(data));
          });
        } else {
          navigate("/");
        }
      });
    };
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <div>
        <div className="text-end">
          <Link to={`/admin/addProduct/${nit}`}>
            <button className="btn btn-primary btn-lg">+</button>
          </Link>
          <button className="btn btn-secondary btn-lg" onClick={generatePDF}>
            <i className="bi bi-printer"></i>
          </button>
          <button
            className="btn btn-success btn-lg"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="bi bi-send"></i>
          </button>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Email
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={sendPDF}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      onChange={(e) => handleEmailChange(e)}
                      className="form-control"
                      name="email"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    id="close"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Send Email
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {products.length > 0 && (
          <div className="table-responsive" ref={componentPDF}>
            <table className="table table-hover  ">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>quantity</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <img src={product.image_url} alt="logo" height="20" />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                    <td>
                      <i
                        className="bi bi-trash text-danger fs-4"
                        onClick={() => deleteProduct(product.id, index)}
                      ></i>
                    </td>
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

export default Products;
