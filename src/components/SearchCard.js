import React, { useContext } from 'react'
import { ModeContext } from './NavBar'
import { FaStar } from 'react-icons/fa'
import styles from './SearchCard.module.css'
import {Link} from 'react-router-dom'
const SearchCard = ({id,poster_path,original_title,release_date,vote_average,first_air_date,original_name}) => {
  const moviePic=(poster_path)=>{
    return `https://www.themoviedb.org/t/p/original${poster_path}`
  }
  const mode=useContext(ModeContext)
  return (
    <Link onClick={()=>{return (window.scrollTo(0,0))}} to={`/zmovie/${id}`}>
    <div className={styles.box} style={{boxShadow:'white 1px 2px 8px'}}>
        <div className={styles.img}>
        <img src={moviePic(poster_path)} alt={original_name||original_title}/>
        </div>
        <div className={styles.movieinfo}>
            <div className={styles.title}><p style={{color:!mode?'rgb(162, 162, 162)':'rgb(0, 0, 0)'}}>{original_title}{original_name}</p></div>
            <div className={styles.detail}>
                <div className={styles.date}><p style={{color:!mode?'rgb(162, 162, 162)':'rgb(0, 0, 0)'}}>{release_date}{first_air_date}</p></div>
                <div className={styles.rate}><p style={{color:!mode?'rgb(162, 162, 162)':'rgb(0, 0, 0)',marginRight:'10px'}}><FaStar/>{vote_average}</p></div>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default SearchCard