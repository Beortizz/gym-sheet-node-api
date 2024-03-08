import express from "express";
import router from "./routes/router";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
const port = 3000;

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
