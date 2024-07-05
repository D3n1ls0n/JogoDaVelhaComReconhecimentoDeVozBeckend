import { Router } from "express";
const router = Router()
import selecaoController from "./app/controllers/selecaoController.js";

//R O T A S
//Listar jogadores
router.get("/getAllPlayers", selecaoController.index);

//Listar jogadores por ID
router.get("/getAllPlayers-by-id/:id", selecaoController.show);

//Criar jogadores
router.post("/player", selecaoController.store);

//Criar recordes
router.post("/record", selecaoController.record);

//Listar os três maiores recordes
router.get("/getBestRecords", selecaoController.findBestRecords);

//Pesquisar jogador por nome e bilhete
router.post("/find-player-by-data", selecaoController.findByData);

//Apagar jogadores
router.delete("/delete-selecoes/:id", selecaoController.delete);

//Actualizat jogadores
router.put("/update-selecoes/:id", selecaoController.update);

export default router