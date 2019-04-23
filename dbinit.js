const readline = require('readline')
const fetch = require('node-fetch')
const Employee = require('./models/employee')
const mongoose = require('mongoose')

start()

async function start () {
    const ans = await askQuestion('Are you sure you want to initialize the DB? This will WIPE and repopulate the directory (Y/n) ')
    if (ans.toUpperCase() === 'Y') {
        return new Promise(resolve => {
            mongoose.connect(
                // Being very lazy and hard coding these values. These belong in an .env file.
                `mongodb+srv://postlight:test123@karnick-b0hmt.mongodb.net/employee-directory?retryWrites=true`, { useNewUrlParser: true }
            ).then(() => {
                console.log('Here we go...')
                console.log('Removing existing employees...')
                Employee.deleteMany({}).catch(err => {
                    console.log(err)
                })
                const url = 'https://randomuser.me/api/?results=250&seed=postlight'
                fetch(url)
                    .then((resp) => resp.json())
                    .then(function (data) {
                        console.log('Populating new employees...')
                        saveEmployees(data.results)
                        Promise.resolve()
                    })
                    .catch(err => {
                        console.log(err)
                    })
                resolve()
            }).catch(err => {
                console.log(err)
            })
        })
    }
}

function saveEmployees (employees) {
    var newEmployees = []
    employees.forEach(employee => {
        const newEmployee = new Employee({
            firstName: capFirst(employee.name.first),
            lastName: capFirst(employee.name.last),
            email: employee.email,
            phone: employee.phone,
            cell: employee.cell,
            dob: employee.dob.date,
            photo: employee.picture.large
        })

        // Skip non-latin names like Arabic, Cyrillic, etc
        var regex = /[^\u0000-\u007F\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u02B0-\u02FF]/g
        if (newEmployee.firstName.match(regex) || newEmployee.lastName.match(regex)) {
            return
        }

        console.log('Creating ' + newEmployee.firstName + ' ' + newEmployee.lastName)
        newEmployees.push(newEmployee)
    })

    Employee
        .insertMany(newEmployees)
        .then(() => {
            console.log('done!')
            process.exit()
        }).catch((err) => {
            console.log(err)
        })
}

/**
 * Helper function that waits for console input.
 * @param {*} question The question string to be displayed
 *
 * https://stackoverflow.com/a/50890409
 */
function askQuestion (question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    return new Promise(resolve => rl.question(question, ans => {
        rl.close()
        resolve(ans)
    }))
}

/**
 * Helper function to capitalize the first letter of a string.
 * @param {*} s The string to be capitalized
 */
function capFirst (s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
