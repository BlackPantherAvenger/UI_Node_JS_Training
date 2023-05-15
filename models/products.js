// const path = require("path");
// const fs = require("fs");
// const Cart = require("./cart");

// ----------------------- code which use local file JSON to do CRUD operations ---------------------------

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   "data",
//   "products.json"
// );
// const getProductsFromFile = (cb) => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     }
//     cb(JSON.parse(fileContent));
//   });
// };
// module.exports = class Products {
//   constructor(id, title, imageURL, price, description) {
//     this.id = id;
//     this.title = title;
//     this.imageURL = imageURL;
//     this.price = price;
//     this.description = description;
//   }

//   save() {
//     getProductsFromFile((products) => {
//       if (this.id) {
//         const existingProductIndex = products.findIndex(
//           (product) => product.id === this.id
//         );
//         const updatedProduct = [...products];
//         updatedProduct[existingProductIndex] = this;
//         fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
//           console.log(err);
//         });
//       } else {
//         this.id = Math.random().toString();
//         products.push(this);
//         fs.writeFile(p, JSON.stringify(products), (err) => {
//           console.log(err);
//         });
//       }
//     });
//   }

//   static findById(id, cb) {
//     getProductsFromFile((products) => {
//       const product = products.filter((product) => product.id === id);
//       cb(product[0]);
//     });
//   }

//   static deleteById(id) {
//     getProductsFromFile((products) => {
//       const product = products.find((prod) => prod.id === id);
//       const updatedProducts = products.filter((product) => product.id !== id);
//       fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//         if (!err) {
//           Cart.deleteProduct(id, product.price);
//         }
//       });
//     });
//   }

//   static fetchAll(cb) {
//     // cb - callback
//     getProductsFromFile(cb);
//   }
// };

// --------------------------------------------------------------------------------------------------------

// ----------------------- code which use MySQL database to do CRUD operations ----------------------------

// to do CRUD operation by using mysql2 npm package
// const db = require("../util/database");
// module.exports = class Products {
//   constructor(id, title, imageURL, price, description) {
//     this.id = id;
//     this.title = title;
//     this.imageURL = imageURL;
//     this.price = price;
//     this.description = description;
//   }
//   save() {
//     return db.execute(
//       "INSERT INTO products (title, price, imageURL, description) VALUES (?,?,?,?)",
//       [this.title, this.price, this.imageURL, this.description]
//     );
//   }
//   static findById(id) {
//     return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
//   }
//   static deleteById(id) {}
//   static fetchAll() {
//     return db.execute("SELECT * FROM products");
//   }
// };

// to do CRUD operation by using sequelize npm package
const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: { type: Sequelize.DOUBLE, allowNull: false },
  imageURL: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Product;
