// Database
import LiveSessionModel from "../models/LiveSession/LiveSessionModel";

const liveSessionServices = {
  async create(item) {
    return await LiveSessionModel.create(item);
  },

  async get(id) {
    return await LiveSessionModel.get(id);
  },

  async list(page, limit, sort, sortDirection) {
    try {
      console.log("in service list");
      const page = parseInt(page) || 1;
      const limit = parseInt(limit) || 5;
      const skipIndex = (page - 1) * limit;
      const result = {};
      const totalDoc = await LiveSessionModel.count();
      const totalPages = Math.ceil(totalDoc / limit);
      result.totalPages = totalPages;
      result.currentPage = page;
      result.results = await LiveSessionModel.list(
        limit,
        skipIndex,
        sort,
        sortDirection
      );
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
};

export default liveSessionServices;
