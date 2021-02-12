const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')

require('dotenv').config()

const PORT = process.env.PORT || 5000

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
})

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connected')
    return server.listen({ port: PORT})
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`)
  })
  .catch((err) => {
    console.error(err)
  })