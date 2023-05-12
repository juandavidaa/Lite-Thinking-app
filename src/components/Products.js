/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import CompanyService from "../services/CompanyService";

const Products = (props) => {
  const companyService = new CompanyService();

  const componentPDF = useRef();

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  let { nit } = useParams();

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
  });

  const deleteProduct = (id, index) => {
    companyService.isAdmin().then((response) => {
      const status = response.status;
      if (status === 200) {
        response.json().then((data) => {
          companyService.deleteProduct(id).then((response) => {
            if (response.status === 200) {
              response.json().then((data) => {
                console.log(data);
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
  useEffect(() => {
    const fetchProducts = () => {
      companyService.isAdmin().then((response) => {
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
          <button className="btn btn-success btn-lg">
            <i className="bi bi-send"></i>
          </button>
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
