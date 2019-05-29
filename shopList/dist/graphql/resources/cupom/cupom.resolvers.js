"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scrap_service_1 = require("../../../services/scrap-service");
const uuidv1 = require("uuid/v1");
exports.cupomResolvers = {
    Query: {
        cupons: (parent, { id }, { db }, info) => {
            return db.Cupom
                .findAll({
                where: { user: id }
            });
        },
        cupom: (parent, { nfce }, { db }, info) => {
            return db.Cupom
                .find({
                where: { nfce: nfce }
            }).then((cupom) => {
                if (cupom)
                    throw new Error(`Cupom with nfce ${nfce} not found!`);
                return cupom;
            });
        }
    },
    Mutation: {
        createCupom: (parent, { nfce }, { db }, info) => {
            const scraping = new scrap_service_1.Scraping();
            return scraping.scrapCupom(nfce)
                .then((cupom) => {
                if (cupom.itensCupom == null || cupom.itensCupom.length == 0) {
                    throw new Error(`Cupom not found!`);
                }
                cupom.id = uuidv1();
                cupom.user = 'wellington';
                return db.sequelize.transaction((t) => {
                    return db.Cupom.create(cupom, { transaction: t });
                }).then((cupomWithId) => {
                    cupom.itensCupom.forEach(element => {
                        element.id = uuidv1();
                        element.cupom = cupomWithId.id;
                    });
                    return db.sequelize.transaction((t) => {
                        return db.ItemCupom.bulkCreate(cupom.itensCupom, { transaction: t });
                    }).then((itens) => {
                        cupom.itensCupom = itens;
                        return cupom;
                    });
                });
            }).catch((r) => console.log(r));
        }
    }
};
