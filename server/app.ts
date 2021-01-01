export {};
import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import cors from "cors";
const schema = require("./schema/schema");

const app = express();

//Allow cross-origin request
app.use(cors());

mongoose.connect("mongodb://localhost:27017/graphqldb", {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.on("error", (err) => console.log(err));
db.once("open", () => {
  console.log("Database Connection Established");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Now listening for requests on port 4000");
});
