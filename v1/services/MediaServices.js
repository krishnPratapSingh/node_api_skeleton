import MediaModel from "../models/Media/MediaModel";

const MediaServices = {
  async get(id) {
    return await MediaModel.get(item);
  },
};

export default MediaServices;
