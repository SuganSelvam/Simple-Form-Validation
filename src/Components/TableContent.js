import React from 'react'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';

import "../App.css"


function TableContent(props) {
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Code</th>
                        <th>Course</th>
                        <th>Amount</th>
                        <th>Percent</th>
                        <th>Use</th>
                        <th>Valid From</th>
                        <th>Valid Till</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {props.state.map(item => (
                        <tr>
                            <td><span className="dot"></span></td>
                            <td>{item.Code}</td>
                            <td>{item.Course}</td>
                            <td>{item.Amount}</td>
                            <td>{item.Percentage ? item.Percentage : 0}</td>
                            <td>{item.Use}</td>
                            <td>{item.ValidFrom ? item.ValidFrom.getDate()+"-"+item.ValidFrom.getMonth()+1+"-"+item.ValidFrom.getFullYear() : null}</td>
                            <td>{item.ValidTo?item.ValidTo.getDate()+"-"+item.ValidTo.getMonth()+1+"-"+item.ValidTo.getFullYear():null}</td>
                            <td><Button variant="danger">Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default TableContent
