import UserSchema from "./FlutinUserSchema";

const queries = {
  // CRUD METHODS

  async create(item) {
    return await UserSchema.getModel().create(item);
  },

  async get(id) {
    return await UserSchema.getModel().findOne({ _id: id });
  },

  async list() {
    return await UserSchema.getModel().find();
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
