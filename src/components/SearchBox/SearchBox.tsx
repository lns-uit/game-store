import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Endpoint } from "../../api/endpoint";
import { GameType } from "../../interfaces/rootInterface";
import numberWithCommas from "../../utils/numberWithCommas";
import "./style.css";
interface PropType {
  text: string;
}

function SearchBox({ text }: PropType) {
  const history = useHistory();
  const [games, setGame] = useState<GameType[]>([]);
  const searchGameByName = () => {
    axios
      .get(Endpoint.mainApi + "api/game/search-game-by-name/" + text)
      .then((res) => {
        console.log(res.data);
        setGame(res.data);
      })
      .catch((err) => {
        setGame([]);
      });
  };
  useEffect(() => {
    searchGameByName();
  }, [text]);
  return (
    <div className="box-search-container">
      {games.length === 0 ? (
        <div className="nothing-here">NOTHING HERE</div>
      ) : (
        games.map((value, index) => (
          <Link to={`/game/${value.idGame}`}>
            <div className="d-flex item-search">
              <img src={value.imageGameDetail[0].url} />
              <div className="name-game">
                <div className="name">{value.nameGame}</div>
                <div className="cost">
                  {value.discount !== null ? (
                    <div className="d-flex mg-top5">
                      <div className="d-flex align-center">
                        <div className="discount-tag">
                          -{value.discount.percentDiscount}%
                        </div>
                        &nbsp;&nbsp;
                        <div className="text-deco gray-txt d-flex">
                          {numberWithCommas(
                            value.cost
                          )}
                        </div>
                      </div>
                      &nbsp;   &nbsp;   &nbsp;
                      <div className="white-txt fw500 d-flex align-center">
                        {numberWithCommas(
                          (1 - value.discount.percentDiscount / 100) *
                            value.cost
                        )}
                      </div>
                    </div>
                  ) : value.cost === 0 ? (
                    "Free"
                  ) : (
                    numberWithCommas(value.cost)
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default SearchBox;
