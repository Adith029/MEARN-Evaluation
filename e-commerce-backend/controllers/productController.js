const Product = require('../models/productModel');

const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const products =await Product.create({name,description, price, quantity,user: req.user._id});
    return res.status(201).send(products);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const getUserProducts = async (req, res) => {
    try {
      const userId = req.user._id;
      const products = await Product.find({ user: userId });
  
      if (!products || products.length === 0) {
        return res.status(404).send("No products found for this user");
      }
  
      return res.status(200).send(products);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const product = await Product.findById(id);
      
      if (!product) {
        return res.status(404).send("Product not found");
      }
      
      if (product.user.toString() !== req.user._id.toString()) {
        return res.status(401).send("Not authorized to update this product");
      }
      
      const updatedProduct = await Product.updateOne(
        { _id: id },
        { $set: updateData }
      );
  
      if (updatedProduct.modifiedCount === 0) {
        return res.status(400).send("No changes made to the product");
      }
  
      const newProduct = await Product.findById(id);
      return res.status(200).send(newProduct);
  
    } catch (error) {
      return res.status(500).send(error);
    }
  };
  

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    if (product.user.toString() !== req.user._id) {
      return res.status(401).send("Not authorized to delete this product");
    }
    await product.deleteOne(product);
    return res.status(200).send("Product removed");
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {createProduct,getAllProducts, getProductById,updateProduct,deleteProduct,getUserProducts};
