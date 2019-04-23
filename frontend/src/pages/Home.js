import React, { Component } from 'react'

import './Home.css'

class Home extends Component {
    state = {
        employees: [],
        totalEmployees: 0,
        pageSize: 9,
        page: 1,
    }

    componentDidMount() {
        this.getTotalEmployees()
        this.fetchEmployees()
    }

    getTotalEmployees() {
        const countRequestBody = {
            query: `
                mutation {
                    countEmployees
                }
            `
        }

        // Get employee count for pagination
        fetch('http://localhost:1138/api', {
            method: 'POST',
            body: JSON.stringify(countRequestBody),
            headers: { 
                'Content-Type': 'application/json'
            }
        })
        .then(result => {
            if (result.status !== 200 && result.status !== 201) {
                throw new Error('Failed to get employee count')
            }
            return result.json()
        })
        .then(resultData => {
            console.log(resultData)
            const employeeCount = resultData.data.countEmployees
            this.setState({employeeCount: employeeCount})
        })
        .catch(err => {
            console.log(err)
        })
    }

    fetchEmployees() {
        const employeeRequestBody = {
            query: `
                query {
                    employees {
                        _id,
                        firstName,
                        lastName,
                        email,
                        phone,
                        cell,
                        dob,
                        photo
                    }
                }
            `
        }

        // Get employee records for current page
        fetch('http://localhost:1138/api', {
            method: 'POST',
            body: JSON.stringify(employeeRequestBody),
            headers: { 
                'Content-Type': 'application/json'
            }
        })
        .then(result => {
            if (result.status !== 200 && result.status !== 201) {
                throw new Error('Failed to get employees')
            }
            return result.json()
        })
        .then(resultData => {
            const employees = resultData.data.employees
            this.setState({employees: employees})
        })
        .catch(err => {
            console.log(err)
        })
    }


    render() {
        const employeeList = this.state.employees.map(employee => {
            var dob = new Date(employee.dob)
            employee.dob = (dob.getMonth() + 1) + '/' + dob.getDate() + '/' +  dob.getFullYear()

            return <div/> //<EmployeeCard key={employee._id} employeeData={employee} />
        })

        let active = this.state.page;
        let items = [];
        for (let number = 1; number <= (this.state.employeeCount / this.state.pageSize); number++) {
            items.push(
                <div/>
                //<Pagination.Item key={number} active={number === active}>
                //{number}
                //</Pagination.Item>,
            );
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col xs-12">
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="container">
                            <div className="row">{employeeList}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
