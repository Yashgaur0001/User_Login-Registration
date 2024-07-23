import react,{useState} from 'react';
import axios from 'axios';
// import {LINK} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from './util';
import {ToastContainer} from 'react-toastify'


function Register()
{
    const[registerInfo,setregisterInfo]=useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    })

    // const [fname,setfname]=useState("");
    // const [lname,setlname]=useState("");
    // const [email,setemail]=useState("");
    // const [password,setpass]=useState("");

    const navigate=useNavigate();

    const handleChange=(e)=>{
        const {name,value}=e.target;
        const copyregisterInfo={...registerInfo};
        copyregisterInfo[name]=value;
        setregisterInfo(copyregisterInfo);
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const {fname,lname,email,password}=registerInfo;
        if(!fname || !lname || !email || !password)
            {
                return handleError("Full name, email, password are required !");
            }

        axios.post('http://localhost:3001/register',{fname,lname,email,password})
        .then(result=>{console.log(result)
            if(result.data==="pass is short")
            {
                handleError("Password atleast contain four letters !");
            }
            else if(result.data==="user already exists")
            {
                handleError("You have already registered !");
                // navigate('/register');
            }
            else
            {
                navigate('/login');
                handleSuccess("Registration Successful !");
            }
          })
        
        .catch(error=>console.log(error))
    };

    return (
        <div className='container'>
            <h1>REGISTER</h1>
            <form onSubmit={handleSubmit} >
                <input onChange={handleChange} maxLength={20} type="text" name="fname" placeholder="Enter first name" value={registerInfo.fname}/>
                <input onChange={handleChange}  type="text" name="lname" placeholder="Enter last name"  value={registerInfo.lname}/>
                <input onChange={handleChange}  type="email" name="email" placeholder="Enter E-mail ID"  value={registerInfo.email}/>
                <input onChange={handleChange}  type="password" name="password" placeholder="Enter Password" value={registerInfo.password}/>
                <button>Register</button>
                <p>Already Registered? <a href="/login">Login here</a></p>
            </form>
            <ToastContainer />
            </div>
    );
}
export default Register;