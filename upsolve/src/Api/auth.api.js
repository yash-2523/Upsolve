function getToken() {
    return window.localStorage.getItem("token");
}

function TokenAuthentication() {
    let token = getToken();
    if(!token){
        return false;
    }
    let payload =JSON.parse(atob(token.split('.')[1]));
    return payload;
}

function loginProcess(username,password,setError) {
    
    // if(!username || !password){
    //     return;
    // }
    fetch('http://localhost:4000/api/users/login',{
        method: "post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,password
        })
    }).then(res => res.json()).then((data) => {
        if(data.status){
            window.localStorage.setItem("token",data.token);
            window.location = "/challenge";
            return true;
        }
        else{
            return false;
            
        }
    });
}  

function logout() {
    window.localStorage.removeItem("token");
    window.location = '/'
}

export {getToken,TokenAuthentication,loginProcess,logout};