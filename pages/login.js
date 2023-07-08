import axios from "axios";
import {useState} from "react";
import {useRouter} from "next/router";
 const Login = ()=>{
     const [login,setLogin] = useState(null);
     const [password,setPassword] = useState(null);
     const router = useRouter();

     const onSignIn =async (evt)=>{
         evt.preventDefault();
         await axios.post("https://ya-praktikum.tech/api/v2/auth/signin",{login,password},{ withCredentials: true })
         router.push("/chats");

     }
     return <form onSubmit={onSignIn}>
         <input type="text" placeholder="login" onChange={(evt)=>setLogin(evt.target.value)}/>
         <input type="password" placeholder="password" onChange={(evt)=>setPassword(evt.target.value)}/>
         <button>Sign in</button>
     </form>
 }
 export default Login;