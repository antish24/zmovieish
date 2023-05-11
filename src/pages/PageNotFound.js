import React, { useContext } from 'react'
import Footer from '../components/Footer'
import { FaArrowUp, FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ModeContext } from '../components/NavBar'
import styles from './Pagenotfound.module.css'
const PageNotFound = () => {
  const mode=useContext(ModeContext)
  return (
    <>
    <div className={styles.box} style={{backgroundColor:!mode?'rgb(63, 62, 62)':'rgb(200, 200, 200)'}} >
      <div className={styles.img}></div>
    </div>
    <div className={styles.welcom} style={{backgroundColor:!mode?'rgb(63, 62, 62)':'rgb(200, 200, 200)'}} >
    <div className={styles.bigc}>
    <div className={styles.smallcc}>
      <div className={styles.smallc}>
        <Link to='/'><FaPlay size={40} color='white'/></Link>
      </div>
    </div>
    </div>
    <h2>HOME PAGE <FaArrowUp size={20}/></h2>
   </div>
    <Footer/>
    </>
  )
}

export default PageNotFound