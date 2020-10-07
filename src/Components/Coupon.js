import React,{useState} from 'react'

import TableContent from "./TableContent"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import DatePicker from 'react-date-picker';

import 'bootstrap/dist/css/bootstrap.min.css';

function Coupon() {

    const initialState = ""

    const [state, setstate] = useState([])

    const [Code, setCode] = useState(initialState)
    const [Course, setCourse] = useState(initialState)
    const [Payment, setPayment] = useState("amount")
    const [Amount, setAmount] = useState()
    const [Percentage, setPercentage] = useState()
    const [Use, setUse] = useState(initialState)
    const [ValidFrom, setValidFrom] = useState(initialState)
    const [ValidTo, setValidTo] = useState(initialState)



    function handleChange(e){
        if( e.target.id === "single" || e.target.id === "validity"){
            setUse(e.target.id)
        }
        else if ( e.target.id === "selectBar"){
            setPayment(e.target.value)
        }
        else if ( e.target.id === "coupon" ){
            const value = e.target.value;
            const regex = /^[0-9a-zA-Z(\-)]+$/; 
            if (value.match(regex) || value === "") {
                setCode(e.target.value)
                document.getElementById("codeError").style.display = "none"
            }
            else{
                document.getElementById("codeError").style.display = "block"
            }
            
        }
        else if ( e.target.id === "course" ){
            setCourse(e.target.value)
        }
        else if ( e.target.id === "amount" ){
            const value = e.target.value;
            const regex = /^[0-9]+$/; 
            if ((value.match(regex) || value === "") && e.target.value >= 100 && e.target.value <=7000 )
            {
                document.getElementById("amountError").style.display = "none"
                setAmount(e.target.value)
            }            
            else{
                document.getElementById("amountError").style.display = "block"
            }
        }        
        else if ( e.target.id === "percentage" ){
            const value = e.target.value;
            const regex = /^[0-9]+$/; 
            if ((value.match(regex) || value === "") && e.target.value >= 2 && e.target.value <=50 )
            {
                document.getElementById("percentageError").style.display = "none"
                setPercentage(e.target.value)
            }            
            else{
                document.getElementById("percentageError").style.display = "block"
            }
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(state)
        setCode("")
        setCourse("")
        setAmount(0)
        setPercentage(0)
        setPayment("amount")
        setUse("")
        setValidTo("")
        setValidFrom("")
        setstate([...state,{Code,Course,Payment,Amount,Percentage,Use,ValidFrom,ValidTo}])
    }

    return (
        <div>
            <br></br>
            <h3>Coupon Code Generator</h3>
            <div className="main">
                <div className="left">
                    <hr></hr>
                    <br></br>
                    <TableContent state={state} />
                </div>
                <div className="right">
                    <Form>
                        <Form.Group>
                            <Form.Label>Coupon Code</Form.Label>
                            <Form.Control type="text" placeholder="Enter Coupon Code" value={Code} id="coupon" onChange={handleChange}/>
                            <Form.Label style={{display : "none" , color:"red", fontSize:"15px",margin:"5px"}} id="codeError"> Special Characters Not Allowed</Form.Label>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Courses</Form.Label>
                            <Form.Control type="text" placeholder="Enter Course Name" value={Course} id="course" onChange={handleChange}  />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Payment Mode</Form.Label>
                            <Form.Control as="select" custom onChange={handleChange} id="selectBar">
                            <option value="amount">Amount</option>
                            <option value="discount">Discount</option>
                            </Form.Control>
                        </Form.Group>

                        {
                        Payment === "amount" ?                        
                         <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" max="7000" min="100" placeholder="Enter Amount" value={Amount} id="amount" onChange={handleChange}  />
                            <Form.Label style={{display : "none" , color:"red", fontSize:"15px",margin:"5px"}} id="amountError"> Enter Value Within Range 100 and 7000</Form.Label>
                        </Form.Group> :
                        <Form.Group>
                            <Form.Label>Percentage </Form.Label>
                            <Form.Control type="number" max="50" min="2" placeholder="Enter Percentage" value={Percentage} id="percentage" onChange={handleChange} />
                            <Form.Label style={{display : "none" , color:"red", fontSize:"15px",margin:"5px"}} id="percentageError"> Enter Value Within Range 2 and 50</Form.Label>
                        </Form.Group>
                        }

                        <Form.Check
                            custom
                            inline
                            checked = {Use === "single"? true : false}
                            type="radio"
                            label="Single Use"
                            id="single"
                            onChange={handleChange}
                        />
                        <Form.Check
                            custom
                            inline
                            checked = {Use === "validity"? true : false}
                            type="radio"
                            label="Validity Based"
                            id="validity"
                            onChange={handleChange}
                        />
                        
                        <br></br>
                        <br></br>
                        {Use === "validity" ? 
                            <div>
                                <div className="dateBox">
                                    <Form.Label>Valid From</Form.Label>
                                    <DatePicker
                                        onChange={setValidFrom}
                                        value={ValidFrom}
                                        id="validFrom"
                                    />
                                </div>
                                <br></br>
                                <div className="dateBox">
                                    <Form.Label>Valid Till</Form.Label>
                                    <DatePicker
                                        onChange={setValidTo}
                                        value={ValidTo}
                                        id="validTo"
                                    />
                                </div>
                            </div>:null
                        }
                        <br></br>
                        <Button variant="primary" type="button" onClick={handleSubmit} >
                            Submit
                        </Button>
                    </Form>
                </div>   
            </div>         
        </div>
    )
}

export default Coupon
