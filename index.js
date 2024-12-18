const express = require("express");
const connect = require("./connection")

const urlRouter = require("./routes/url");
const app = express();

const PORT = 8001;

connect("mongodb+srv://Mattsun_dev:AV8mteGMZKEKpf2F@my-mongo-cluster.glake.mongodb.net/URL-shorterDB")
    .then(() => console.log("database connected!"))
    .catch((err) => console.log(`failed to connect to database: ${err}`))

// x-www-form-urlencoded format -> encoded body
app.use(express.urlencoded({ extended: true}))
app.use("/url", urlRouter)

app.listen(PORT, () => {console.log(`server is running at port: ${PORT}`)});