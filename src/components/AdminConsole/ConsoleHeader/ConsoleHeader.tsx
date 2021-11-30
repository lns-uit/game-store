import React, { useState } from "react";
import './style.css'
import ConsoleNav from "../ConsoleNav/ConsoleNav";
import imgConsole from "../../../assets/images/icon-console.png"

function ConsoleHeader(){
    const [isNav, setIsNav] = useState(true);

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

    return(
        <div className = "console-header-container">
            <div 
                className = "console-nav-box" 
                style={{marginLeft: isNav ? '0px': '-300px'}}
            >
                <ConsoleNav></ConsoleNav>
            </div>
            <div className = "box-header">
                <div className = "btn-nav" onClick = {()=>{onNavChange()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/></svg>
                </div>
                <img src={imgConsole}/>
            </div>
        </div>
    )
}

export default ConsoleHeader;