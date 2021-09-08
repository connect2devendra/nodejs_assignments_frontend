import Axios from 'axios';

let baseUrl = "http://localhost:5000";

export const fetchUser = (token, userId) => {
    return Axios.get(`${baseUrl}/api/v1/users/${userId}`,{
        headers: {
            'Content-Type':"application/json",
            'Accept': "application/json",
            'Authorization': token
        }
    }).then((res) => {
        if (res.status !== 200) {
          throw res.data.message;
        }
        return res.data;
      });
}

export const fetchUsers = (token) => {
    return Axios.get(`${baseUrl}/api/v1/users`,{
        headers: {
            'Content-Type':"application/json",
            'Accept': "application/json",
            'Authorization': token
        }
    }).then((res) => {
        if (res.status !== 200) {
          throw res.data.message;
        }
        return res.data;
      });
}

export const loginUser = (credential) => {

    return Axios.post(`${baseUrl}/api/v1/users/login`,{
        headers: {
            'Content-Type':"application/json",
            'Accept': "application/json"
        },
        body: JSON.stringify(credential)
    }).then((res) => {
        if (res.status !== 200) {
          throw res.data.message;
        }
        return res.data;
      }); 

}

