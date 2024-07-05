import express from "express"; //Exportar o express
import routes from "./routes.js";

import cors from 'cors';

const app = express(); // Instanciar o express na variável app

app.use(cors());

// Indicar para o express ler o body com JSON
app.use(express.json());

//Usar router
app.use(routes);

export default app;
