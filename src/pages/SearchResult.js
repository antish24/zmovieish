import styles from './SearchResults.module.css'
import Card from '../components/Card'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState ,useEffect, useContext} from 'react'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'
import { ModeContext } from '../components/NavBar'
import Footer from '../components/Footer'
const SearchResult=()=>{
    const[movies,setmovies]=useState([])
    const[page,setpage]=useState(1)
    const params=useParams()
    const mode=useContext(ModeContext)
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=41ee83dfa758f13481741c2dd740f286&include_adult&query=${params.id}&page=${page}`).then((res)=>setmovies(res.data.results))
    
        return()=>{
            setmovies([])
        }
    },[params.id,page])
   
    useEffect(()=>{
        setpage(1)
    },[params.id])
    return(<>
        <div className={styles.allbox}>
            <div className={styles.box} style={{backgroundColor:!mode?'rgba(0,0,0,0.8)':'rgba(255,255,255,0.7'}}>
                <div className={styles.top}><h1 style={{color:mode?'black':'white'}}>results for {params.id}</h1><button style={{backgroundColor:!mode?'black':'white',color:!mode?'white':'black',display:movies.length===0?'none':"flex"}}>Page {page}</button></div>
                <div className={styles.movie}>
                        {movies.map((mov,index)=>{return<Card key={index} {...mov}/>})}
                </div>
                <div className={styles.btns} style={{display:movies.length===0?'none':"flex"}}>
                    <button style={{backgroundColor:!mode?'black':'white',color:!mode?'white':'black'}}  onClick={()=>{return (page>1?setpage(c=>c-1):setpage(1),window.scrollTo(0,0))}}><FaArrowAltCircleLeft/></button>
                    <div className={styles.pagenum} style={{backgroundColor:!mode?'black':'white',color:!mode?'white':'black'}}>Page {page}</div>
                    <div className={styles.pagebtns}>
                    <button style={{backgroundColor:!mode?'black':'white',color:!mode?'white':'black'}}  onClick={()=>{return (setpage(1),window.scrollTo(0,0))}}>1</button>
                    <button style={{backgroundColor:!mode?'black':'white',color:!mode?'white':'black'}}  onClick={()=>{return (setpage(2),window.scrollTo(0,0))}}>2</button>
                    <button  style={{backgroundColor:!mode?'black':'white',color:!mode?'white':'black'}} onClick={()=>{return (setpage(3),window.scrollTo(0,0))}}>3</button>
                    <button style={{backgroundColor:!mode?'black':'white',color:!mode?'white':'black'}}  onClick={()=>{return (setpage(4),window.scrollTo(0,0))}}>4</button>
                    <button style={{backgroundColor:!mode?'black':'white',color:!mode?'white':'black'}}  onClick={()=>{return (setpage(5),window.scrollTo(0,0))}}>5</button>
                    </div>
                    <button style={{backgroundColor:!mode?'black':'white',color:!mode?'white':'black'}} onClick={()=>{return (setpage(c=>c+1),window.scrollTo(0,0))}}><FaArrowAltCircleRight/></button>
                </div>
            </div>
        </div><Footer/></>
    )
}
export default SearchResult