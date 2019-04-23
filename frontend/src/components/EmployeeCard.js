import React from 'react';
import './EmployeeCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EmployeeCard = props => (
    <div className="col sm-12 md-6 lg-4">
        <div className="employee-card__bg"/>
        <div className="container employee-card__wrapper">
            <div className="row">
                <div className="col md-12 lg-auto">
                    <div className="employee-card__picture">
                        <img src={props.employeeData.photo} alt="Employee"></img>
                    </div>
                </div>
                <div className="col">
                    <div className="employee-card__name">
                        <h1>{props.employeeData.firstName} {props.employeeData.lastName}</h1>
                    </div>
                    <div className="employee-card__email">
                        <FontAwesomeIcon icon="envelope" fixedWidth /> <span>{props.employeeData.email}</span>
                    </div>
                    <div className="employee-card__phone">
                        <FontAwesomeIcon icon="phone-volume" fixedWidth /> <span>{props.employeeData.phone}</span>
                    </div>
                    <div className="employee-card__cell">
                        <FontAwesomeIcon icon="mobile-alt" fixedWidth /> <span>{props.employeeData.cell}</span>
                    </div>
                    <div className="employee-card__dob">
                        <FontAwesomeIcon icon="birthday-cake" fixedWidth /> <span>{props.employeeData.dob}</span>
                    </div>
                </div>
            </div>
            <div className="clearfix"/>
        </div>
    </div>
)

export default EmployeeCard
