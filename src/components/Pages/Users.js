import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';

const Users = () => {

    const baseUrl = "http://localhost:5000";
    const [usersList, setUsersList] = useState([]); 
    const [errorMessage, setErrorMessage] = useState(''); 
    const history = useHistory();
    
    const fetchUsers = async (access_token) => {  
        
        // console.log("Access Token >> ", access_token);

        let response = await fetch(`${baseUrl}/api/v1/users`, {
            method: "GET",
            headers: {
                'Content-type':"application/json; charset=UTF-8",
                'accept': "application/json",
                'authorization': `Bearer ${access_token}`
            }
        });   
        
        response = await response.json();
        console.log(response);
        // console.log(response.result);
        if (response.success) {
            setUsersList(response.result);   
            return;                     
        }else{
            console.log(response.message);
            if (response.message === 'Invalid Token...') {
                localStorage.setItem('user_info', null);
                localStorage.setItem('access_token', null);
                history.push('/login');
                return;
            }            
            setErrorMessage(response.message);
        }
        
    };
    

    useEffect(() => {  
           
        if (localStorage.getItem('access_token')) {

            let access_token = localStorage.getItem('access_token');
            fetchUsers(access_token);
        }else{
            history.push('/login');
            return;
        }        
    },[]);    

    return (
        <div className="container">            
            <div className="row pd-5 pt-5">
                <div className="col-sm-4 offset-sm-4" style={{border: "1px solid #cccccc", padding: "10px 10px"}}>
                {errorMessage && (
                <p className="text-danger"> {errorMessage} </p>
                )}
                <h3>User Details</h3>
                <br/>
                <table className="table table-bordered">
                    <thead>
                        <tr className="table-success">
                        {/* <th>#ID</th> */}
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* { JSON.stringify(usersList) } */}

                        {usersList && usersList.map(row => {
                                return (
                                    <tr key={row.id}>
                                        {/* <th key={row.id}>{row.id}</th> */}
                                        <td>{row.name}</td>
                                        <td>{row.email}</td>
                                        <td>{row.role}</td>
                                    </tr>
                                );
                        })}                                                 
                    </tbody>
                    </table>
                </div>
            </div>            
        </div>
    );
}

export default Users;
