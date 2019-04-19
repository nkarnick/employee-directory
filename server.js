const express = require('express')
const parser = require('body-parser')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')

const schema = require('./schema/index')
const resolvers = require('./resolvers/index')

const app = express()

app.use(parser.json())

app.use('/api', graphqlHttp({
    schema: schema,
    rootValue: resolvers,
    graphiql: true // Set to false in prod, should be in an .env
}))

// Connect to MongoDB Atlas
mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@karnick-b0hmt.mongodb.net/${process.env.DB_NAME}?retryWrites=true`, { useNewUrlParser: true }
).then(() => {
    app.listen('1138')
    console.log('Server listening on port: 1138')
}).catch(err => {
    console.log(err)
})
