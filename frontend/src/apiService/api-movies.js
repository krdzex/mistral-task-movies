import { url } from "../config/config"

const getMovieList = (skipMovies, inputValue, type) => {
    return fetch(`${url}/movies?skip=${skipMovies}&q=${inputValue}&type=${type}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(response => response.json()).catch(err => console.log(err))
}

const updateRating = (movieId, updateData) => {
    return fetch(`${url}/movies/${movieId}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
    }).then(response => response.json()).catch(err => console.log(err))
}


export { getMovieList, updateRating }