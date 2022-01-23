import Movie from "../src/models/movie.model";
import { movies } from "./movies"



export const seedMovies = async () => {
    try {
        await Movie.collection.drop()
         await Movie.create(movies)
        console.log("Movies successfuly seeded")
    } catch (error) {
        console.log(error)
    }
}