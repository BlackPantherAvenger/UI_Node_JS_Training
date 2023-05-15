const Products = require("../models/products");
const Cart = require("../models/cart");
const Product = require("../models/products");

exports.getProducts = (req, res, next) => {
  // console.log("adminData.products",adminData.products)

  // To implement normal html file
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

  // when data is fetching/retrieving from local JSON file
  // Products.fetchAll((products) => {
  // To implement pug, ejs and handlerbars file
  // res.render("shop/product-list", {
  //   prods: products,
  //   pageTitle: "All Products",
  //   path: "/products",
  //   hasProducts: products.length > 0,
  //   activeShop: true,
  //   productCSS: true,
  // });
  // });

  // when data is fetching/retrieving from MySQL database using mysql2 npm package
  // Products.fetchAll().then(([rows, fieldData]) => {
  //   res.render("shop/product-list", {
  //     prods: rows,
  //     pageTitle: "All Products",
  //     path: "/products",
  //     hasProducts: rows.length > 0,
  //   });
  // });

  // when data is fetching/retrieving from MySQL database using sequelize npm package
  Products.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        hasProducts: products.length > 0,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  // when data is fetching/retrieving from local JSON file
  // Products.findById(prodId, (product) => {
  //   res.render("shop/product-detail", {
  //     product: product,
  //     pageTitle: product.title,
  //     path: "/products",
  //   });
  // });

  // when data is fetching/retrieving from MySQL database using mysql2 npm package
  // Products.findById(prodId)
  //   .then(([product, fieldData]) => {
  //     res.render("shop/product-detail", {
  //       product: product[0],
  //       pageTitle: product.title,
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // when data is fetching/retrieving from MySQL database using sequelize npm package
  // there are two ways to fetch the perticular data -
  // 1. by using findByPk(prodId) function
  // Products.findByPk(prodId)
  //   .then((product) => {
  //     res.render("shop/product-detail", {
  //       product: product,
  //       pageTitle: product.title,
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // 2. by using findAll({where: {id: prodId}}) function
  Products.findAll({ where: { id: prodId } })
    .then((product) => {
      res.render("shop/product-detail", {
        product: product[0],
        pageTitle: product[0].title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });

  // res.redirect("/")
  // Products.fetchAll(products => {
  //   res.render("shop/product-list", {
  //       prods: products,
  //       pageTitle: "All Products",
  //       path: "/products",
  //     });
  // })
};

exports.getIndex = (req, res, next) => {
  // when data is fetching/retrieving from local JSON file
  // Products.fetchAll((products) => {
  //   res.render("shop/index", {
  //     prods: products,
  //     pageTitle: "Shop",
  //     path: "/",
  //   });
  // });

  // when data is fetching/retrieving from MySQL database using mysql2 npm package
  // Products.fetchAll().then(([rows, fieldData]) => {
  //   res.render("shop/index", {
  //     prods: rows,
  //     pageTitle: "Shop",
  //     path: "/",
  //   });
  // });

  // when data is fetching/retrieving from MySQL database using sequelize npm package
  Products.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  // when data is fetching/retrieving from local JSON file
  // Cart.getCart((cart) => {
  //   Products.fetchAll((products) => {
  //     const cartProducts = [];
  //     for (var product of products) {
  //       const cartProductData = cart.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render("shop/cart", {
  //       path: "/cart",
  //       pageTitle: "Your Cart",
  //       products: cartProducts,
  //     });
  //   });
  // });
  // when data is fetching/retrieving from MySQL database using sequelize npm package
  req.user
    .getCart()
    .then((cart) =>
      cart.getProducts().then((products) => {
        res.render("shop/cart", {
          path: "/cart",
          pageTitle: "Your Cart",
          products: products,
        });
      })
    )
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  // when data is fetching/retrieving from local JSON file
  // Products.findById(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price);
  // });
  // res.redirect("/cart");

  // when data is fetching/retrieving from MySQL database using sequelize npm package
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  // when data is fetching/retrieving from local JSON file
  // Products.findById(prodId, (product) => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect("/cart");
  // });

  // when data is fetching/retrieving from MySQL database using sequelize npm package
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts({ where: { id: prodId } })
        .then((products) => {
          const product = products[0];
          return product.cartItem.destroy();
        })
        .then((result) => {
          res.redirect("/cart");
        });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      cart.getProducts();
    })
    .then((products) => {
      req.user
        .createOrder()
        .then((order) => {
          order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((result) => fetchedCart.setProducts(null))
    .then((result) => res.redirect("/orders"))
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
