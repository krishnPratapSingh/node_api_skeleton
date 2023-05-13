import LiveSessionSchema from "./LiveSessionSchema";

const queries = {
  async create(item) {
    return await LiveSessionSchema.getModel().create(item);
  },

  async get(id) {
    return await LiveSessionSchema.getModel().findOne({ _id: id });
  },

  async list(limit, skipIndex) {
    return await LiveSessionSchema.getModel()
      .find()
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skipIndex)
      .exec();
  },

  async update(item) {
    console.log(item);
    return await LiveSessionSchema.getModel().findOneAndUpdate(
      { _id: item._id },
      item,
      { new: true }
    );
  },

  async delete(id) {
    return await LiveSessionSchema.getModel().findByIdAndRemove(id);
  },

  async count(id) {
    return await LiveSessionSchema.getModel().count();
  },

  async monthlyEventsCount() {
    return await LiveSessionSchema.getModel().aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$startDate" },
            month: { $month: "$startDate" },
          },
          numberOfEvents: { $sum: 1 },
        },
      },
    ]);
  },
};

export default {
  ...LiveSessionSchema,
  ...queries,
};
