const express = require("express");
// const path = require("path");
// const rootDir = require("../util/path");
const router = express.Router();

const adminController = require('../controllers/admin')
// const products = [];

// /admin/add-product => GET
router.get("/add-product", adminController.getAddUsers);

// /admin/products => GET
router.get("/products", adminController.getProducts);

router.post("/add-product", adminController.postAddProduct);
router.get("/edit-product/:productId", adminController.getEditProduct);
router.post("/edit-product", adminController.postEditProduct);
router.post("/delete-product", adminController.postDeleteProduct);

exports.routes = router;
