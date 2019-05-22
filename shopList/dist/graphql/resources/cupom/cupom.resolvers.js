"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scrap_service_1 = require("../../../services/scrap-service");
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
            scraping.scrapCupom(nfce);
        }
    }
};
