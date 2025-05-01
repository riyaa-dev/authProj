import { useState} from "react";
import axios from "axios";

function Login()
{
   const[form, setForm]=useState({
    email:"",
    password:""
   });
   const[message,setMessage]=useState("");
   const[user,setUser]=useState(null);
   const handlehChange =(e) =>{
    setForm({...form, [e.target.name]: e.target.value});

   };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post("http://localhost:5000/api/login",form);
            
            setMessage("login successfully");
            setUser(res.data.user);
            console.log("token:",res.data.token);

        }catch(err){
            setMessage(err.response?.data?.message ||"login failed");
        }

    };
     return(
        <div style={{maxWidth:400,margin:"auto" }}>
            
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type=" email" name="email" placeholder="email" onChange={handlehChange} required /><br/>
                <input type=" password" name="password" placeholder="password" onChange={handlehChange} required /><br/>
             <button type="Submit">Login</button>

            </form>
            <p>{message}</p>
            { user &&(
                <div style={{marginTop:"1rem"}}>
                    <h4>WELCOME ,{user.username}!</h4>
                    <p>{user.email}</p>
          
        </div>
          )}
        </div>
     );
}
    

export default Login;