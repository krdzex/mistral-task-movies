import express from "express";
import moviesCtrl from "../controller/movie.controller";

const router = express.Router()

router.route("/movies").get(moviesCtrl.listMovies)
router.route("/movies/:movieId").put(moviesCtrl.vote)


export default router;