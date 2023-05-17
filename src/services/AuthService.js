class AuthService {
  constructor() {
    this.url = "http://localhost:8000/api/auth/";
    this.myHeaders = new Headers();
    this.myHeaders.append("Accept", "application/json");
    this.myHeaders.append("Content-Type", "application/json");
    this.myHeaders.append("Access-Control-Allow-Origin", "*");
    this.requestOptions = {
      headers: this.myHeaders,
    };
  }

  async makeRequest(url) {
    const response = await fetch(`${this.url}${url}`, this.requestOptions);
    //const response = await request.json();

    return response;
  }

  async login(formData) {
    this.requestOptions.method = "POST";
    this.requestOptions.body = JSON.stringify(formData);

    return await this.makeRequest("login");
  }

  async register(formData) {
    this.requestOptions.method = "POST";
    this.requestOptions.body = JSON.stringify(formData);

    return await this.makeRequest("register");
  }
}
export default AuthService;
