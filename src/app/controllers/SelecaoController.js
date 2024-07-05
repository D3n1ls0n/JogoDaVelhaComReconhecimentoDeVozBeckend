import SelecaoRepository from "../repositories/SelecaoRepository.js";

class selecaoController {
  async index(req, res) {
    const row = await SelecaoRepository.findAll();
    res.json(row);
  }

  async show(req, res) {
    const id = req.params.id;
    const row = await SelecaoRepository.findById(id);
    res.json(row);
  }

  async store(req, res) {
    const selecao = req.body;
    const row = await SelecaoRepository.create(selecao);
    res.json(row);
  }

  async record(req, res) {
    console.log(req.body);
    const selecao = req.body;
    const row = await SelecaoRepository.record(selecao);
    res.json(row);
  }

  async findByData(req, res) {
    const row = await SelecaoRepository.findByNomeAndBi(req.body);
    res.json(row);
  }

  async update(req, res) {
    const id = req.params.id;
    const selecao = req.body;
    const row = await SelecaoRepository.update(id, selecao);
    res.json(row);
  }

  async delete(req, res) {
    const id = req.params.id;
    const row = await SelecaoRepository.delete(id);
    res.json(row);
  }
}

export default new selecaoController();
