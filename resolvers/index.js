
const Employee = require('../models/employee')

module.exports = {
    employees: () => {
        return Employee
            .find()
            .then(employees => {
                return employees.map(employee => {
                    // Strip mongoose metadata. We only care about our fields.
                    return { ...employee._doc }
                })
            })
            .catch(err => {
                throw err
            })
    },
    createEmployee: (args) => {
        const employee = new Employee({
            firstName: args.employeeInput.firstName,
            lastName: args.employeeInput.lastName,
            email: args.employeeInput.email,
            phone: args.employeeInput.phone,
            cell: args.employeeInput.cell,
            dob: new Date(args.employeeInput.dob)
        })
        return employee
            .save()
            .then(result => {
                // Strip mongoose metadata. We only care about our fields.
                return { ...result._doc }
            }).catch(err => {
                throw err
            })
    }
}
