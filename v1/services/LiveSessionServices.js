// Database
import LiveSessionModel from "../models/LiveSession/LiveSessionModel";

const LiveSessionServices = {
  async create(item) {
    return await LiveSessionModel.create(item);
  },

  async get(id) {
    return await LiveSessionModel.get(id);
  },

  async listByUserArtsit(item, currentPage, pageSize) {
    const totalCount = await LiveSessionModel.countDocs(item);
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalCount / pageSize);
    console.log("totalPages ==>>", totalPages);
    // Calculate the number of documents to skip
    const skipDocuments = (currentPage - 1) * pageSize;
    const list = await LiveSessionModel.list(item, skipDocuments, pageSize);
    console.log("list ==>>", list);

    const result = {
      totalCount,
      pageSize,
      currentPage,
      totalPages,
      data: list,
    };
    return result;
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

  async eventsCount() {
    return await LiveSessionModel.monthlyEventsCount();
  },
};

export default LiveSessionServices;
