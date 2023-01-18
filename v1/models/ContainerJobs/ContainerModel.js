import ContainerSchema from "./ContainerSchema";

const queries = {
  // CRUD METHODS

  async create(item) {
    return await ContainerSchema.getModel().create(item);
  },

  async get(id) {
    return await ContainerSchema.getModel().findOne({ _id: id });
  },

  async list() {
    return await ContainerSchema.getModel().find();
  },

  async listWithFilter(item) {
    return await ContainerSchema.getModel().find(item);
  },

  async update(item) {
    return await ContainerSchema.getModel().findOneAndUpdate(
      { _id: item._id },
      item,
      { new: true }
    );
  },

  async updateByObj(filter, payload) {
    return await ContainerSchema.getModel().findOneAndUpdate(filter, payload, {
      new: true,
    });
  },

  async delete(id) {
    return await ContainerSchema.getModel().findByIdAndRemove(id);
  },

  async findOne(item) {
    return await ContainerSchema.getModel().findOne(item).lean();
  },
};

export default {
  ...ContainerSchema,
  ...queries,
};
