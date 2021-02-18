import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = props => {
    const [data, setData] = useState({email:"", password:""});
    const [error, setError] = useState([]);
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        setError([]);
        let err = [`The following fields value are incorrect:`];

        if(data.email === "" || !data.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            err.push(`Invalid email`);
        }

        if(data.password.length < 8 ) {
            err.push(`Password should be more than 8 charcters.`);
        }

        if(err.length > 1){
            setError(err);            
        }
        else {
            const res = props.loginUser(data);
            if(res === null) {
                history.push(`/home/${data.email}`);
            }
            else {
                err.push(res);
                setError(err);
            }

        }
    }
    return (
        <div className="login-component">
            <h1 style={{textAlign: "center"}}>Login</h1>
            {error.length > 0 && <div className="error-message">
                <ul>
                    {error.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
                    
                </div>}
            <form className="form-style">
                <div className="form-group">
                    <div className="right-col">
                        <label>Email Address</label> <br/>
                        <input type="text" value={data.email} 
                            onChange={e => setData({...data, email: e.target.value})} /> 
                    </div>
                </div>

                <div className="form-group">
                    <div className="left-col">
                        <label>Password</label> <br/>
                        <input type="password" value={data.password} 
                            onChange={e => setData({...data, password: e.target.value})} />
                    </div>
                </div>
                <Link to="/registration">Register Now</Link>
                <button type="submit" className="btn" onClick={handleSubmit} >Login</button>
            </form>
        </div>
    )
}
export default Login;