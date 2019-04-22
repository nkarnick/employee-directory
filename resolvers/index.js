// This file really isn't neeeded, since I won't have any other resolvers,
// but this is how I would bundle multiple resolvers for import elsewhere.
const employeeResolver = require('./employee')

const rootResolver = {
    ...employeeResolver
}

module.exports = rootResolver
