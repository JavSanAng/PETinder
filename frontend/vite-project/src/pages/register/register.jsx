// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { makeRequest } from "../../context/axios";

// const Register = () => {
//   const [userName, setUserName] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState(null)
//   const navigate = useNavigate()

//   const handleSubmit = async e => {
//     e.preventDefault()
//     try {
//       const response = await makeRequest.post('/auth/register', {
//         user_name: userName,
//         password: password
//       })

//       console.log('Registration successful:', response.data)
//       navigate('/login')
//     } catch (err) {
//       setError('Registration failed. Please try again.')
//       console.error('Registration error:', err)
//     }
//   }

//   return (
//     <div className='register'>
//       <div className='card'>
//         <div className='left'>
//           <h1>Lama Social.</h1>
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
//             alias totam numquam ipsa exercitationem dignissimos, error nam,
//             consequatur.
//           </p>
//           <span>Do you have an account?</span>
//           <Link to='/login'>
//             <button>Login</button>
//           </Link>
//         </div>
//         <div className='right'>
//           <h1>Register</h1>
//           <form onSubmit={handleSubmit}>
//             <label htmlFor='userName'>Username:</label>
//             <input
//               type='text'
//               id='userName'
//               value={userName}
//               onChange={e => setUserName(e.target.value)}
//               required
//             />
//             <label htmlFor='password'>Password:</label>
//             <input
//               type='password'
//               id='password'
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//               required
//             />
//             {error && <p className='error'>{error}</p>}
//             <button type="submit">Register</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Register
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../context/axios";
import "./register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await makeRequest.post("/auth/register", {
        user_name: userName,
        password: password,
      });

      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="userName">Username:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;














