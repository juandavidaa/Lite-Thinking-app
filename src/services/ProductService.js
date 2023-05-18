import ServiceInterface from "./ServiceInteface";

class ProductService extends ServiceInterface {
  constructor() {
    super();
    this.prefix = "admin/products";
    this.myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access_token")}`
    );
  }

  /**
   * Call to the api to delete one product by id
   * @param {Number} id
   * @returns {Promise}
   */
  async deleteProduct(id) {
    this.requestOptions.method = "DELETE";

    return await this.makeRequest(`/${id}`);
  }

  /**
   * Call to the api to send the company's inventory
   * @param {Number} id
   * @returns {Promise}
   */
  async sendPDF(company_nit, email) {
    this.requestOptions.method = "POST";
    this.requestOptions.body = JSON.stringify({ company_nit, email });
    return await this.makeRequest(`/sendPDF`);
  }

  /**
   * call to the api to create a new product for a company
   * @param {FormData} formData
   * @param {Number} nit
   * @returns {Promise}
   */
  async createProduct(formData, nit) {
    formData.company_nit = nit;
    this.requestOptions.method = "POST";
    this.requestOptions.body = JSON.stringify(formData);
    return await this.makeRequest();
  }
}

export default ProductService;
