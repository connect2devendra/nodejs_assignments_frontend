import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';

const Profile = () => {

    const baseUrl = "http://localhost:5000";
    const [user, setUser] = useState({}); 
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory(); 


    
    const fetchUser = async (access_token, userId) => {  

        // console.log("Access Token >> ", access_token);

        let response = await fetch(`${baseUrl}/api/v1/users/${userId}`, {
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
            setUser(response.result);                        
        } 

    };

    useEffect(() => {   

        let access_token;
        let userInfo;
        let userId;
        
        if (localStorage.getItem('access_token')) {
            access_token = localStorage.getItem('access_token');
            userInfo = localStorage.getItem('user_info');
            userInfo = JSON.parse(userInfo);
            userId = userInfo.id;

            fetchUser(access_token, userId);
        }else{
            history.push('/login');
        }       

    },[]);    

    return (
        <div className="container">            
            <div className="row pd-5 mt-5">
                <div className="col-sm-4 offset-sm-4" style={{border: "1px solid #cccccc", padding: "10px 10px"}}>
                <h3>Profile Details</h3>
                <br/>
                <p><strong>Name :</strong>  {user.name}</p>
                <p><strong>Email :</strong>  {user.email}</p>
                <p><strong>Role :</strong>  {user.role}</p>
                </div>
            </div>            
        </div>
    );
}

export default Profile;
