import { json } from "express";
import conexao from "../database/conexao.js";
class SelecaoRepository {
  //CRUD
  //Autor Denilson Belarmino dos Santos João

  create(body) {
    const sql = "INSERT INTO jogador SET ?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, body, (erro, result) => {
        if (erro) {
          console.error("Erro na query SQL:", erro);
          return reject(new Error("Não foi possível cadastrar"));
        }
        const rows = JSON.parse(JSON.stringify(result));
        return resolve(rows);
      });
    });
  }

  record(body) {
    const sql = "Insert INTO recordes SET ?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, body, (erro, result) => {
        if (erro) return reject("Não foi possível cadastrar");
        const rows = JSON.parse(JSON.stringify(result));
        return resolve(rows);
      });
    });
  }

  findAll() {
    const sql = "SELECT * FROM jogador";
    return new Promise((resolve, reject) => {
      conexao.query(sql, (erro, result) => {
        if (erro) return reject("Erro ao listar");
        //Fazer o parse dos resultados
        const rows = JSON.parse(JSON.stringify(result));
        return resolve(rows);
      });
    });
  }

  findBestRecords() {
    const sql = `SELECT 
    JogadorId,
    Nome,
    NumeroDeVitorias,
    MIN(TempoTotalJogo) AS MenorTempoJogoTotal,
    DataJogo,
    bi
FROM (
    SELECT 
        r.JogadorId,
        j.Nome,
        COUNT(*) AS NumeroDeVitorias,
        SUM(r.TempoJogo) AS TempoTotalJogo,
        r.DataJogo,
        j.bi
    FROM 
        recordes r
    INNER JOIN 
        jogador j ON r.JogadorId = j.id
    WHERE 
        r.Resultado = 'Vitória'
    GROUP BY 
        r.JogadorId, j.Nome
) AS subquery
GROUP BY 
    JogadorId, Nome, NumeroDeVitorias, DataJogo, bi
ORDER BY 
    NumeroDeVitorias DESC, MenorTempoJogoTotal ASC
LIMIT 3;

    `;

    return new Promise((resolve, reject) => {
      conexao.query(sql, (erro, result) => {
        if (erro) return reject("Erro ao listar");

        // Fazer o parse dos resultados
        const rows = JSON.parse(JSON.stringify(result));
        return resolve(rows);
      });
    });
  }

  findById(id) {
    const sql = "select * from selecoes where id=?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, id, (erro, result) => {
        if (erro) return reject(erro);
        const rows = JSON.parse(JSON.stringify(result));
        return resolve(rows[0]);
      });
    });
  }

  findByNomeAndBi(data) {
    const sql = "SELECT * FROM jogador WHERE nome = ? AND bi = ?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, [data.Nome, data.bi], (erro, result) => {
        if (erro) return reject(erro);
        const rows = JSON.parse(JSON.stringify(result));
        return resolve(rows[0]);
      });
    });
  }

  update(id, body) {
    const sql = "UPDATE selecoes SET ? WHERE id=?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, [body, id], (erro, result) => {
        if (erro) return reject("Erro ao actualizar seleção!");
        const row = JSON.parse(JSON.stringify(result));
        return resolve(row);
      });
    });
  }

  delete(id) {
    const sql = "DELETE from selecoes where id=?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, id, (erro, result) => {
        if (erro) return reject("Erro ao apagar seleção!");
        const row = JSON.parse(JSON.stringify(result));
        return resolve(row);
      });
    });
  }
}

export default new SelecaoRepository();
