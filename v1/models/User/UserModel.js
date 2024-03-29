import UserSchema from "./UserSchema";

const queries = {
  // CRUD METHODS

  async create(item) {
    return await UserSchema.getModel().create(item);
  },

  async get(queryObject) {
    return await UserSchema.getModel().findOne(queryObject).lean();
  },

  async list(queryObject) {
    return await UserSchema.getModel().find(queryObject);
  },

  async listTestUsers(queryObject, projection) {
    return await UserSchema.getModel().find(queryObject, projection);
  },

  async update(item) {
    delete item.password;

    return await UserSchema.getModel().findOneAndUpdate(
      { _id: item._id },
      item,
      { new: true }
    );
  },

  async delete(id) {
    return await UserSchema.getModel().findByIdAndRemove(id);
  },

  async findOne(item) {
    return await UserSchema.getModel().findOne(item).lean();
  },
};

export default {
  ...UserSchema,
  ...queries,
};
