import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import { useState } from 'react';


function App() {
    const [users, setUsers] = useState([]);
    const [successMessage, setSuccessMessage] = useState(false);

    const registerUser = user => {
        delete user.confirm;
        setUsers(prevUsers => [...prevUsers, user]);
        setSuccessMessage(true);
        setTimeout(() => {
            setSuccessMessage(false)
        }, 2000);
    }

    const loginUser = userLogin => {
        const user = users.find(u => u.email === userLogin.email);
        if(user) {
            if(user.password === userLogin.password) {
                return null;
            }
            else {
                return "Incorrect Password"
            }
        }
        else {
            return "User not found";
        }
    }

    const updatePassword = userUpdate => {
        const updatedList = users.map(user => {
            if(userUpdate.email === user.email) {
                user.password = userUpdate.password;
            }
            return user;
        });
        setUsers(updatedList);
        setSuccessMessage(true);
        setTimeout(() => {
            setSuccessMessage(false)
        }, 2000);
    }

    const HomeComponent = ({match}) => <Home updatePassword={updatePassword} data={users.filter(user => user.email === match.params.email)[0]} successMessage={successMessage}/>
    
  return (
    <BrowserRouter>
        <Header/>
        <Switch>
            <Route path="/home/:email" component={HomeComponent}/>
            <Route path="/registration" component={() => <Registration registerUser={registerUser} successMessage={successMessage} />}/>
            <Route path="/" component={() => <Login loginUser={loginUser} /> }/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
