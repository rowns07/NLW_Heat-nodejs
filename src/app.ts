import "dotenv/config";
import express from 'express';
import http from 'http';
import cors from 'cors';
import { router } from "./routes";
import { Server, Socket } from "socket.io";

const app = express();
app.use(cors());

// Criando server http com o http nativo do express
const serverHttp = http.createServer(app);

// Adicionando Cors junto ao Socket.io
const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

// Ativando conexão com o Socket.io e retornando o id da conexão no console 
io.on("connection", (socket) => {
  console.log(`Usuário conectado no socket ${socket.id}`);
});

// Ativando retorno de json no express
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


export { serverHttp, io }