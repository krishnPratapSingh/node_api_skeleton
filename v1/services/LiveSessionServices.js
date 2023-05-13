// Database
import LiveSessionModel from "../models/LiveSession/LiveSessionModel";

const LiveSessionServices = {
  async create(item) {
    return await LiveSessionModel.create(item);
  },

  async get(id) {
    return await LiveSessionModel.get(id);
  },

  async list(item) {
    try {
      console.log("in service list");
      const page = parseInt(item.page) || 1;
      const limit = parseInt(item.limit) || 5;
      const skipIndex = (page - 1) * limit;
      const result = {};
      const totalDoc = await LiveSessionModel.count();
      const totalPages = Math.ceil(totalDoc / limit);
      result.totalPages = totalPages;
      result.currentPage = page;
      result.results = await LiveSessionModel.list(limit, skipIndex);
      return result;
    } catch (err) {
      throw err;
    }
  },

  async update(item) {
    return await LiveSessionModel.update(item);
  },

  async delete(id) {
    return await LiveSessionModel.delete(id);
  },

  async monthlyEventsCount() {
    return await LiveSessionModel.monthlyEventsCount();
  },
};

export default LiveSessionServices;
