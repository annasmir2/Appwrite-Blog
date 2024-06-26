// import React from "react";
// import { useDispatch } from "react-redux";
// import authservice from "../../appwrite/auth";
// import { logout } from "../../store/authSlice";
// function Logout() {
//   const dispatch = useDispatch();
//   const btnlogout = () => {
//     authservice
//       .logout()
//       .then(() => {
//         dispatch(logout());
//       })
//       .catch(() => {
//         console.log("Error logout");
//       });
//   };
//   return (
//     <div>
//       <button
//         className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
//         onClick={btnlogout()}
//       >
//         Logout
//       </button>
//     </div>
//   );
// }

// export default Logout;
import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn