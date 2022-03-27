// Services
import ProductServices from "../services/ProductServices";

// Errors
import ErrorManager from "../../classes/ErrorManager";

const ProductController = {
   
    // CRUD METHODS

    create: async (req, res) => {
        try {
        const result = await ProductServices.create(req.body);
        res.json(result);
        } catch (err) {
        const safeErr = ErrorManager.getSafeError(err);
        res.status(safeErr.status).json(safeErr);
        }
    },
  
    delete: async (req, res) => {
        try {
        const result = await ProductServices.delete(req.params.id);
        if(result){
            res.json(result);
        } else {
            res.json({msg: "No such product exists."});
        }
        } catch (err) {
        const safeErr = ErrorManager.getSafeError(err);
        res.status(safeErr.status).json(safeErr);
        }
    },
  
    get: async (req, res) => {
        try {
        const result = await ProductServices.get(req.params.id);
        if(result){
            res.json(result);
        } else {
            res.json({msg: "No such product found."});
        }
        } catch (err) {
        const safeErr = ErrorManager.getSafeError(err);
        res.status(safeErr.status).json(safeErr);
        }
    },
  
    list: async (req, res) => {
        try {
        const result = await ProductServices.list(req.query);
        console.log("result in list controller: ", result)
        if(result.results.length > 0){
            res.json(result);
        } else {
            res.json({msg: "There are no products."});
        }
        } catch (err) {
        const safeErr = ErrorManager.getSafeError(err);
        res.status(safeErr.status).json(safeErr);
        }
    },
  
    update: async (req, res) => {
        try {
        const result = await ProductServices.update(req.body);
        res.json(result);
        } catch (err) {
        const safeErr = ErrorManager.getSafeError(err);
        res.status(safeErr.status).json(safeErr);
        }
    },

   
};

export default ProductController
