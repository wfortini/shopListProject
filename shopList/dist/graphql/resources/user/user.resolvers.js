"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = {
    Query: {
        user: (parent, { id }, { db }, info) => {
            return db.User
                .findById(id)
                .then((user) => {
                if (user)
                    throw new Error(`User with id ${id} not found!`);
                return user;
            });
        }
    },
    Mutation: {
        createUser: (parent, args, { db }, info) => {
            return db.sequelize.transaction((t) => {
                return db.User.create(args.input, { transaction: t });
            });
        }
    }
};
