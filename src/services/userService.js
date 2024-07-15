const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

class UserService {
  #clientId;
  #clientSecret;
  #audience;
  #tokenUrl;
  #userUrl;

  constructor(clientId, clientSecret, audience, tokenUrl, userUrl) {
    this.#clientId = clientId;
    this.#clientSecret = clientSecret;
    this.#audience = audience;
    this.#tokenUrl = tokenUrl;
    this.#userUrl = userUrl;
  }

  async #getToken(audience) {
    const data = qs.stringify({
      'grant_type': 'client_credentials',
      'client_id': this.#clientId,
      'client_secret': this.#clientSecret,
      'audience': audience || this.#audience
    });

    const config = {
      method: 'post',
      url: this.#tokenUrl,
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };

    try {
      const response = await axios(config);
      const { access_token } = response.data;
      return access_token;
    } catch (error) {
      console.error('Error getting token:', error.response.data);
      throw new Error('Unable to acquire token');
    }
  }

  async createUser(email, password) {
    const token = await this.#getToken();

    const options = {
      method: 'POST',
      url: this.#userUrl,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      },
      data: {
        email,
        password,
        connection: 'Username-Password-Authentication'
      }
    };

    try {
      const response = await axios(options);
      return response.data;
    } catch (error) {
      throw new Error('Error creating user:' + error.response.data.message);
    }
  }

  async getApiToken(audience) {
    return await this.#getToken(audience);
  }
}

const userService = new UserService(
  process.env.AUTH0_CLIENT_ID,
  process.env.AUTH0_CLIENT_SECRET,
  process.env.AUTH0_AUDIENCE,
  process.env.AUTH0_TOKEN_URL,
  process.env.AUTH0_USER_URL
);

module.exports = userService;
