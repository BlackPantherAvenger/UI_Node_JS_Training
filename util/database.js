// To connect the node app with MySQL database using mysql2 npm package
// const mysql = require('mysql2')

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: 'perficient@123'
// })

// module.exports = pool.promise()

// To connect the node app with MySQL database using sequelize npm package
// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("node-complete", "root", "perficient@123", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;

// To connect the node app with mongodb database
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url =
  "mongodb+srv://sufiUser:Sufi123456@cluster0.0cvjgpw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const MongoConnect = (callback) => {
  MongoClient.connect(url)
    .then((client) => {
      console.log("Connected!!");
      callback(client);
    })
    .catch((err) => console.log("err-database", err));
};
// To create DB and insert data
// async function createDocument() {
//   try {
//     const database = client.db("testDB");
//     const collection = database.collection("employeeDetails");

//     const data = { name: "John Doe", email: "john@example.com", age: 30 };

//     const result = await collection.insertOne(data);
//     console.log("Inserted document:", result.insertedId);
//   } catch (err) {
//     console.error("Error inserting document:", err);
//   }
// }
// createDocument();

// // to read the data
// async function readDocuments() {
//   try {
//     const database = client.db('testDB');
//     const collection = database.collection('employeeDetails');

//     const documents = await collection.find({}).toArray();
//     console.log('Retrieved documents:', documents);
//   } catch (err) {
//     console.error('Error reading documents:', err);
//   }
// }

// readDocuments();

// // To update the data 
// async function updateDocument() {
//   try {
//     const database = client.db('testDB');
//     const collection = database.collection('employeeDetails');

//     const query = { name: 'John Doe' };
//     const newData = { $set: { age: 35 } };

//     const result = await collection.updateOne(query, newData);
//     console.log('Updated document count:', result.modifiedCount);
//   } catch (err) {
//     console.error('Error updating document:', err);
//   }
// }

// updateDocument()

// To delete the data
async function deleteDocument() {
  try {
    const database = client.db('testDB');
    const collection = database.collection('employeeDetails');

    const query = { name: 'John Doe' };

    const result = await collection.deleteOne(query);
    console.log('Deleted document count:', result.deletedCount);
  } catch (err) {
    console.error('Error deleting document:', err);
  }
}

deleteDocument()


module.exports = MongoConnect;
