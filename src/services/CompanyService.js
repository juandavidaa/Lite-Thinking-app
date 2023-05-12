import { useNavigate } from "react-router-dom";

class CompanyService {
  constructor() {
    this.url = "http://localhost:8000/api/";
    this.myHeaders = new Headers();
    this.myHeaders.append("Accept", "application/json");
    this.myHeaders.append("Content-Type", "application/json");
    this.myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access_token")}`
    );
    this.requestOptions = {
      headers: this.myHeaders,
    };
  }

  async makeRequest(url) {
    const response = await fetch(`${this.url}${url}`, this.requestOptions);
    //const response = await request.json();

    return response;
  }

  async getProducts(nit) {
    this.requestOptions.method = "GET";
    return await this.makeRequest(`admin/companies/${nit}`);
  }
  async isAdmin() {
    this.requestOptions.method = "GET";
    const response = await this.makeRequest("auth/me");

    return response;
  }
  async getCompanies() {
    this.requestOptions.method = "GET";
    const response = await this.makeRequest("companies");

    return response;
  }

  async createCompany(formData) {
    this.requestOptions.method = "POST";
    this.requestOptions.body = JSON.stringify(formData);

    return await this.makeRequest("admin/companies");
  }

  async deleteProduct(id) {
    this.requestOptions.method = "DELETE";

    return await this.makeRequest(`admin/products/${id}`);
  }

  async createProduct(formData, nit) {
    formData.company_nit = nit;
    this.requestOptions.method = "POST";
    this.requestOptions.body = JSON.stringify(formData);
    return await this.makeRequest(`admin/products`);
  }
}
export default CompanyService;
