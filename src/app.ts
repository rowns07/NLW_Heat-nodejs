import "dotenv/config"
import express from 'express';
import { router } from "./routes";

const app = express();
app.use(express.json());

app.use(router);

// Chamando a rota inicial passando o client id pelo redirecionamento
app.get("/github", (request, response) => {
  response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

// Url que foi cadastrada como retorno diretamente no site do github
app.get('/signin/callback', (request, response) => {
  const { code } = request.query;

  return response.json('Toma ai seu codigo - ' + code);
});

app.listen(4000, () => console.log('Server is running on PORT 4000'));