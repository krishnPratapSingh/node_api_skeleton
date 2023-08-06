import MediaModel from "../models/Media/MediaModel";

const MediaServices = {
  async get(id) {
    return await MediaModel.get(item);
  },

  async list(item, pageNumber, pageSize) {
    return await MediaModel.list(item, pageNumber, pageSize);
  },
};

export default MediaServices;
