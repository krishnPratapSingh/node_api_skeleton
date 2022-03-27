// Database
import ProductModel from "../models/Product/ProductModel";

const productServices = {

  async create(item) {
    return await ProductModel.create(item);
  },
   
  async get(id) {
    return await ProductModel.get(id);
  },

  async list(item) {
    try {
      console.log("in service list")
      const page = parseInt(item.page) || 1;
      const limit = parseInt(item.limit) || 5;
      const skipIndex = (page - 1) * limit;
      const result = {}
      const totalDoc = await ProductModel.count()
      const totalPages = Math.ceil(totalDoc/limit)
      result.totalPages = totalPages
      result.currentPage = page
      result.results = await ProductModel.list(limit, skipIndex);
      return result
    } catch (err){
      throw err
    }  
  },

  async update(item) { 
    return await ProductModel.update(item);
  },

  async delete(id) {
    return await ProductModel.delete(id);
  },

};

export default productServices
