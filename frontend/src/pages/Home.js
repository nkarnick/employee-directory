import React, { Component } from 'react'
import EmployeeCard from '../components/EmployeeCard'

import './Home.css'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: [],
            totalEmployees: 0,
            pageSize: 9,
            page: 1,
        }
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

    fetchEmployees(page=1) {
        console.log(page)
        const employeeRequestBody = {
            query: `
                query {
                    employees(page: ${page-1}) {
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

    goToPage(pageNum, e) {
        e.preventDefault();
        console.log(pageNum)
        this.setState({page: pageNum}, this.fetchEmployees(pageNum))
    }



    render() {
        const employeeList = this.state.employees.map(employee => {
            var dob = new Date(employee.dob)
            employee.dob = (dob.getMonth() + 1) + '/' + dob.getDate() + '/' +  dob.getFullYear()

            return <EmployeeCard key={employee._id} employeeData={employee} />
        })

        let active = this.state.page;
        let totalPages = Math.floor(this.state.employeeCount / this.state.pageSize)
        let pagination = [];
        for (let number = 1; number <= totalPages; number++) {
            pagination.push(
                <li className={"page-item " + (active === number ? "active" : "")} onClick={(e) => this.goToPage(number, e)} key={"pg-" + number}><a className="page-link" href="/">{number}</a></li>
            );
        }

        return (
            <div className="container-fluid home__main-wrapper">
                <div className="row">
                    <div className="home__pagination-wrapper">
                        <ul className="pagination pagination-sm justify-content-center">
                            <li className={"page-item " + (active === 1 ? "disabled" : "")} onClick={(active !== 1 ? (e) => this.goToPage((this.state.page-1), e) : null)}>
                                <a className="page-link" href="/" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            {pagination}
                            <li className={"page-item " + (active === totalPages ? "disabled" : "")} onClick={(active !== totalPages ? (e) => this.goToPage((this.state.page+1), e) : null)}>
                                <a className="page-link" href="/" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="container-fluid">
                            <div className="row">{employeeList}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
