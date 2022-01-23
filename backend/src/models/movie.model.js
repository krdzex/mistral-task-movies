import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    title: { type: String },
    img: { type: String },
    description: { type: String },
    releaseDate: { type: Date },
    cast: [{ type: String }],
    rating: [{ ratedBy: { type: String }, ratedStar: { type: Number } }]
})

export default mongoose.model("Movie", MovieSchema)