"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.historicoResolvers = {
    Query: {
        historico: (parent, { user }, { db }, info) => {
            return db.Historico
                .findAll({
                where: { user: user }
            }).then((historico) => {
                if (historico)
                    throw new Error(`Historico with id ${user} not found!`);
                return historico;
            });
        }
    },
    Mutation: {
        createHistorico: (parent, args, { db }, info) => {
            return db.sequelize.transaction((t) => {
                args.input.user = 'wellington';
                return db.Historico.find({
                    where: {
                        user: args.input.user,
                        categoria: args.categoria,
                        dataFinal: null
                    }
                }).then((historico) => {
                    args.input.dataIncial = new Date();
                    if (historico) {
                        args.input.numHistorico = historico.numHistorico + 1;
                    }
                    else {
                        args.input.numHistorico = 1;
                    }
                    return db.Historico.create(args.input, { transaction: t });
                });
            }); // manipular erro aqui
        }
    }
};
