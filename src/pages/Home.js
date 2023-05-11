import axios from 'axios'
import React,{useContext, useEffect,useState} from 'react'
import Card from '../components/Card'
import CardS from '../components/CardS'
import Footer from '../components/Footer'
import { ModeContext } from '../components/NavBar'
import styles from './Home.module.css'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const Home = () => {
  const mode=useContext(ModeContext)
  const [upcoming,setupcoming]=useState([])
  const [recent,setrecent]=useState([])
  const [trending,settrending]=useState([])
  const movieposter=(poster_path)=>{
    return `https://www.themoviedb.org/t/p/original${poster_path}`
}
  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=41ee83dfa758f13481741c2dd740f286&page=1`)
    .then((res)=>settrending(res.data.results))

    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=41ee83dfa758f13481741c2dd740f286&page=1`)
    .then((res)=>setupcoming(res.data.results))

    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=41ee83dfa758f13481741c2dd740f286&page=1`)
    .then((res)=>setrecent(res.data.results))
},[])
  return (<>
    <div className={styles.box} style={{backgroundColor:!mode?'rgba(0,0,0,0.8)':'rgba(255,255,255,0.7'}}>
      <div className={styles.picbox}>
          <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {upcoming.map((list,ind)=>{return (
        <SwiperSlide>
          <img key={ind} src={movieposter(list.poster_path)} alt={list.original_title} />
          </SwiperSlide>
        )})}
        </Swiper>
      </div>
      <div className={styles.trending}>
        <h1 style={{color:mode?'black':'white',marginLeft:'20px'}}>Top Rated show</h1>
        <div className={styles.tmovie}>
          <div className={styles.card}>
          {trending.map((mov,ind)=>{return <CardS key={ind} {...mov}/>})}
          </div>
        </div>
      </div>
      <div className={styles.recent}>
        <h1 style={{color:mode?'black':'white',marginLeft:'20px'}}>recent</h1>
        <div className={styles.rmovie}>
        <div className={styles.card}>
        {recent.map((mov,ind)=>{return <Card key={ind} {...mov}/>})}
        </div>
        </div>
      </div>
      <div className={styles.recent}>
        <h1 style={{color:mode?'black':'white',marginLeft:'20px'}}>Upcoming</h1>
        <div className={styles.rmovie}>
        <div className={styles.card}>
        {upcoming.map((mov,ind)=>{return <Card key={ind} {...mov}/>})}
        </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Home