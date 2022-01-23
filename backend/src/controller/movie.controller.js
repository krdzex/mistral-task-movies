import dbErrorHandler from "../helpers/dbErrorHandler";
import Movie from "../models/movie.model"



const listMovies = async (req, res) => {
    try {
        let skip = parseInt(req.query.skip)
        let searchInput = req.query.q
        let limit = 10
        let allMoviesCount = await Movie.count({ title: { $regex: `${searchInput}`, $options: 'i' } })
        let movies = await Movie.aggregate([
            { $match: { "title": { $regex: `${searchInput}`, $options: 'i' } } },
            {
                $addFields: {
                    averageRating: {
                        $avg: "$rating.ratedStar"
                    },
                }
            },
            { $sort: { averageRating: -1, releaseDate: -1 } },
            { $skip: skip },
            { $limit: limit }
        ])
        res.json({ movies: movies, loadMore: skip + limit >= allMoviesCount ? false : true });
    } catch (error) {
        return res.status(400).json({
            error: dbErrorHandler.getErrorMessage(error)
        })
    }
}

const vote = async (req, res) => {
    try {
        let searchInput = req.body.q
        let allMoviesCount = await Movie.count({ title: { $regex: `${searchInput}`, $options: 'i' } })
        let movieId = req.params.movieId;
        let limit = parseInt(req.body.limit)
        await Movie.findByIdAndUpdate(movieId, { $push: { rating: { ratedBy: req.body.ratedBy, ratedStar: req.body.ratedStar } } }, { new: true }).exec()
        let newMoviesList = await Movie.aggregate([
            { $match: { "title": { $regex: `${searchInput}`, $options: 'i' } } },
            {
                $addFields: {
                    averageRating: {
                        $avg: "$rating.ratedStar"
                    }
                }
            },
            { $sort: { averageRating: -1, releaseDate: -1 } },
            { $limit: limit }
        ])
        res.json({ movies: newMoviesList, loadMore: limit + 10 >= allMoviesCount ? false : true });
    } catch (err) {
        return res.status(400).json({
            error: dbErrorHandler.getErrorMessage(err)
        })
    }
}



export default { listMovies, vote }