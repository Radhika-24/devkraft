import { useState } from "react";
import { useHistory } from "react-router-dom";

const Home = (props) => {
    const [data, setData] = useState({password:"", confirm:""});
    const [error, setError] = useState([]);
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        let err = [`The following fields value are incorrect:`];
        if(data.password.length < 8 ) {
            err.push(`Password should be more than 8 charcters.`);
        }

        if(data.confirm.length < 8 || data.password !== data.confirm ) {
            err.push(`Confirm password does not match the password.`);
        }

        if(err.length > 1) {  
            setError(err);
        }
        else{
            props.updatePassword({
                email: props.data.email,
                password: data.password,
            }); 
        }
    }
    if(props.data) {
        return(
            <div className="component">
                <table>
                    <tbody>
                        <tr>
                            <td className="table-heading">Name</td>
                            <td className="table-data">{props.data.name}</td>
                        </tr>
                        <tr>
                            <td className="table-heading">Email Address</td>
                            <td className="table-data">{props.data.email}</td>
                        </tr>
                        <tr>
                            <td className="table-heading">Address</td>
                            <td className="table-data">{props.data.address}</td>
                        </tr>
                        <tr>
                            <td className="table-heading">Contact</td>
                            <td className="table-data">{props.data.contact}</td>
                        </tr>
                        <tr>
                            <td className="table-heading">Gender</td>
                            <td className="table-data">{props.data.gender}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <h1 style={{textAlign: "center"}}>Update Password</h1>

                {
                    props.successMessage && <div className="success-message">
                        Password has been updated.
                    </div>
                }
                {error.length > 0 && <div className="error-message">
                    <ul>
                        {error.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>
                        
                    </div>
                }

                <form className="form-style">
                    <div className="form-group">
                        <div className="right-col">
                            <label>Password</label> <br/>
                            <input type="password" value={data.password} 
                                onChange={e => setData({...data, password: e.target.value})} /> 
                        </div>
                    </div>
    
                    <div className="form-group">
                        <div className="left-col">
                            <label>Confirm Password</label> <br/>
                            <input type="password" value={data.confirm} 
                                onChange={e => setData({...data, confirm: e.target.value})} />
                        </div>
                    </div>
                    <button type="submit" className="btn" onClick={handleSubmit} >Update</button>
                </form>
            </div>
        )
    }
    else{
        history.push("/");
    }
    
}
export default Home;