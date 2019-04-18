const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type Employee {
    _id: ID!
    firstName: String!
    lastName: String!
    jobTitle: String!
    email: String!
    phone: String!
    cell: String!
    dob: String!
}

input EmployeeInput {
    firstName: String!
    lastName: String!
    jobTitle: String!
    email: String!
    phone: String!
    cell: String!
    dob: String!
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
`)
