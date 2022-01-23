import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import cors from "cors"
import movieRoutes from "./routes/movie.routes"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compression())
app.use(helmet())
app.use(cors())
app.use("/", movieRoutes)
export default app