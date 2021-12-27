import React, { useEffect, useState } from "react";
import './style.css'
import ConsoleNav from "../ConsoleNav/ConsoleNav";
import ConsoleGameNav from "../ConsoleNav/ConsoleGameNav"
import imgConsole from "../../../assets/images/icon-console.png"
import { Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { useHistory } from "react-router-dom";

function ConsoleHeader(){
    const [isNav, setIsNav] = useState(true);
    const [gameNav, setGameNav] = useState(false);
    const [idGame, setIdGame] = useState('');
    const user = useSelector((state: RootState) => state.user);
    const history = useHistory();

    const onNavChange = () => {
        if (!isNav) {
            document.documentElement.style.setProperty('--console-nav-width','300px');
            document.documentElement.style.setProperty('--console-margin-left','250px');
            document.documentElement.style.setProperty('--padding-console','0px 30px 200px 100px');
            document.documentElement.style.setProperty('--console-nav-width-forheader','300px'); 
           
        } else {
            document.documentElement.style.setProperty('--console-nav-width','0px');
            document.documentElement.style.setProperty('--console-margin-left','0px');
            document.documentElement.style.setProperty('--padding-console','0px 200px 200px 200px');
            document.documentElement.style.setProperty('--console-nav-width-forheader','270px'); 
        }
        setIsNav(!isNav)
    }
    const checkAuthorize = () =>{
        let pathRoute = window.location.pathname;
        let route = pathRoute.split('/')[1]
        let routes = pathRoute.split('/');
        setIdGame(routes[routes.length-1])
        if (user?.roles !== 'admin' && route === 'admin' && user !== null) window.open('/','_self')
    }
    const onChangeRoute = (event) =>{
        let route = event.pathname.split('/');
        if (route[3] === 'game') setGameNav(true); else setGameNav(false);
    }
    const checkGameNav = () => {
        let route = window.location.pathname.split('/');
        if (route[3]==='game') setGameNav(true);
    }
    useEffect(()=>{
        checkAuthorize()
        checkGameNav();
    })
    useEffect(()=>{
        history.listen(onChangeRoute)
    },[])
    return(
        <div className = "console-header-container">
            <div 
                className = "console-nav-box" 
                style={{marginLeft: isNav ? '0px': '-300px'}}
            >
                {gameNav ? <ConsoleGameNav idGame = {idGame}/> : <ConsoleNav></ConsoleNav>}
          
            </div>
            <div className = "box-header">
                <div>
                    <div className = "btn-nav" onClick = {()=>{onNavChange()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/></svg>
                    </div>
                    <div style={{cursor:'pointer'}} onClick={()=>{history.push('/admin/console/game-list')}}>
                        <img src={imgConsole}/>
                    </div>
                
                </div>
                
                <div>
                    <Button 
                        type = "primary" onClick={()=>{window.open("/")}}
                        className='bgr-red pd-8-16 width-full border-radius-4 uppercase'
                        style={{ height: '40px' }}
                    >
                        Go to Discover
                    </Button>
                </div>
            </div>
           
        </div>
    )
}

export default ConsoleHeader;