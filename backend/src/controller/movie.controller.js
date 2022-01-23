import dbErrorHandler from "../helpers/dbErrorHandler";
import Movie from "../models/movie.model"


const whichQueryIsNeeded = (word) => {
    let query = ""
    switch (word.toLowerCase()) {
        case "least": {
            query = "$gte"
            break
        }
        case "younger":
        case "after": {
            query = "$gte"
            break
        }
        case "older":
        case "most":
        case "before":
        case "up": {
            query = "$lte"
            break
        }
        default:
            query = "$eq"
    }
    return query
}

const changeIntoDate = (result) => {
    let newValue = ""

    if (result.value.toString().length === 4) {
        newValue = new Date(result.value, 0)
    }
    if (result.value.toString().length < 4) {
        newValue = new Date(new Date().setFullYear(new Date().getFullYear() - result.value))
    }
    return newValue
}

const lookingForPhrases = (searchInput) => {
    const result = { query: "$eq" }
    let queryHighlights = ["least", "after", "older", "younger", "most", "up", "before"]
    let splitedWordArray = searchInput.split(" ");
    for (let i = 0; i < splitedWordArray.length; i++) {

        if (queryHighlights.includes(splitedWordArray[i].toLowerCase())) {
            result["query"] = whichQueryIsNeeded(splitedWordArray[i])
        }
        if (splitedWordArray[i].toLowerCase() === "stars" || splitedWordArray[i].toLowerCase() === "star" || splitedWordArray[i].toLowerCase() === "rating") {
            result["field"] = "averageRating"
        }
        if (splitedWordArray[i].toLowerCase() === "older" || splitedWordArray[i].toLowerCase() === "younger" || splitedWordArray[i].toLowerCase() === "after" || splitedWordArray[i].toLowerCase() === "before") {
            result["field"] = "releaseDate"
        }
        if (/\d/.test(splitedWordArray[i])) {
            result["value"] = parseInt(splitedWordArray[i])
        }
    }
    if (result.field === "releaseDate" && result.value) {
        result.value = changeIntoDate(result)
    }
    return result;
}

const listMovies = async (req, res) => {
    try {
        let skip = parseInt(req.query.skip)
        let searchInput = req.query.q
        let limit = 10
        let type = req.query.type
        let phrasesSearch = lookingForPhrases(searchInput)
        let allMoviesCount = await Movie.aggregate([
            {
                $addFields: {
                    averageRating: {
                        $avg: "$rating.ratedStar"
                    },

                }
            },
            {
                $match: {
                    $and: [
                        phrasesSearch.field && phrasesSearch.value ? { [phrasesSearch.field]: { [phrasesSearch.query]: phrasesSearch.value } } : { "title": { $regex: `${searchInput}`, $options: 'i' } },
                        { type: type },
                    ]
                }
            },
            {
                $count: "moviesCount"
            }
        ])

        let allMoviesLength = allMoviesCount.length > 0 ? allMoviesCount[0].moviesCount : 0;
        let movies = await Movie.aggregate([
            {
                $addFields: {
                    averageRating: {
                        $avg: "$rating.ratedStar"
                    },

                }
            },
            {
                $match: {
                    $and: [
                        phrasesSearch.field && phrasesSearch.value ? { [phrasesSearch.field]: { [phrasesSearch.query]: phrasesSearch.value } } : { "title": { $regex: `${searchInput}`, $options: 'i' } },
                        { type: type },
                    ]
                }
            },
            { $sort: { averageRating: -1, releaseDate: -1 } },
            { $skip: skip },
            { $limit: limit }
        ])
        res.json({ movies: movies, loadMore: skip + limit >= allMoviesLength ? false : true });
    } catch (error) {
        return res.status(400).json({
            error: dbErrorHandler.getErrorMessage(error)
        })
    }
}

const vote = async (req, res) => {
    try {
        let type = req.body.type
        let searchInput = req.body.q
        let phrasesSearch = lookingForPhrases(searchInput)
        let movieId = req.params.movieId;
        let limit = parseInt(req.body.limit)
        let allMoviesCount = await Movie.aggregate([
            {
                $addFields: {
                    averageRating: {
                        $avg: "$rating.ratedStar"
                    },

                }
            },
            {
                $match: {
                    $and: [
                        phrasesSearch.field && phrasesSearch.value ? { [phrasesSearch.field]: { [phrasesSearch.query]: phrasesSearch.value } } : { "title": { $regex: `${searchInput}`, $options: 'i' } },
                        { type: type },
                    ]
                }
            },
            {
                $count: "moviesCount"
            }
        ])
        let allMoviesLength = allMoviesCount.length > 0 ? allMoviesCount[0].moviesCount : 0
        await Movie.findByIdAndUpdate(movieId, { $push: { rating: { ratedBy: req.body.ratedBy, ratedStar: req.body.ratedStar } } }).exec()
        let newMoviesList = await Movie.aggregate([
            {
                $addFields: {
                    averageRating: {
                        $avg: "$rating.ratedStar"
                    }
                }
            },
            {
                $match: {
                    $and: [
                        phrasesSearch.field && phrasesSearch.value ? { [phrasesSearch.field]: { [phrasesSearch.query]: phrasesSearch.value } } : { "title": { $regex: `${searchInput}`, $options: 'i' } },
                        { type: type },
                    ]
                }
            },
            { $sort: { averageRating: -1, releaseDate: -1 } },
            { $limit: limit }
        ])
        res.json({ movies: newMoviesList, loadMore: limit + 10 >= allMoviesLength ? false : true });
    } catch (err) {
        return res.status(400).json({
            error: dbErrorHandler.getErrorMessage(err)
        })
    }
}



export default { listMovies, vote }