import PermissionSchema from "./PermissionSchema";

const queries = {
  async create(item) {
    return await PermissionSchema.getModel().create(item);
  },

  async getPermissionByUserId(userId) {
    return await PermissionSchema.getModel().findOne({ _user: userId });
  },

  async list(limit, skipIndex) {
    return await PermissionSchema.getModel()
      .find()
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skipIndex)
      .exec();
  },

  async update(item) {
    console.log(item);
    return await PermissionSchema.getModel().findOneAndUpdate(
      { _id: item._id },
      item,
      { new: true }
    );
  },

  async delete(id) {
    return await PermissionSchema.getModel().findByIdAndRemove(id);
  },

  async count(id) {
    return await PermissionSchema.getModel().count();
  },
};

export default {
  ...PermissionSchema,
  ...queries,
};
