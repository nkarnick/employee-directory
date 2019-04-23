
const Employee = require('../models/employee')

module.exports = {
    employees: async (args) => {
        try {
            var query = Employee.find()

            // Logic for filtering by _ids
            if (args.ids) {
                query.in('_id', args.ids)
            }

            // Logic for pagination
            var page = parseInt(args.page) || 0
            var limit = parseInt(args.limit) || 9
            query.skip(page * limit)
            query.limit(limit)

            query.sort('lastName') // Default sort should be alphabetical by last name

            const employees = await query.exec()
            console.log(employees)

            var retVal = []
            employees.map(employee => {
                retVal.push({ ...employee._doc })
            })
            return retVal
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
    },
    updateEmployee: async (args) => {
        try {
            var result = await Employee.findByIdAndUpdate(
                args.id,
                {
                    firstName: args.employeeInput.firstName,
                    lastName: args.employeeInput.lastName,
                    email: args.employeeInput.email,
                    phone: args.employeeInput.phone,
                    cell: args.employeeInput.cell,
                    dob: new Date(args.employeeInput.dob)
                },
                { new: true, useFindAndModify: false } // We want the response to return the updated record. We don't want to use the deprecated findOneAndUpdate
            )
            return result
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    deleteEmployee: async (args) => {
        try {
            var result = await Employee.findByIdAndDelete(args.id)
            return result
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}
