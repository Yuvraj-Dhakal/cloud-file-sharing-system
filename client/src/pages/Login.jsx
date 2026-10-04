import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { FaEye, FaEyeSlash, FaCloud } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../config/api";
import "../styles/Login.css";

function Login() {
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [showPassword,setShowPassword]=useState(false);
const [loading,setLoading]=useState(false);
const [errors,setErrors]=useState({});
const [serverError,setServerError]=useState("");
const navigate=useNavigate();

const validateForm=()=>{
const newErrors={};
const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!email.trim()){
newErrors.email="Email address is required.";
}else if(!emailRegex.test(email.trim())){
newErrors.email="Enter a valid email address.";
}

if(!password){
newErrors.password="Password is required.";
}else if(password.length<8){
newErrors.password="Password must be at least 8 characters.";
}

setErrors(newErrors);
return Object.keys(newErrors).length===0;
};

const handleLogin=async(e)=>{
e.preventDefault();
setServerError("");

if(!validateForm()){
return;
}

setLoading(true);

try{
const res=await api.post("/api/auth/login",{
email:email.trim().toLowerCase(),
password
});

localStorage.setItem("token",res.data.token);

if(res.data.user){
localStorage.setItem("user",JSON.stringify(res.data.user));
}

toast.success("Login successful!");
navigate("/dashboard");
}catch(err){
setServerError(
err.response?.data?.message||
"Invalid email or password."
);
}finally{
setLoading(false);
}
};

const handleGoogleSuccess=async(credentialResponse)=>{
setServerError("");

try{
const res=await api.post("/api/auth/google",{
credential:credentialResponse.credential
});

localStorage.setItem("token",res.data.token);

if(res.data.user){
localStorage.setItem("user",JSON.stringify(res.data.user));
}

toast.success("Google Login Successful!");
navigate("/dashboard");
}catch(err){
console.error(err);
setServerError("Unable to sign in with Google. Please try again.");
}
};

return(
<div className="login-page">
<div className="login-decoration login-decoration-one"></div>
<div className="login-decoration login-decoration-two"></div>
<div className="login-card">

<div className="login-brand">
<div className="login-logo">
<FaCloud/>
</div>
<div>
<h2>YuvNext</h2>
<span>Cloud Storage</span>
</div>
</div>

<div className="login-heading">
<h3>Welcome Back</h3>
<p>Sign in to access your files securely.</p>
</div>

{serverError&&(
<div className="login-alert">
{serverError}
</div>
)}

<form onSubmit={handleLogin} noValidate>

<div className="login-form-group">
<label className="login-label">Email Address</label>
<input
type="email"
className={`login-input ${errors.email?"login-input-error":""}`}
placeholder="Enter your email"
value={email}
onChange={(e)=>{
setEmail(e.target.value);
if(errors.email){
setErrors({...errors,email:""});
}
}}
autoComplete="email"
/>
{errors.email&&(
<div className="login-field-error">{errors.email}</div>
)}
</div>

<div className="login-form-group">
<div className="login-label-row">
<label className="login-label">Password</label>
</div>

<div className="login-password-wrapper">
<input
type={showPassword?"text":"password"}
className={`login-input ${errors.password?"login-input-error":""}`}
placeholder="Enter your password"
value={password}
onChange={(e)=>{
setPassword(e.target.value);
if(errors.password){
setErrors({...errors,password:""});
}
}}
autoComplete="current-password"
/>

<button
type="button"
className="login-password-toggle"
onClick={()=>setShowPassword(!showPassword)}
aria-label={showPassword?"Hide password":"Show password"}
>
{showPassword?<FaEyeSlash/>:<FaEye/>}
</button>
</div>

{errors.password&&(
<div className="login-field-error">{errors.password}</div>
)}
</div>

<button
type="submit"
className="login-submit"
disabled={loading}
>
{loading?(
<>
<span className="spinner-border spinner-border-sm me-2"></span>
Signing In...
</>
):(
<>
Sign In
<span className="login-arrow">→</span>
</>
)}
</button>

</form>

<div className="login-divider">
<span>OR CONTINUE WITH</span>
</div>

<div className="google-login-wrapper">
<GoogleLogin
onSuccess={handleGoogleSuccess}
onError={()=>setServerError("Google login failed.")}
theme="outline"
size="large"
shape="pill"
width="340"
/>
</div>

<div className="login-register">
<span>Don't have an account?</span>
<Link to="/register">Create an account</Link>
</div>

<div className="login-security">
<span>🔒</span>
Your files are protected with secure authentication
</div>

</div>
</div>
);
}

export default Login;