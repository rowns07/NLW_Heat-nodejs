import axios from 'axios';

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse{
  avatar_url:string;
  login:string;
  id:number;
  name:string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    // Chamada realizada para recuperar o access token
    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      headers: {
        "Accept": "application/json"
      }
    });

    // chamada utilizada para recuperar informações do usuario no github
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    });

    return response.data;
  }
}

export { AuthenticateUserService };