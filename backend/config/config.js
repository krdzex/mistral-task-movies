const config = {
    port: process.env.PORT || 4400,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: "mongodb+srv://krsto:krsto@cluster0.ybslt.mongodb.net/mistral_task?retryWrites=true&w=majority"
}

export default config;