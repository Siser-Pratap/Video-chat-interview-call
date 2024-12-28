import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/slices/userSlice'
import axios from 'axios'

const Logout = () => {

    const handleLogout = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.get("/api/users/logout");
            console.log(res);
            if(res.data.message){
                alert(res.data.message);
            }
        } catch (error) {
            console.log("Failed to log out", error.message);
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
