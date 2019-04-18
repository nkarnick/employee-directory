const express = require('express');
const parser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const app = express();

const employees = [];

app.use(parser.json());

app.use('/api', graphqlHttp({
    // Schema def.
    schema: buildSchema(`
        type Employee {
            _id: ID!
            title: String
            firstName: String!
            lastName: String!
            email: String!
        }

        input EmployeeInput {
            title: String
            firstName: String!
            lastName: String!
            email: String!
        }

        type Queries {
            employees: [Employee!]!
        }

        type Mutations {
            createEmployee(employeeInput: EmployeeInput): Employee
        }

        schema {
            query: Queries
            mutation: Mutations
        }
    `),


    // Resolvers
    rootValue: {
        employees: () => {
            return ['test1', 'test2'];
        },
        createEmployee: (args) => {
            const title = args.title;
            const firstName = args.firstName;
            const lastName = args.lastName;
        }
    },
    graphiql: true
}));


// Connect to MongoDB Atlas
mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@karnick-b0hmt.mongodb.net/test?retryWrites=true`
).then(() => {
    app.listen('1138');
}).catch(err => {
    console.log(err);
});
