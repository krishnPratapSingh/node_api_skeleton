// Database
import Database from "../../../utilities/Database_Crud_db";
import mongoose from "mongoose";

const productModel = {
  /**
   * Init  schema
   */
  init() {
    const db = Database.getConnection();

    /**
     * Product
     */
    const productSchema = new mongoose.Schema({
      name: {
        type: "String",
        required: true,
      },
      quantity: {
        type: "Number",
        required: true,
      },
      sku: {
        type: "String",
        required: true,
      },
      // RELATIONS

      // EXTERNAL RELATIONS
      /*
       */
    });

    productModel.setModel(db.connection.model("Product", productSchema));

    return productSchema;
  },

  /**
   * Set Model
   */
  setModel: (model) => {
    productModel.model = model;
  },

  /**
   * Get model
   */
  getModel: () => {
    return productModel.model;
  },
};

export default productModel;
