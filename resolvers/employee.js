
const Employee = require('../models/employee')

module.exports = {
    employees: async () => {
        try {
            const employees = await Employee
            employees.map(employee => {
                return { ...employee._doc }
            })
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    createEmployee: async (args) => {
        const employee = new Employee({
            firstName: args.employeeInput.firstName,
            lastName: args.employeeInput.lastName,
            email: args.employeeInput.email,
            phone: args.employeeInput.phone,
            cell: args.employeeInput.cell,
            dob: new Date(args.employeeInput.dob)
        })
        try {
            var result = await employee.save()
            return { ...result._doc }
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}
