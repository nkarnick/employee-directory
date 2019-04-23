const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Employee {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        phone: String!
        cell: String!
        dob: String!
        photo: String
    }

    input EmployeeInput {
        firstName: String!
        lastName: String!
        email: String!
        phone: String!
        cell: String!
        dob: String!
        photo: String
    }

    type Queries {
        employees(ids: [ID!], page: Int, limit: Int): [Employee!]!
    }

    type Mutations {
        countEmployees: Int!
        createEmployee(employeeInput: EmployeeInput): Employee
        deleteEmployee(id: ID!): Employee!
        updateEmployee(id: ID!, employeeInput: EmployeeInput): Employee
    }

    schema {
        query: Queries
        mutation: Mutations
    }
`)
