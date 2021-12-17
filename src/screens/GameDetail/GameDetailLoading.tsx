import './style.css'

function GameDetailLoading(){
    return(
        <div className = "full-width-x">
            <div className='box-detail'>
                <div className = "full-width-child anim-loading"></div>
                <br/>
                <div className = "d-flex space-between anim-loading carousel-loading"></div>   <br/>   <br/>
                <div className = "full-width-child anim-loading"></div>   <br/>   <br/>
                <div className = "full-width-child anim-loading" style={{height:'100px'}}></div>   <br/>
                <div className = "full-width-child anim-loading"></div>   <br/>   <br/>
                <div className = "d-flex space-between anim-loading carousel-loading"></div>   <br/>   <br/>
            </div>
            <div className='box-price'>
                <div className = "full-width-child anim-loading"></div>         <br/>
                <div className = "full-width-child anim-loading"></div>         <br/>
                <div className = "full-width-child anim-loading"></div>         <br/>
                <div className = "full-width-child anim-loading"></div>         <br/>
                <div className = "full-width-child anim-loading"></div>         <br/>
            </div>
        </div>
    )
}

export default GameDetailLoading;