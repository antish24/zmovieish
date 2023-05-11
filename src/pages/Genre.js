import React, { useContext, useEffect, useState } from 'react'
import styles from './Genre.module.css'
import axios from 'axios'
import Card from '../components/Card'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'
import { ModeContext } from '../components/NavBar'
import Footer from '../components/Footer'
const Genre = () => {
  const[genre,setgenre]=useState([])
  const[genrename,setgenrename]=useState([])
  const[genreid,setgenreid]=useState(28)
  const[page,setpage]=useState(1)
  const[click,setclick]=useState(28)
  const[name,setname]=useState('Action')
  const handlegenre=(list)=>{
    setgenreid(list.id)
    setname(list.name)
    setclick(list.id)
  }
  const mode=useContext(ModeContext)
  useEffect(()=>{
    setpage(1)
  },[genreid])
  useEffect(()=>{
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=41ee83dfa758f13481741c2dd740f286&language=en-US').then((res)=>setgenrename(res.data.genres))
  })
  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=41ee83dfa758f13481741c2dd740f286&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genreid}`).then((res)=>setgenre(res.data.results))
    return()=>{
      setgenre([])
  }
  },[genreid,page])
  return (
    <>
    <div className={styles.box} style={{backgroundColor:!mode?'rgba(0,0,0,0.8)':'rgba(255,255,255,0.7'}}>
      <div className={styles.genrebox}>
        <div className={styles.genre}>
          {genrename.map((list)=>{return <button className={click===list.id?styles.activebtn:styles.none} onClick={()=>handlegenre(list)} key={list.id}>{list.name}</button>})}
        </div>
      </div>
      <div className={styles.moviecont}>
      <div className={styles.movie}>
        <div className={styles.top}><h2 style={{color:mode?'black':'white'}}>{name} Movies</h2><button style={{backgroundColor:!mode?'black':'white',color:!mode?'white':'black',boxShadow:mode?'3px 3px 7px black':'3px 3px 8px white'}}>Page {page}</button></div>
        <div className={styles.cardbox}>
            {genre.map((mov,ind)=>{return<Card key={ind} {...mov}/>})}
        </div>
      </div>
      </div>
      <div className={styles.btns}>
                    <button style={{backgroundColor:!mode?'black':'white',color:!mode?'white':'black',boxShadow:mode?'3px 3px 7px black':'3px 3px 8px white'}}  onClick={()=>{return (page>1?setpage(c=>c-1):setpage(1),window.scrollTo(0,0))}}><FaArrowAltCircleLeft/></button>
                    <div className={styles.pagenum} style={{backgroundColor:!mode?'black':'white',color:!mode?'white':'black'}}>Page {page}</div>
                    <div className={styles.pagebtns}>
                    <button style={{backgroundColor:!mode?'black':'white',color:!mode?'white':'black',boxShadow:mode?'3px 3px 7px black':'3px 3px 8px white'}}  onClick={()=>{return (setpage(1),window.scrollTo(0,0))}}>1</button>
                    <button style={{backgroundColor:!mode?'black':'white',color:!mode?'white':'black',boxShadow:mode?'3px 3px 7px black':'3px 3px 8px white'}}  onClick={()=>{return (setpage(2),window.scrollTo(0,0))}}>2</button>
                    <button  style={{backgroundColor:!mode?'black':'white',color:!mode?'white':'black',boxShadow:mode?'3px 3px 7px black':'3px 3px 8px white'}} onClick={()=>{return (setpage(3),window.scrollTo(0,0))}}>3</button>
                    <button style={{backgroundColor:!mode?'black':'white',color:!mode?'white':'black',boxShadow:mode?'3px 3px 7px black':'3px 3px 8px white'}}  onClick={()=>{return (setpage(4),window.scrollTo(0,0))}}>4</button>
                    <button style={{backgroundColor:!mode?'black':'white',color:!mode?'white':'black',boxShadow:mode?'3px 3px 7px black':'3px 3px 8px white'}}  onClick={()=>{return (setpage(5),window.scrollTo(0,0))}}>5</button>
                    </div>
                    <button style={{backgroundColor:!mode?'black':'white',color:!mode?'white':'black',boxShadow:mode?'3px 3px 7px black':'3px 3px 8px white'}} onClick={()=>{return (setpage(c=>c+1),window.scrollTo(0,0))}}><FaArrowAltCircleRight/></button>
                </div>
    </div>
    <Footer/>
    </>
  )
}

export default Genre