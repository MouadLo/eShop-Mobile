// server.js
import express from "express"

import bodyParser from "body-parser"
import morgan from "morgan"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { dirname } from "path"
import { fileURLToPath } from "url"

dotenv.config()
//import authJwt from "./helpers/jwt"
//Routes
import categoriesRoutes from "./routes/categories.js"
import productsRoutes from "./routes/products.js"
import usersRoutes from "./routes/users.js"
import ordersRoutes from "./routes/orders.js"

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(cors())
app.options("*", cors())

//middleware
app.use(bodyParser.json())
app.use(morgan("tiny"))
app.use("/public/uploads", express.static(__dirname + "/public/uploads"))
//app.use(authJwt)

const api = process.env.API_URL

app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/users`, usersRoutes)
app.use(`${api}/orders`, ordersRoutes)

//Database
mongoose
    .connect(process.env.CONNECTION_STRING, { useNewUrlParser: true })
    .then(() => {
        console.log("Database Connection is ready...")
    })
    .catch((err) => {
        console.log(err)
    })

//Server
app.listen(3000, () => {
    console.log("server is running http://localhost:3000")
})
