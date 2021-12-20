import './style.css';
import {GameDetailss} from '../../interfaces/rootInterface';
import numberWithCommas from '../../utils/numberWithCommas';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

interface PropsType {
    game:GameDetailss;
}

function GameOnSale({game}:PropsType) {
    const history = useHistory();
    return(
        <div className="d-flex">
            <div className="img-container">
                <img src = {game.imageGameDetail[0].url}/>
            </div>
            <div className='detail-container-notification'>
                <div className='white-txt break-w fw500'>
                    {game.nameGame}
                </div>
                <div className="d-flex space-between mg-top5">
                    <div className="d-flex align-center">
                        <div className = "discount-tag">
                            -{game.discount.percentDiscount}%
                        </div>
                        &nbsp;
                        <div className="text-deco gray-txt d-flex align-center">
                        {numberWithCommas((game.discount.percentDiscount/100)*game.cost)}
                        </div>
                    </div>
                   
                    <div className='white-txt fw500 d-flex align-center'> 
                        {numberWithCommas((1-game.discount.percentDiscount/100)*game.cost)}
                    </div>
                </div>
                <br/>
                <Button
                    onClick={()=>{window.open('/game/'+game.idGame)}}
                    className='bgr-blue1 pd-8-16 width-full border-radius-4 uppercase'
                    style={{ height: '40px' }}
                    type = "primary"
                >
                    Get Now
                </Button>
            </div>
        </div>
    )
}
export default GameOnSale;