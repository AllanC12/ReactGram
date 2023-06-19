import './Profile.css'

import { uploads } from '../../utils/config'

//components
import { BsFillEyeFill,BsPencilFill, BsXLg } from 'react-icons/bs'
import Message from '../../components/Message'
import { Link } from 'react-router-dom'

//hooks
import { useState,useEffect,useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

//redux
import {getUserDetails} from "../../slices/userSlice"

const Profile = () => {

  const {id} = useParams()
  const {user,loading} = useSelector(state => state.user)
  const {user: authUser} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getUserDetails(id))
  },[dispatch,id])

  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div id="profile">
      <div className="profile-header">
         {user.profileImage && (
           <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
         )}
         <div className="profile-description">
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
         </div>
      </div>
     </div>
  )
}
 
export default Profile