import styles from './NavBar.module.css'
import React from 'react'
import navlogopic from '../assets/logo.png'
import {Link,NavLink,Route,Routes} from 'react-router-dom'
import Home from '../pages/Home'
import LandingPage from '../pages/LandingPage'
import './active.css'
import Series from '../pages/Series'
import Movie from '../pages/Movie'
import TopIdbm from '../pages/TopIdbm'
import Genre from '../pages/Genre'
import GenreS from '../pages/GenreS'
import {  FaHome,FaMoon,FaPlus,FaSun, FaTimes} from 'react-icons/fa'
import {FiChevronLeft} from 'react-icons/fi'
import { GiHamburgerMenu, GiRank3 } from 'react-icons/gi'
import { MdAccountBox, MdFlag, MdLocalMovies, MdMovie } from 'react-icons/md'
import { useEffect, useState } from 'react'
import Search from './Search'
import SearchResult from '../pages/SearchResult'
import PageNotFound from '../pages/PageNotFound'
import Zmovie from '../pages/Zmovie'
import ZmovieS from '../pages/ZmovieS'
export const ModeContext=React.createContext()
const NavBar=()=>{
    const [show,setshow]=useState(false)
    const [click,setclick]=useState(false)
    const [mode,setmode]=useState(false)
    const [open,setopen]=useState(false)
    const sleep=ms=>new Promise(
        resolve=>setTimeout(resolve,ms)
    )
    useEffect(()=>{
        sleep(8000).then(()=>{setopen(false)})
    },[open])
    useEffect(()=>{
        setshow(false)
    },[click])
    return(
        <ModeContext.Provider value={mode}>
        <div className={styles.navbox} style={{background:mode?'white':'black',boxShadow:mode?'3px 3px 7px black':'3px 3px 8px rgb(0, 115, 255)'}}>
            <div className={styles.navtop}>
            <div className={styles.menu}>
                <GiHamburgerMenu style={{color:mode?'black':'white',display:!show?'block':'none'}} size={30} onClick={()=>setshow(!show)}/>
            </div>
            <div className={styles.navlogo}>
                <Link to='/Landing' onClick={()=>setclick(!click)}><img src={navlogopic} alt='Zmovies'/></Link>
                </div>
            </div>
            <div className={styles.navlinks}>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/Genre'>Genre</NavLink>
                <NavLink to='/Movie'>Movies</NavLink>
                <NavLink to='/GenreSeries'>Genre-S</NavLink>
                <NavLink to='/Series'>Series</NavLink>
                <NavLink to='/TopIdbm'>TopIdbm</NavLink>
            </div>
            <div className={styles.navsearch}><Search/></div>
            <div className={styles.navaccount}>
            <MdAccountBox style={{color:mode?'black':'white'}} size={30}/><Link to='/Landing' onClick={()=>setclick(!click)} style={{color:mode?'black':'white'}}>Login/register</Link>
            </div>
        </div>
        <div className={styles.pagemode} style={{backgroundColor:mode?"white":'black',right:open?'10px':'-45px'}} onMouseEnter={()=>setopen(true)}>
            <FiChevronLeft size={25} style={{color:mode?'rgb(0, 115, 255)':'orange'}}/>
            <FaSun size={25} onClick={()=>setmode(true)} style={{display:mode?'none':'block',color:'orange',float:'right'}}/>
            <FaMoon size={25} onClick={()=>setmode(false)} style={{display:mode?'block':'none',color:'rgb(0, 115, 255)',float:'right'}}/>
        </div>
        <Routes>
            <Route path='/Landing' element={<LandingPage/>} />
            <Route path='/' element={<Home/>} />
            <Route path='/Movie' element={<Movie/>} />
            <Route path='/Series' element={<Series/>} />
            <Route path='/TopIdbm' element={<TopIdbm/>} />
            <Route path='/Genre' element={<Genre/>} />
            <Route path='/GenreSeries' element={<GenreS/>} />
            <Route path='/SearchResult/:id' element={<SearchResult/>} />
            <Route path='/Zmovie/:id' element={<Zmovie/>}/>
            <Route path='/ZmovieS/:id' element={<ZmovieS/>}/>
            <Route path='*' element={<PageNotFound/>} />
        </Routes>
        <div className={styles.menulinks} style={{background:mode?'rgb(200, 198, 198)':'black',left:show?'0':'-400px'}}>
            <div className={styles.center}>
                <div className={styles.icon}>
                <FaTimes size={40} style={{color:mode?'black':'white',display:show?'block':'none',float:'right'}} onClick={()=>setshow(!show)}/>
                </div>
                <div><NavLink onClick={()=>setclick(!click)} style={{color:mode?'black':'white'}} to='/'><FaHome/> Home</NavLink></div>
                <div><NavLink onClick={()=>setclick(!click)} style={{color:mode?'black':'white'}} to='/Genre'><FaPlus/> Genre</NavLink></div>
                <div><NavLink onClick={()=>setclick(!click)} style={{color:mode?'black':'white'}} to='/Movie'><MdMovie/> Movies</NavLink></div>
                <div><NavLink onClick={()=>setclick(!click)} style={{color:mode?'black':'white'}} to='/GenreSeries'><MdFlag/> Genre S</NavLink></div>
                <div><NavLink onClick={()=>setclick(!click)} style={{color:mode?'black':'white'}} to='/Series'><MdLocalMovies/> Series</NavLink></div>
                <div><NavLink onClick={()=>setclick(!click)} style={{color:mode?'black':'white'}} to='/TopIdbm'><GiRank3/> Top Idbm</NavLink></div>
                <div className={styles.menuaccount} style={{color:mode?'black':'white'}}>
                    <Link onClick={()=>setclick(!click)} style={{color:mode?'black':'white'}} to='/Landing'><MdAccountBox/>Account</Link></div>
            </div>
        </div>
        </ModeContext.Provider>
    )
}
export default NavBar