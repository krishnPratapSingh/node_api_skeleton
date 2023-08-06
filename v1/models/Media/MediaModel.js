import MediaSchema from "./MediaSchema";

const queries = {
  // CRUD METHODS

  //   async create(item) {
  //     return await UserSchema.getModel().create(item);
  //   },

  async get(queryObject) {
    return await MediaSchema.getModel().findOne(queryObject);
  },

  async list(queryObject, pageNumber, pageSize) {
    // return await MediaSchema.getModel().find(queryObject);

    const totalDocuments = await MediaSchema.getModel().countDocuments(
      queryObject
    ); // Get the total number of documents

    // Calculate the number of documents to skip and limit based on the page number and page size
    const skipCount = (pageNumber - 1) * pageSize;
    const limitCount = pageSize;

    // Fetch paginated data
    const data = await MediaSchema.getModel()
      .find(queryObject)
      .skip(skipCount)
      .limit(limitCount);

    return {
      totalDocuments,
      totalPages: Math.ceil(totalDocuments / pageSize),
      currentPage: pageNumber,
      pageSize,
      data,
    };
  },

  async findOne(item) {
    return await MediaSchema.getModel().findOne(item).lean();
  },
};

export default {
  ...MediaSchema,
  ...queries,
};
