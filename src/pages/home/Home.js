import "./Home.css"

import LikeContainer from '../../components/LikeContainer'
import PhotoItem from '../../components/PhotoItem'
import { Link } from "react-router-dom"

import { useEffect } from "react"
import {useSelector,useDispatch} from 'react-redux'
import {useResetComponentMessage} from '../../hooks/useResetComponentMessage'

import { getAllPhotos,like } from "../../slices/photoSlice"

const Home = () => {

  const dispatch = useDispatch()
  const resetMessage = useResetComponentMessage()
  const {user} = useSelector(state => state.auth)
  const {loading,error} = useSelector(state => state.photo)

  useEffect(()=> {
    dispatch(getAllPhotos())
   },[dispatch])

  const handleLike = (photo) => {
    dispatch(like(photo._id))
    resetMessage()
  }

  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div>Home</div>
  )
}

export default Home