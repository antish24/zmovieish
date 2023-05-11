import { useContext, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { AiOutlineClear } from 'react-icons/ai'
import styles from './Search.module.css'
import SearchCard from './SearchCard'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import { ModeContext } from './NavBar'
const Search =()=>{
    const [moviename,setmoviename]=useState('')
    const [movies,setmovies]=useState([])
    const [open,setopen]=useState(false)
    const sleep=ms=>new Promise(
        resolve=>setTimeout(resolve,ms)
    )
    useEffect(()=>{
        sleep(1000).then(()=>{return(setopen(false),setmoviename(''))})
    },[open])

    useEffect(()=>{
        Axios.get(`https://api.themoviedb.org/3/search/movie?api_key=41ee83dfa758f13481741c2dd740f286&include_adult=false&query=${moviename}`)
        .then((res)=>setmovies(res.data.results))
        return()=>{
            setmovies([])
        }
    },[moviename])
    
    const mode =useContext(ModeContext)
    return(
        <>
        <div className={styles.box} onBlur={()=>setopen(true)}>
            <div className={styles.searchicon}>
                <Link to={moviename===''?'*':`/SearchResult/${moviename}`} ><FaSearch onClick={()=>setmoviename('')}/></Link>
            </div>
            <div className={styles.cleanicon}>
                <AiOutlineClear className={styles.clean} onClick={()=>setmoviename('')}/>
            </div>
            <input 
            type='text' 
            placeholder='Search..'
            value={moviename} 
            onChange={(e)=>setmoviename(e.target.value)}/>
        </div>
        <div onClick={()=>setmoviename('')}  className={styles.results} style={{display:moviename===''?'none':'block',background:mode?'rgb(162, 162, 162)':'rgb(0, 0, 0)'}}>
        {movies.map((movie,index)=>{return <SearchCard key={index} {...movie}/>})}
        </div>
        <div className={styles.load} ><button style={{display:moviename===''?'none':'block',background:mode?'rgb(162, 162, 162)':'rgb(0, 0, 0)'}}>
            <Link to={`/SearchResult/${moviename}`} onClick={()=>setmoviename('')} style={{color:!mode?'rgb(162, 162, 162)':'rgb(0, 0, 0)'}}>View all Results</Link>
            </button></div>
       </>
    )
}
export default Search