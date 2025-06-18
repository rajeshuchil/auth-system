const API= 'http://localhost:5000/api';


const showMessage=(msg)=>{
    const msgBox = document.getElementById('message');
    if(msgBox){
        msgBox.innerText = msg;
    }
}

const register = async ()=>{
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    try{
        const res = await fetch(`${API}/register`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({name,email,password}),
        });
        const data = await res.json();
        if(res.ok){
            localStorage.setItem('authToken',data.token);
            setTimeout(()=>{
                window.location.href='index.html';
            },100);
        }else{
            showMessage(data.msg|| 'Registration failed');
        }
    }catch(err){
        console.error(err);
        showMessage("error registering");
    }
}

const login = async () =>{
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try{
        const res = await fetch (`${API}/login`,{
            method:'POST',
            headers:{'Content-type': 'application/json'},
            body: JSON.stringify({email,password}),
        });
        const data= await res.json();
        if(res.ok){
            localStorage.setItem('authToken',data.token);
            setTimeout(()=>{
                window.location.href= 'index.html';
            },100);
        }else{
            showMessage(data.msg|| 'login failed');
        } 
    }catch(err){
        showMessage('Login error');
    }
}

const getProtected = async ()=>{
    const token = localStorage.getItem('authToken');
    if(!token){
        window.location.href='login.html';
        return;
    }
    try{
        const res = await fetch(`${API}/protected`,{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        if(res.ok){
            showMessage(data.msg);
        }else{
            showMessage(data.msg||'access denied');
        }
    }catch(err){
        showMessage('error accessing protected route');
    }
}

const logout= ()=>{
    localStorage.removeItem('authToken');
    window.location.href='login.html';
};

document.addEventListener("DOMContentLoaded", ()=>{
    const path = window.location.pathname;
    if(path.endsWith('index.html')){
        getProtected();
    }
});
