import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import validation from '../../helpers/loginform.validation';

const Login = () => {

    const baseUrl = "http://localhost:5000";
    const [credential, setCredential] = useState({
        email:"",
        password:""
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState('');
    const history = useHistory();    

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        // console.log(name,value);

        setCredential({ ...credential, [name] : value });
    } 
    
    const handleValidation = (e) => {
        e.preventDefault();
        setErrors(validation(credential));
    }

    const handleLogin = async () => {         
        // e.preventDefault();
         
            console.log("Credential >> ", credential);

            let result = await fetch(`${baseUrl}/api/v1/users/login`,{
                method: "POST",
                headers: {
                    'Content-type':"application/json; charset=UTF-8",
                    'accept': "application/json"
                },
                body: JSON.stringify(credential)
            });           
            result = await result.json();
            // console.log(result);
            if (result.success) {
                localStorage.setItem('user_info', JSON.stringify(result.user));
                localStorage.setItem('access_token', result.access_token);   
                if (result.user.role === 'ADMIN') {
                    history.push('/users');
                    return;
                }else{
                    history.push('/profile');
                    return;
                }       
            }else{
            localStorage.setItem('user_info', null);
            localStorage.setItem('access_token', null);
            setErrorMessage(result.message);   
            }
            
    };

    useEffect(() => {

        let userInfo = localStorage.getItem('user_info');
        userInfo = JSON.parse(userInfo);

        if (userInfo && userInfo.role === 'ADMIN') {
            history.push('/users'); 
            return;               
        }else if(userInfo && userInfo.role === 'EMPLOYEE'){
            history.push('/profile');
            return;
        }        
                  
    });

    return (
        <>
        <div className="container">
            <div className="row pd-5 pt-5">
                    
                <div className="col-sm-4 offset-sm-4" style={{border: "1px solid #cccccc", padding: "35px 30px", textAlign: "center"}}>
                    
                    {errorMessage && <p className="text-danger"> {errorMessage} </p>}

                    <label htmlFor="email" className="mb-2"><strong>Email</strong></label>
                    <input type="text" name="email" placeholder="Enter email here!" className="form-control" onBlur={handleValidation} onChange={handleInput} value={credential.email} autoComplete="off" />
                    {errors.email && <p className="text-danger"> {errors.email} </p>}
                    
                    <br/>

                    <label htmlFor="password" className="mb-2"><strong>Password</strong></label>
                    <input type="password" name="password" placeholder="Enter password here!" className="form-control" onBlur={handleValidation} onChange={handleInput} value={credential.password} autoComplete="off"/>
                    {errors.password && <p className="text-danger"> {errors.password} </p>}
                   
                    <button type="button" className="btn btn-primary btn-sm mt-5" style={{width: "100px"}} onClick={ () => handleLogin() }>Login</button>
                </div>
            </div>            
        </div>
    </>
    );
}

export default Login; 
