const express = require('express')
const parser = require('body-parser')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')

const schema = require('./schema/index')
const resolvers = require('./resolvers/index')

const app = express()

app.use(parser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    next()
})

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
