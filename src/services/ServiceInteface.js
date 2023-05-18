class ServiceInterface {
  constructor() {
    this.url =
      process.env.REACT_APP_API_URL ||
      "https://lite-thinking-api-production.up.railway.app/api/";
    this.myHeaders = new Headers();
    this.myHeaders.append("Accept", "application/json");
    this.myHeaders.append("Content-Type", "application/json");
    this.requestOptions = {
      headers: this.myHeaders,
    };
    this.prefix = "";
  }

  async makeRequest(url = "") {
    console.log("URL", process.env.REACT_APP_API_URL);
    const response = await fetch(
      `${this.url}${this.prefix}${url}`,
      this.requestOptions
    );
    //const response = await request.json();

    return response;
  }
}

export default ServiceInterface;
