import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'
import axios from 'axios'
import ReactPlayer from 'react-player'
import styles from './Zmovie.module.css'
import { FaCalendar,FaStar } from 'react-icons/fa'
import { ModeContext } from '../components/NavBar'
import Footer from '../components/Footer'
const Zmovie=()=>{
const params=useParams()
const [err,seterr]=useState()
const mode=useContext(ModeContext)
const [movie,setmovie]=useState([])
const [video,setvideo]=useState([])
const [Recommend,setRecommend]=useState([])
const movieposter=(poster_path)=>{
    return `https://www.themoviedb.org/t/p/original${poster_path}`
}
useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=41ee83dfa758f13481741c2dd740f286&language=en-US`)
    .then((res)=>setmovie(res.data))

 axios.get(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=41ee83dfa758f13481741c2dd740f286`)
 .then((res)=>setvideo(res.data.results))

axios.get(`https://api.themoviedb.org/3/movie/${params.id}/recommendations?api_key=41ee83dfa758f13481741c2dd740f286`)
.then((res)=>setRecommend(res.data.results))
return()=>{
    setRecommend([])
    setvideo([])
    setmovie([])
}
},[params.id])

let vid=video.map(k=>k.key)
let trailer=vid[0]
    return(<>
        <div className={styles.box} style={{backgroundColor:!mode?'rgba(0,0,0,0.8)':'rgba(255,255,255,0.7'}}>
            <div className={styles.title}>
                <h3 style={{color:mode?'black':'white'}}>{movie.original_title}</h3>
            </div>
            <div className={styles.videobox}>
            <div className={styles.video}>
             <div style={{overflow:'hidden'}}><ReactPlayer
             url={`https://www.youtube.com/watch?v=${trailer}`}
             playing={true}
             onPlay={()=>seterr('')}
             onError={()=>seterr("Can't play the video")}
             width='100%'
             height='100%'
             /><div className={styles.error}><span>{err}</span></div>
             </div>
            </div>
            </div>
            <div className={styles.info}>
                <div className={styles.poster}><img src={movieposter(movie.poster_path)} alt={movie.original_title}/></div>
                <div className={styles.detail}>
                    <div className={styles.detailbox}>
                    <div className={styles.detailtop}>
                    <div style={{display:'flex',alignItems:'center',color:mode?'black':'white'}}><p style={{color:mode?'black':'white'}}>{movie.runtime}</p> min</div>
                    <div style={{display:'flex',alignItems:'center'}}><FaStar style={{color:mode?'black':'white'}}/><p style={{color:mode?'black':'white'}}>{movie.vote_average}</p></div>
                    <div style={{display:'flex',alignItems:'center'}}><FaCalendar style={{color:mode?'black':'white'}}/><p style={{color:mode?'black':'white'}}>{movie.release_date}</p></div>
                    </div>
                    <p className={styles.tagline} style={{color:mode?'black':'white'}}>{movie.tagline}</p>
                    <p className={styles.tagline} style={{color:mode?'black':'white'}}>{movie.overview}</p>
                </div>
                </div>
            </div>
            <div className={styles.recommend}>
                <h1 style={{color:mode?'black':'white'}}>Recommendation</h1>
            <div className={styles.cardbox}>
                {Recommend.map((mov,ind)=>{return <Card key={ind} {...mov}/>})}
            </div>
            </div>
        </div>
        <Footer/></>
    )
}
export default Zmovie