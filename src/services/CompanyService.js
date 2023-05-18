import ServiceInterface from "./ServiceInteface";

class CompanyService extends ServiceInterface {
  constructor() {
    super();
    this.prefix = "admin/companies";
    this.myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access_token")}`
    );
  }

  /**
   * Call to the api to get the product list by company's nit
   * @param {Number} nit
   * @returns {Promise}
   */
  async getProducts(nit) {
    this.requestOptions.method = "GET";

    return await this.makeRequest(`/${nit}`);
  }

  /**
   * Call to the api to get the list of companies
   * @returns {Promise}
   */
  async getCompanies() {
    this.requestOptions.method = "GET";
    const response = await this.makeRequest();

    return response;
  }

  /**
   * Call to the api to create a new company
   * @param {FormData} formData
   * @returns {Promise}
   */
  async createCompany(formData) {
    this.requestOptions.method = "POST";
    this.requestOptions.body = JSON.stringify(formData);

    return await this.makeRequest();
  }

  /**
   * Call to the api to delete a company by company's nit
   * @param {Number} nit
   * @returns {Promise}
   */
  async deleteCompany(nit) {
    this.requestOptions.method = "DELETE";

    return await this.makeRequest(`/${nit}`);
  }
}

export default CompanyService;
