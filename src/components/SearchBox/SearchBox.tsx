import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Endpoint } from "../../api/endpoint";
import { GameType } from "../../interfaces/rootInterface";
import numberWithCommas from "../../utils/numberWithCommas";
import './style.css'
interface PropType{
    text:string;
}

function SearchBox({text}:PropType){
    const history = useHistory();
    const [games,setGame] = useState<GameType[]>([]);
    const searchGameByName = () => {
        axios.get(Endpoint.mainApi+'api/game/search-game-by-name/'+text)
            .then(res => {
                console.log(res.data);
                setGame(res.data);
            })
            .catch(err => {
                setGame([]);
            })
    }
    useEffect(()=>{
        searchGameByName();
    },[text])
    return(
        <div className="box-search-container">
            {
            games.length === 0 ? 
            <div className="nothing-here">
                NOTHING HERE
            </div> :
            games.map((value,index)=>(
                <Link to= {`/game/${value.idGame}`}>
                    <div className="d-flex item-search">
                        <img src = {value.imageGameDetail[0].url}/>
                        <div className="name-game">
                            <div className="name">
                            {value.nameGame} 
                            </div>
                            <div className="cost">
                             {value.cost === 0 ? "Free" : numberWithCommas(value.cost)} 
                            </div>
                            
                                        
                        </div>
                    </div>
                </Link>
              
            ))}
        </div>
    )
}

export default SearchBox;