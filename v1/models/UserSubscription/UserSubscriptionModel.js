import UserSubscriptionSchema from "./UserSubscriptionSchema";

const queries = {
  // CRUD METHODS

  //   async create(item) {
  //     return await UserSubscriptionSchema.getModel().create(item);
  //   },

  //   async get(queryObject) {
  //     return await UserSubscriptionSchema.getModel().findOne(queryObject);
  //   },

  async list() {
    return await UserSubscriptionSchema.getModel().find();
  },

  //   async update(item) {
  //     delete item.password;

  //     return await UserSubscriptionSchema.getModel().findOneAndUpdate(
  //       { _id: item._id },
  //       item,
  //       { new: true }
  //     );
  //   },

  //   async delete(id) {
  //     return await UserSubscriptionSchema.getModel().findByIdAndRemove(id);
  //   },

  async findOne(item) {
    return await UserSubscriptionSchema.getModel().findOne(item).lean();
  },

  async findOneAndPopulate(item) {
    return await UserSubscriptionSchema.getModel()
      .findOne(item)
      .populate("subscription.planId")
      .lean();
  },
};

export default {
  ...UserSubscriptionSchema,
  ...queries,
};
