import react,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { handleError, handleSuccess } from './util';
// import LINK from 'react-router-dom';
import {ToastContainer} from 'react-toastify'

function Login()
{

    const [loginInfo,setloginInfo]=useState({
        email:"",
        password:""
    })
    // const [email,setemail]=useState("");
    // const [password, setpass]=useState("");

    const handleChange=(e)=>{
        const{name,value}=e.target;
        const copyloginInfo={...loginInfo};
        copyloginInfo[name]=value;
        setloginInfo(copyloginInfo);
    }

    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault()
        let x=0;
        const{email,password}=loginInfo;
        if(!email || !password)
        {
            handleError("E-mail & Password are required");
        }
        axios.post('http://localhost:3001/login',{email,password})
        .then(result=>{
            if(result.data==="success")
            {
                navigate('/');
                handleSuccess("Successfully logged In !");
            }
            else if(result.data==="Password is Incorrect"){
                handleError("Password is Incorrect !");
            }
            // else if(result.data==="pass is blannk")
            // {
            //     handleError("Password is Required");
            // }
            // else if(result.data==="pass is blank"){
            //     handleError("Password is required");
            // }
            // else{
            //     handleError("First Register Yourself !")
            // }
        
    })
        
        .catch(error=>console.log(error))
        
    }

    return (
        <div className='container'>
            <h1>LOGIN</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="email" name="email" placeholder="Enter E-mail ID" value={loginInfo.email}/>
                <input onChange={handleChange} type="password" name="password" placeholder="Enter Password" value={loginInfo.password}/>
                <button>Login</button>
                <p>New User? <a href="/register">Register here</a></p>
            </form>
            <ToastContainer />
        </div>
    );
}
export default Login;