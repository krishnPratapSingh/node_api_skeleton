import ProductSchema from "./ProductSchema";

const queries = {

  async create(item) {
    return await ProductSchema.getModel().create(item);
  },
   
  async get(id) {
    return await ProductSchema.getModel().findOne({ _id: id });
  },

  async list(limit, skipIndex) {
    return await ProductSchema.getModel().find().sort({ _id: 1 })
    .limit(limit)
    .skip(skipIndex)
    .exec();
  },

  async update(item) { 
    console.log(item)
    return await ProductSchema.getModel().findOneAndUpdate({ _id: item._id }, item, {'new': true});
  },

  async delete(id) {
    return await ProductSchema.getModel().findByIdAndRemove(id);
  },

  async count(id) {
    return await ProductSchema.getModel().count();
  },

};

export default {
  ...ProductSchema,
  ...queries
};
