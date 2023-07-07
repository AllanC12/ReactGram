import './Search.css'

import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

import LikeContainer from '../../components/LikeContainer'
import PhotoItem from '../../components/PhotoItem'
import { Link } from 'react-router-dom'
import { useQuery } from '../../hooks/useQuery'
import { searchPhotos,like } from '../../slices/photoSlice'

const Search = () => {
    const query = useQuery()
    const search = query.get("q")
    const dispatch = useDispatch()
    const resetMessage = useResetComponentMessage(dispatch)

  return (
    <div>Search</div>
  )
}

export default Search