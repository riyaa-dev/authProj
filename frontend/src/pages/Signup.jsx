import { useState } from "react";
import axios from "axios";
 function Signup(){ 
    const[form,setForm] = useState({
        username:"",
        email:"",
        password:"",
    });
    const [message,setMessage] = useState("");
    const handlechange =(e)=>{
        setForm({...form,[e.target.name]:e.target.value});

    };
    const handleSubmit = async(e)=> {
        e.preventDefault();
        const{username,email,password}=form;
        //console.log("form:",form)
        try{
            await axios.post("http://localhost:5000/api/signup", {username,email,password});
            
            setMessage('signup successfully!');
            console.log("token:",res.data.token);
        }catch(err){
            setMessage(err.response?.data?.message||"Something went wrong");
        }
    };
    return(
        <div style ={{maxWidth:400,margin: "auto"}}>
            <h2>signup</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handlechange} required/><br/>
                <input type="text" name="email" placeholder="Email" onChange={handlechange} required/><br/>
                <input type="password" name="password" placeholder="Password" onChange={handlechange} required/><br/>
                <button type="submit">Signup</button>
            </form>
            <p>{message}</p>

            
        </div>
    );
}
export default Signup;
