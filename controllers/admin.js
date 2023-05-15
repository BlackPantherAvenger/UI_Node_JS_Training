const Products = require("../models/products");

exports.getAddUsers = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"))
  //   next(); // Allows the request to continue to the next middleware in line
  res.render("admin/edit-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    activeAddProduct: true,
    productCSS: true,
    formCSS: true,
    editing: false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  // when data is saving in a local JSON file or a MySQL database using mysql2 npm package
  // Products.findById(prodId, (product) => {
  //   console.log("product", product);
  //   if (!product) {
  //     res.redirect("/");
  //   }
  //   res.render("admin/edit-product", {
  //     pageTitle: "Edit product",
  //     path: "/admin/edit-product",
  //     editing: editMode,
  //     product: product,
  //   });
  // });

  // when data is saving in a MySQL database using sequelize npm package
  // when there is no userId filed on product table
  // Products.findByPk(prodId)
  //   .then((product) => {
  //     if (!product) {
  //       res.redirect("/");
  //     }
  //     res.render("admin/edit-product", {
  //       pageTitle: "Edit product",
  //       path: "/admin/edit-product",
  //       editing: editMode,
  //       product: product,
  //     });
  //   })
  // .catch((err) => console.log(err));
  // when there is userId filed on product table
  req.user.getProducts({ where: { id: prodId } })
  .then((products) => {
    const product = products[0];
    if (!product) {
      res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageURL = req.body.imageURL;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  // when data is saving in a local JSON file or a MySQL database using mysql2 npm package
  // const updatedProduct = new Products(
  //   prodId,
  //   updatedTitle,
  //   updatedImageURL,
  //   updatedPrice,
  //   updatedDescription
  // );
  // updatedProduct.save();
  // res.redirect("/admin/products");

  // when data is saving in a MySQL database using sequelize npm package
  Products.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageURL = updatedImageURL;
      product.description = updatedDescription;
      return product.save();
    })
    .then(() => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  // when data is deleting in a local JSON file or a MySQL database using mysql2 npm package
  // Products.deleteById(prodId);
  // res.redirect("/admin/products");

  // when data is saving in a MySQL database using sequelize npm package
  Products.findByPk(prodId)
    .then((product) => product.destroy())
    .then((result) => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const description = req.body.description;

  // when data is saving in a local JSON file
  // const products = new Products(null, title, imageURL, price, description);
  // products.save()
  // res.redirect("/");

  // when data is saving in a MySQL database using mysql2 npm package
  // products
  //   .save()
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // when data is saving in a MySQL database using sequelize npm package
  // when there is no userId filed on product table
  // Products.create({
  //   title: title,
  //   price: price,
  //   description: description,
  //   imageURL: imageURL,
  // })
  //   .then((result) => {
  //     console.log(result);
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => console.log(err));
  // when there is userId filed on product table
  req.user
    .createProduct({
      title: title,
      price: price,
      description: description,
      imageURL: imageURL,
    })
    .then((result) => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  // when data is fetching/retrieving in a MySQL database using mysql2 npm package
  // Products.fetchAll((products) => {
  //   res.render("admin/products", {
  //     prods: products,
  //     pageTitle: "Admin Products",
  //     path: "/admin/products",
  //   });
  // });

  // when data is fetching/retrieving in a MySQL database using sequelize npm package
  // when there is no userId filed on product table
  Products.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
  // when there is userId filed on product table
  req.user.getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};
