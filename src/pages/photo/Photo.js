import "./Photo.css"

import { uploads } from "../../utils/config"

import Message from "../../components/Message"
import { Link } from "react-router-dom"
import PhotoItem from "../../components/PhotoItem"

import { useEffect,useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import { getPhoto } from "../../slices/photoSlice"

const Photo = () => {

  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  const {id} = useParams()
  const {photo,loading,error,message} = useSelector(state => state.photo)


  useEffect(()=>{
    dispatch(getPhoto(id))
  },[dispatch,id])

  if(loading){
    return <p>Carregando...</p>
  }
  return (
    <div>
        <PhotoItem photo={photo}/>
    </div>
  )
}

export default Photo