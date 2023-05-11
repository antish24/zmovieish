import { useContext } from 'react'
import styles from './Card.module.css'
import { ModeContext } from './NavBar'
import {Link}from 'react-router-dom'
import { FaPlay } from 'react-icons/fa'
const CardS=({id,poster_path,original_title,release_date,first_air_date,original_name,media_type,vote_average})=>{
    const moviepic=(poster_path)=>{
        return `https://www.themoviedb.org/t/p/original${poster_path}`
    }
    const mode =useContext(ModeContext)
    
    return(
        <div className={styles.box}>
            <div className={styles.playbox}>
                <Link onClick={()=>{return (window.scrollTo(0,0))}} to={`/zmovieS/${id}`}  className={styles.play}>
                    <div className={styles.playicon}><FaPlay style={{color:mode?'white':'black'}}/>
                    </div>
                </Link>
           </div>
            <div className={styles.poster}>
                <img src={moviepic(poster_path)} alt={original_name||original_title}/>
            <span style={{background:!mode? 'rgba(0, 0, 0, 0.863)':'rgba(255, 255, 255, 0.823)',color:!mode?'white':'black'}} className={styles.date}>{first_air_date}{release_date}</span>
            <div className={styles.movieinfo} style={{background:!mode? 'rgba(0, 0, 0, 0.863)':'rgba(255, 255, 255, 0.823)',color:!mode?'white':'black'}}>
                <p style={{fontSize:'12px',fontWeight:'bolder',width:'120px'}}>{original_name}{original_title}</p>
                <p style={{borderColor:mode? 'rgba(0, 0, 0, 0.863)':'rgba(255, 255, 255, 0.823)'}}>{media_type}{`*${vote_average}`}</p>
            </div>
            </div>
        </div>
    )
}
export default CardS