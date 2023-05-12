import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

import CompanyService from "../services/CompanyService";

const Products = (props) => {
  const companyService = new CompanyService();

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  let { nit } = useParams();
  const fetchProducts = () => {
    companyService.isAdmin().then((response) => {
      const status = response.status;
      if (status === 200) {
        response.json().then((data) => {
          setIsAdmin(data.admin === 1);
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
  const deleteProduct = (id, index) => {
    companyService.isAdmin().then((response) => {
      const status = response.status;
      if (status === 200) {
        response.json().then((data) => {
          setIsAdmin(data.admin === 1);
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
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <div>
        <div className="text-end">
          <Link to={`/admin/addProduct/${nit}`}>
            <button className="btn btn-primary btn-lg">+</button>
          </Link>
        </div>

        {products.length > 0 && (
          <div className="table-responsive">
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
