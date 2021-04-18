import { API } from "../../backend"



export const getOrderUser = (userId,token) => {
    return fetch(`${API}/order/${userId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
    }).then(response => {
        console.log(response)
        return response.json()
    }).catch(err => console.log(err))
}