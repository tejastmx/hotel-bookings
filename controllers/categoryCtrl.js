const Category = require("../models/categorymodel");

const categoryCtrl = {
  getCategories: async (req, res) => {
    // res.json("category testy");
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      //only admin can create/delete/update categories
      //if user have role=1 ---> admin
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category) return res.status(400).send("this category already exist");
      const newCategory = new Category({ name });
      await newCategory.save();
      res.send("created a cetegory");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.send("category deleted");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findOneAndUpdate({ _id: req.params.id }, { name });
      res.send("category updated");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryCtrl;
