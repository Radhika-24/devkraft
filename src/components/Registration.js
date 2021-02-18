import { useState } from "react";
import { Link } from "react-router-dom";

const Registration = props => {

    const initialObj = {
        name: "",
        email: "",
        contact: "",
        address: "",
        gender: "",
        password: "",
        confirm: ""
    }
    const [data, setData] = useState(initialObj);
    const [error, setError] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        let err = [`The following fields value are incorrect:`];
        
        if(data.name === "" || !data.name.match(/^[A-Za-z]+$/)) {
            err.push(`* Name should contain only alphabets.`);
        }

        if(data.email === "" || !data.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            err.push(`Invalid email`);
        }

        if(data.contact === "" || !data.contact.match(/^\d{10}$/)) {
            err.push(`Invalid contact number`);
        }

        if(data.address === "") {
            err.push(`Address is required.`);
        }

        if(data.gender !== "male" && data.gender !== "female") {
            err.push(`Gender is required.`);
        }
        
        if(data.password.length < 8 ) {
            err.push(`Password should be more than 8 charcters.`);
        }

        if(data.confirm.length < 8 || data.password !== data.confirm ) {
            err.push(`Confirm password does not match the passoword.`);
        }

        if(err.length > 1) {  
            setError(err);
        }
        else{
            props.registerUser(data); 
        }
    }

    return (
        <div className="component">
            <h1 style={{textAlign: "center"}}>Registration</h1>
            {error.length > 0 && <div className="error-message">
                <ul>
                    {error.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
                    
                </div>
            }
            {
                props.successMessage && <div className="success-message">
                    New user has been registered.
                </div>
            }
            <form className="form-style">
                <div className="form-group">
                    <div className="left-col">
                        <label>Name</label> <br/>
                        <input type="text" value={data.name} 
                            onChange={e => setData({...data, name: e.target.value})} />
                    </div>
                    <div className="right-col">
                        <label>Email Address</label> <br/>
                        <input type="text" value={data.email} 
                            onChange={e => setData({...data, email: e.target.value})} /> 
                    </div>
                </div>

                <div className="form-group">
                    <div className="left-col">
                        <label>Contact Number</label> <br/>
                        <input type="text" value={data.contact} 
                            onChange={e => setData({...data, contact: e.target.value})} /> 
                    </div>
                    <div className="right-col">
                        <label>Address</label> <br/>
                        <input type="text" value={data.address} 
                            onChange={e => setData({...data, address: e.target.value})} />
                    </div>
                </div>

                <div className="form-group">
                    <div className="left-col">
                        <label>Password</label> <br/>
                        <input type="password" value={data.password} 
                            onChange={e => setData({...data, password: e.target.value})} />
                    </div>
                    <div className="right-col">
                        <label>Confirm Password</label> <br/>
                        <input type="password" value={data.confirm} 
                            onChange={e => setData({...data, confirm: e.target.value})} />
                    </div>
                </div>

                <div className="form-group">
                    <div className="left-col">
                        <label>Gender</label> <br/>
                        <input type="radio" id="male" name="gender" value="male" checked={data.gender === "male"}
                        onChange={e => setData({...data, gender: e.target.value})}/>
                        <label htmlFor="male">Male</label> &nbsp;
                        <input type="radio" id="female" name="gender" value="female" checked={data.gender === "female"}
                        onChange={e => setData({...data, gender: e.target.value})}/>
                        <label htmlFor="female">Female</label>
                    </div>
                </div>

                <Link to="/">Login</Link> instead?
                <button type="submit" className="btn" onClick={handleSubmit} >Register</button>
            </form>
        </div>
    )
}
export default Registration;