import { useContext } from 'react'
import { FaHeart } from 'react-icons/fa'
import styles from './Footer.module.css'
import { ModeContext } from './NavBar'
const Footer=()=>{
    const mode =useContext(ModeContext)
    return(
        <div className={styles.box} style={{backgroundColor:mode?'rgba(0,0,0,0.8)':'rgba(255,255,255,0.7'}}>
            <pre style={{color:mode?'white':'black',fontSize:'14px'}}>Made with <FaHeart size={13} className={styles.love} style={{color:'rgb(0,145,255)'}}/> by <a rel='noreferrer' target='_blank' href='https://t.me/idofc' style={{color:'rgb(0,145,255)'}}>@idofc</a> </pre>
        </div>
    )
}
export default Footer