// Database
import Database from "../../utilities/Database_Crud_db";
import mongoose from "mongoose";

const liveSessionModel = {
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

    liveSessionModel.setModel(db.connection.model("Product", productSchema));

    return productSchema;
  },

  /**
   * Set Model
   */
  setModel: (model) => {
    liveSessionModel.model = model;
  },

  /**
   * Get model
   */
  getModel: () => {
    return liveSessionModel.model;
  },
};

export default liveSessionModel;
