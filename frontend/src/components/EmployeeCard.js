import React from 'react';
import './EmployeeCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Col } from 'react-bootstrap';

const EmployeeCard = props => (
    <Col sm={12} md={6} lg={4}>
        <div className="employee-card__bg"/>
        <Container fluid className="employee-card__wrapper">
            <Row noGutters>
                <Col md={12} lg="auto">
                    <div className="employee-card__picture">
                        <img src={props.employeeData.photo} alt="Employee"></img>
                    </div>
                </Col>
                <Col>
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
                </Col>
            </Row>
            <div className="clearfix"/>
        </Container>
    </Col>
)

export default EmployeeCard
