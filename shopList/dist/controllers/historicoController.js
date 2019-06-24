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
class HistoricoController {
    criarHistorico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = undefined;
            try {
                result = yield models_1.default.sequelize.transaction((t) => {
                    let historicoInput = req.body;
                    historicoInput.user = 'wellington'; //TODO: somente para teste
                    return models_1.default.Historico.find({
                        where: {
                            user: historicoInput.user,
                            categoria: historicoInput.categoria,
                            dataFinal: null
                        }
                    }).then((historico) => {
                        historicoInput.dataInicial = new Date();
                        if (historico) {
                            historicoInput.numHistorico = historico.numHistorico + 1;
                        }
                        else {
                            historicoInput.numHistorico = 1;
                        }
                        return models_1.default.Historico.create(historicoInput, { transaction: t });
                    });
                });
            }
            catch (e) {
                res.status(400).send(e.errors);
                console.log(`======= ${e}`);
            }
            res.status(200).send({ result });
        });
    }
}
exports.HistoricoController = HistoricoController;
