import LiveSessionSchema from "./LiveSessionSchema";

const queries = {
  async create(item) {
    return await LiveSessionSchema.getModel().create(item);
  },

  async get(id) {
    return await LiveSessionSchema.getModel().findOne({ _id: id });
  },

  async countDocs(queryObject) {
    return LiveSessionSchema.getModel().countDocuments(queryObject);
  },

  async list(queryObject, skipDocuments, pageSize) {
    return LiveSessionSchema.getModel()
      .find(queryObject)
      .sort({ createdAt: -1 })
      .skip(skipDocuments)
      .limit(pageSize);
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
