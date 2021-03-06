"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const scrap_service_1 = require("../services/scrap-service");
class CupomController {
    criarCupom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: verificar se nfce já foi importada
            const nfce = req.body;
            const user = req.app.get("user");
            let produtos = [];
            let result;
            if (!nfce.value) {
                res.status(400).send({ message: 'nfce invalido.' });
            }
            //const cupomExists : CupomAttributes  = await db.Cupom.find({ where: {
            //                                                     nfce:nfce.value
            //                                         }});
            // if ( cupomExists !== null){
            //     res.status(400).send({ message : 'Cupom já carregado.'});
            // }
            const scraping = new scrap_service_1.Scraping();
            result = yield scraping.scrapCupom(nfce.value)
                .then((cupom) => {
                if (cupom.itensCupom == null || cupom.itensCupom.length == 0) {
                    throw new Error(`Cupom not found!`);
                }
                //var user = 'wellington';
                cupom.user = user;
                return models_1.default.Historico.find({
                    where: {
                        user: user,
                        dataFinal: null
                    }
                }).then((historico) => {
                    if (!historico)
                        throw new Error(`Historico with user ${user} not found!`);
                    cupom.historico = historico.id;
                    return models_1.default.sequelize.transaction((t) => {
                        return models_1.default.Cupom.create(cupom, { transaction: t });
                    }).then((cupomWithId) => {
                        cupom.itensCupom.forEach(element => {
                            element.cupom = cupomWithId.id;
                        });
                        return models_1.default.sequelize.transaction((t) => {
                            return models_1.default.ItemCupom.bulkCreate(cupom.itensCupom, { transaction: t, returning: true });
                        }).then((itens) => {
                            cupom.itensCupom = itens;
                            return cupom;
                        }); // fim promise created itensCupom                                
                    }); // fim promise created cupom
                }); // fim promise  obter historico                               
            }).catch((error) => {
                res.status(400).send(error);
                console.log(`======= ${error}`);
            });
            result.itensCupom.forEach(item => {
                var produto = {
                    CNPJ: result.CNPJ,
                    bairro: result.bairro,
                    codigo: item.codigo,
                    cep: result.cep,
                    cidade: result.cidade,
                    desc_1: item.descricao,
                    ean: 'xxxxxxxx11111',
                    endereco: result.endereco,
                    estado: result.estado,
                    nomeFantasia: 'teste',
                    razaoSocial: result.razaoSocial,
                    ultimoValor: 0,
                    valor: item.valorUnitario
                };
                produtos.push(produto);
            });
            //TODO: salvar produto   aqui
            models_1.default.sequelize.transaction((t) => {
                return models_1.default.Produto.bulkCreate(produtos, { transaction: t });
            });
            res.status(200).send(result);
        });
    }
}
exports.CupomController = CupomController;
