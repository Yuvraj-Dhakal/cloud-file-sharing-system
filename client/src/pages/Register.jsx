import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaCloud, FaShieldAlt } from "react-icons/fa";
import api from "../config/api";
import "../styles/Register.css";

function Register() {
const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [phone,setPhone]=useState("");
const [password,setPassword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");
const [showPassword,setShowPassword]=useState(false);
const [showConfirmPassword,setShowConfirmPassword]=useState(false);
const [loading,setLoading]=useState(false);
const [errors,setErrors]=useState({});
const [serverError,setServerError]=useState("");
const navigate=useNavigate();

const validateForm=()=>{
const newErrors={};
const nameRegex=/^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex=/^(97|98)\d{8}$/;

if(!name.trim()){
newErrors.name="Full name is required.";
}else if(!nameRegex.test(name.trim())){
newErrors.name="Enter a valid name using letters only.";
}

if(!email.trim()){
newErrors.email="Email address is required.";
}else if(!emailRegex.test(email.trim())){
newErrors.email="Enter a valid email address.";
}

if(!phone){
newErrors.phone="Phone number is required.";
}else if(!phoneRegex.test(phone)){
newErrors.phone="Enter a valid 10-digit Nepal mobile number.";
}

if(!password){
newErrors.password="Password is required.";
}else if(password.length<8){
newErrors.password="Password must be at least 8 characters.";
}else if(/^[0-9]+$/.test(password)){
newErrors.password="Password cannot contain numbers only.";
}else if(/^[A-Za-z]+$/.test(password)){
newErrors.password="Password should contain numbers or symbols.";
}

if(!confirmPassword){
newErrors.confirmPassword="Please confirm your password.";
}else if(password!==confirmPassword){
newErrors.confirmPassword="Passwords do not match.";
}

setErrors(newErrors);
return Object.keys(newErrors).length===0;
};

const getPasswordStrength=()=>{
if(!password)return null;

const hasUppercase=/[A-Z]/.test(password);
const hasLowercase=/[a-z]/.test(password);
const hasNumber=/[0-9]/.test(password);
const hasSpecial=/[^A-Za-z0-9]/.test(password);

if(password.length<8||/^[0-9]+$/.test(password)||/^[A-Za-z]+$/.test(password)){
return "Weak password";
}

if(hasUppercase&&hasLowercase&&hasNumber&&hasSpecial&&password.length>=10){
return "Strong password";
}

return "Medium password";
};

const passwordStrength=getPasswordStrength();

const getStrengthClass=()=>{
if(passwordStrength==="Strong password")return "strong";
if(passwordStrength==="Medium password")return "medium";
return "weak";
};

const handleRegister=async(e)=>{
e.preventDefault();
setServerError("");

if(!validateForm()){
return;
}

setLoading(true);

try{
await api.post("/api/auth/register",{
name:name.trim(),
email:email.trim().toLowerCase(),
phone,
password
});

toast.success("Account created successfully!");
navigate("/login");
}catch(err){
setServerError(
err.response?.data?.message||
"Registration failed. Please try again."
);
}finally{
setLoading(false);
}
};

const handlePhoneChange=(e)=>{
const value=e.target.value.replace(/\D/g,"").slice(0,10);
setPhone(value);

if(errors.phone){
setErrors({...errors,phone:""});
}
};

return(
<div className="register-page">
<div className="register-decoration register-decoration-one"></div>
<div className="register-decoration register-decoration-two"></div>
<div className="register-decoration register-decoration-three"></div>

<div className="register-card">

<div className="register-brand">
<div className="register-logo">
<FaCloud/>
</div>

<div>
<h2>YuvNext</h2>
<span>Cloud Storage</span>
</div>
</div>

<div className="register-heading">
<h3>Create Your Account</h3>
<p>Start storing and sharing your files securely.</p>
</div>

{serverError&&(
<div className="register-alert">
{serverError}
</div>
)}

<form onSubmit={handleRegister} noValidate>

<div className="register-form-group">
<label className="register-label">
Full Name
</label>

<input
type="text"
className={`register-input ${errors.name?"register-input-error":""}`}
placeholder="Enter your full name"
value={name}
onChange={(e)=>{
setName(e.target.value);
if(errors.name){
setErrors({...errors,name:""});
}
}}
autoComplete="name"
/>

{errors.name&&(
<div className="register-field-error">
{errors.name}
</div>
)}
</div>

<div className="register-form-group">
<label className="register-label">
Email Address
</label>

<input
type="email"
className={`register-input ${errors.email?"register-input-error":""}`}
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
<div className="register-field-error">
{errors.email}
</div>
)}
</div>

<div className="register-form-group">
<label className="register-label">
Phone Number
</label>

<div className={`register-phone-wrapper ${errors.phone?"register-phone-error":""}`}>
<span className="register-phone-prefix">
+977
</span>

<input
type="tel"
className="register-input register-phone-input"
placeholder="98XXXXXXXX"
value={phone}
onChange={handlePhoneChange}
maxLength={10}
inputMode="numeric"
autoComplete="tel"
/>
</div>

{errors.phone&&(
<div className="register-field-error">
{errors.phone}
</div>
)}
</div>

<div className="register-form-group">
<label className="register-label">
Password
</label>

<div className="register-password-wrapper">
<input
type={showPassword?"text":"password"}
className={`register-input ${errors.password?"register-input-error":""}`}
placeholder="Create a password"
value={password}
onChange={(e)=>{
setPassword(e.target.value);
if(errors.password){
setErrors({...errors,password:""});
}
}}
autoComplete="new-password"
/>

<button
type="button"
className="register-password-toggle"
onClick={()=>setShowPassword(!showPassword)}
aria-label={showPassword?"Hide password":"Show password"}
>
{showPassword?<FaEyeSlash/>:<FaEye/>}
</button>
</div>

{passwordStrength&&(
<div className="password-strength-box">
<div className="password-strength-top">
<span>Password strength</span>

<strong className={getStrengthClass()}>
{passwordStrength}
</strong>
</div>

<div className="strength-bars">
<span className="active"></span>

<span
className={
passwordStrength==="Medium password"||
passwordStrength==="Strong password"
?"active":""
}
></span>

<span
className={
passwordStrength==="Strong password"
?"active":""
}
></span>
</div>
</div>
)}

{errors.password&&(
<div className="register-field-error">
{errors.password}
</div>
)}
</div>

<div className="register-form-group register-confirm-group">
<label className="register-label">
Confirm Password
</label>

<div className="register-password-wrapper">
<input
type={showConfirmPassword?"text":"password"}
className={`register-input ${errors.confirmPassword?"register-input-error":""}`}
placeholder="Confirm your password"
value={confirmPassword}
onChange={(e)=>{
setConfirmPassword(e.target.value);
if(errors.confirmPassword){
setErrors({...errors,confirmPassword:""});
}
}}
autoComplete="new-password"
/>

<button
type="button"
className="register-password-toggle"
onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
aria-label={showConfirmPassword?"Hide password":"Show password"}
>
{showConfirmPassword?<FaEyeSlash/>:<FaEye/>}
</button>
</div>

{errors.confirmPassword&&(
<div className="register-field-error">
{errors.confirmPassword}
</div>
)}

{confirmPassword&&
password===confirmPassword&&
!errors.confirmPassword&&(
<div className="password-match">
✓ Passwords match
</div>
)}
</div>

<button
type="submit"
className="register-submit"
disabled={loading}
>
{loading?(
<>
<span className="spinner-border spinner-border-sm"></span>
Creating Account...
</>
):(
<>
Create Account
<span className="register-arrow">→</span>
</>
)}
</button>

</form>

<div className="register-divider">
<span>SECURE & SIMPLE</span>
</div>

<div className="register-security">
<div className="security-icon">
<FaShieldAlt/>
</div>

<div>
<strong>Your data stays protected</strong>
<span>Secure authentication keeps your account safe.</span>
</div>
</div>

<div className="register-login">
<span>Already have an account?</span>
<Link to="/login">
Sign in
</Link>
</div>

</div>
</div>
);
}

export default Register;