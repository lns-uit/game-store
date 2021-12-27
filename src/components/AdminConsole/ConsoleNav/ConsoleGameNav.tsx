import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import './style.css'
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import axios from "axios";
import { Endpoint } from "../../../api/endpoint";
import { GameDetailss } from "../../../interfaces/rootInterface";

const navlist = [
    {
        index: 0,
        path: '/admin/console/game-list',
        title: "All Games",
        icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
    },
    {
        index: 1,
        path: '/admin/console/game/overview/',
        title: "Overview",
        icon: <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M21.58,16.09l-1.09-7.66C20.21,6.46,18.52,5,16.53,5H7.47C5.48,5,3.79,6.46,3.51,8.43l-1.09,7.66 C2.2,17.63,3.39,19,4.94,19h0c0.68,0,1.32-0.27,1.8-0.75L9,16h6l2.25,2.25c0.48,0.48,1.13,0.75,1.8,0.75h0 C20.61,19,21.8,17.63,21.58,16.09z M11,11H9v2H8v-2H6v-1h2V8h1v2h2V11z M15,10c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1 C16,9.55,15.55,10,15,10z M17,13c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1C18,12.55,17.55,13,17,13z"/></g></g></svg>
    },
    {
        index: 2,
        path: '/admin/console/game/releases/',
        title: "Game Releases",
        icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g fill-rule="evenodd"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/></g></svg>
    },
    {
        index: 3,
        path: '/admin/console/game/orders/',
        title: "The Order",
        icon: <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0,0h24v24H0V0z" fill="none"/><g><path d="M19.5,3.5L18,2l-1.5,1.5L15,2l-1.5,1.5L12,2l-1.5,1.5L9,2L7.5,3.5L6,2v14H3v3c0,1.66,1.34,3,3,3h12c1.66,0,3-1.34,3-3V2 L19.5,3.5z M19,19c0,0.55-0.45,1-1,1s-1-0.45-1-1v-3H8V5h11V19z"/><rect height="2" width="6" x="9" y="7"/><rect height="2" width="2" x="16" y="7"/><rect height="2" width="6" x="9" y="10"/><rect height="2" width="2" x="16" y="10"/></g></svg>
    },
    
]

interface PropsType{
    idGame:string;
}

function ConsoleGameNav({idGame}:PropsType){
    const ref = useRef<LoadingBarRef>(null);
    const [indexNav, setIndexNav] = useState(-1);
    const [gameData, setGameData] = useState<GameDetailss>();
    const history = useHistory();
    const onChangeRoute = (event) =>{
        let route = window.location.pathname.split('/');
        let path = '';
        route.forEach((value,index)=>{
            if (index !== route.length-1)
            path += value + '/';
        })
        setIndexNav(navlist.findIndex(obj=> obj.path === path))
    }
    
    const getGame = () => {
        axios.get(Endpoint.mainApi+"api/gameversion/by-game/lastest-version/"+idGame,
            {
                headers: {
                    Authorization: "Bearer "+ localStorage.getItem("accessToken")
                },
            }
        )
        .then(res => {
            setGameData(res.data)
        })
    }
    const handleLoadSomething = () => {
        ref.current?.continuousStart
        setTimeout(() => {
            ref.current?.complete();
        }, 100);
    };
    useEffect(()=>{
        history.listen(onChangeRoute)
    },[])
    useEffect(()=>{
        onChangeRoute(null);
    })
    useEffect(()=>{
        getGame()
    },[idGame])
    return (
        <div className = "console-nav-container">
            {
                navlist.map((item,index)=>(
                    index === 0 ?
                    <div 
                        className = "btn-console-nav" 
                        onClick={()=>{
                            setIndexNav(index)
                            history.push(item.path)
                            handleLoadSomething()
                        }} 
                        style={{border: index===indexNav ? "0.5px solid var(--console-nav-btn-border-color)" : "transparent"}}
                    >
                        <div className = {index===indexNav ? "active-btn-console" : "inactive-btn-consle"} style = {{height:"30px",width:"30px", display:'flex', alignItems:'center'}}>
                            {item.icon}  
                        </div>
                        <div className = "text-btn-console-nav" style={{color: index===indexNav ? "var(--console-nav-btn-color)" : "rgb(184, 184, 184)" }}>
                            {item.title}
                        </div>
                    </div> : null
                ))
            }
            <div className="divide-bar">
            </div>
            <div style={{height:'20px'}}>
            </div>
            <div 
                className = "btn-console-nav" 
                style={{cursor:'default'}}
            >
                <div style = {{height:"30px",width:"30px", display:'flex', alignItems:'center'}}>
                    <img src = {gameData?.imageGameDetail[0].url} height={30} width={30} style={{borderRadius:'5px'}}/>
                </div>
                <div className = "text-btn-console-nav"  style={{color:"rgb(184, 184, 184)"}}>
                    {gameData?.nameGame}
                </div>
            </div>
            <div style={{height:'10px'}}>
            </div>              
            <LoadingBar color="#f11946" ref={ref} />
            { 
                navlist.map((item,index)=>(
                    index !== 0 ?
                    <div 
                        className = "btn-console-nav" 
                        onClick={()=>{
                            setIndexNav(index)
                            history.push(item.path + idGame)
                            handleLoadSomething()
                        }} 
                        style={{border: index===indexNav ? "0.5px solid var(--console-nav-btn-border-color)" : "transparent"}}
                    >
                        <div className = {index===indexNav ? "active-btn-console" : "inactive-btn-consle"} style = {{height:"30px",width:"30px", display:'flex', alignItems:'center'}}>
                            {item.icon}  
                        </div>
                        <div className = "text-btn-console-nav" style={{color: index===indexNav ? "var(--console-nav-btn-color)" : "rgb(184, 184, 184)" }}>
                            {item.title}
                        </div>
                    </div> : null
                ))
            }
        </div>
    )
}
export default ConsoleGameNav;