const http = require("http");
const express = require("express");
const path = require("path");
const expressHbs = require("express-handlebars");
const bodyParser = require("body-parser");

// const routes = require('./routes')
const rootDir = require("./util/path");

// to import database js
// const db = require("./util/database");

// const sequelize = require("./util/database");
const User = require("./models/user");
const adminRouter = require("./routers/admin");
const shopRouter = require("./routers/shop");
const errorController = require("./controllers/error");
// const Product = require("./models/products");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");
// const server = http.createServer(routes.handler);
const app = express();

// to use pug HTML template engine
// app.set('view engine','pug')

// to use Handlerbars HTML template engine
// app.engine("hbs", expressHbs());

// to use layouts in Hadlerbars HTML template engine
// app.engine("hbs", expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));
// app.set("view engine", "hbs");

// to use ejs HTML template engine
app.set("view engine", "ejs");

app.set("views", "views");

// db.execute("SELECT * FROM products")
// .then((result) => {
//     console.log("result",result[0])
// })
// .catch((err) => {
// console.log("err",err)
// });

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => console.log(err));
});

// to take the value from user input
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter.routes);
app.use(shopRouter);

app.use(errorController.get404Page);
const server = http.createServer(app);
// console.log(routes.someText)

// to start node js server
// server.listen(7000);

// to create User table and add userId filed in product table
// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// // to sync the data from the database and when data is fetched then server will start
// sequelize
//   .sync()
//   .then((result) => {
//     // console.log(result)
//     return User.findByPk(1);
//     // server.listen(7000);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({ name: "Sufiyan Akbani", email: "test@test.com" });
//     }
//     return user;
//   })
//   .then((user) => {
//     // console.log(user.dataValues)
//     return user.createCart();
//   })
//   .then((cart) => server.listen(7000))
//   .catch((err) => console.log(err));
