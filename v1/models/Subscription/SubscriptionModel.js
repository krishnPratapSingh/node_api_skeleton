import SubscriptionSchema from "./SubscriptionSchema";

const queries = {
  // CRUD METHODS

  async list() {
    return await SubscriptionSchema.getModel().find();
  },

  async findOne(item) {
    return await SubscriptionSchema.getModel().findOne(item).lean();
  },
};

export default {
  ...SubscriptionSchema,
  ...queries,
};
