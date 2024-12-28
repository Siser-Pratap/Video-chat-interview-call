import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/slices/userSlice'

const Logout = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        try {
            dispatch(logout());
            console.log("Logged out successfully");
            alert("Logged out successfully");
        } catch (error) {
            console.log("Error occurred while logging out", error.message);
        }
    }   

return (
    <div className='flex justify-center items-center'>
        <div className='flex justify-center items-center'>
            <button onClick={handleLogout} className='p-5 h-5 w-5 rounded-xl'>Logout</button>
        </div>
    </div>
  )
}

export default Logout
