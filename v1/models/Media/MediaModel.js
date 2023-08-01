import MediaSchema from "./MediaSchema";

const queries = {
  // CRUD METHODS

  //   async create(item) {
  //     return await UserSchema.getModel().create(item);
  //   },

  async get(queryObject) {
    return await MediaSchema.getModel().findOne(queryObject);
  },

  //   async list() {
  //     return await UserSchema.getModel().find();
  //   },

  async findOne(item) {
    return await MediaSchema.getModel().findOne(item).lean();
  },
};

export default {
  ...MediaSchema,
  ...queries,
};
