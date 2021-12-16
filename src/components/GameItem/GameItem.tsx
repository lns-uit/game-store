import { Tag, Row, Col, Tooltip } from 'antd';
import React, { CSSProperties, useEffect, useMemo } from 'react';
import { rootColor } from '../../constants/rootColor';
import { ActionType, GameType } from '../../interfaces/rootInterface';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import './styles.css';
import numberWithCommas from '../../utils/numberWithCommas';
import { useHistory } from 'react-router-dom';

interface GameItemPropsType {
  game: GameType;
  action?: ActionType;
  isHorizontal?: boolean;
  heightImage?: string;
  titleTooltip?: string;
  onClickGameItem?: (game: GameType) => void;
}

function GameItem({
  game,
  action,
  isHorizontal,
  heightImage,
  titleTooltip,
  onClickGameItem,
}: GameItemPropsType) {
  const history = useHistory();
  const { nameGame, discount, imageGameDetail, genres, cost } = game;
  const { percentDiscount } = discount || {};
  const displayImage =
    imageGameDetail.length > 0
      ? imageGameDetail[0].url
      : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0PDg0NDQ0NDQ0NDQ8NDQ4NFhEWFhURExMYHSggGBolGxUWITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAJ8BPgMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAgEDBAUH/8QAMBABAQACAAIGCAcBAQAAAAAAAAECEQMEEiExQVJxFTJRYWKRobEFExQigZKi0XL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/RAAAAAAAAAADQ0GaNNAZo0oBOjSzQI0adDQOejTpo0Dno0vRoEaNLYCdGlMBg2sAAAAAAAAAAAAAAAAAAAAAayKBjRoDdEipATpulaboE6NLkNAjRpejQIZpemaBGmLsZYCBVTQZWNYAAAAAAAAAAAAAAAAAAAABFJioDWyEVAFSEipAZMVSNkVICZG6Xo0COizTthw7l1SW+UdOLyuWGPSuu3Wu2wHk0yx1sTYDlYyulibAc9JrpU0EJVUgAAAAAAAAAAAAAAAAAAAARcRF4gqKjIuA2RWMZHfg8HLL1cbff3fMESKmL28LkPHf4x/69Mxw4fZjd+7G2/MHi4XKZ5d2p7+p6ceUwx68rvz6ozPj8S+rhZ77La4ZY53rsyvnKD0Zc1hj1YzflNRWN/N4dl7bueV7nk/Ly8N+Vd+U3LZZdWey9oPBcU2PbzXBvStktl6+qb63C8HPwZf1oPNYmx1sRYDlU10sRkDlUrqAAAAAAAAAAAAAAAAAAAAAI6YucdMQXF4oi8Qev8AD5jc9ZSXc6t+17+Z5n8vUmPbOr2Pk8PKyyztllj6nN49PhzOd2sv47wOT4uWeWXSvdNTuis+a6Ns6O9X2uX4d25eUc+P6+XmD0fq/h+p+q+H6rnLY613+3byZTVs9lsB6f1Xw/Vl5v4fq8yuJhcdb75sHa858P1duX43T31a179vn16uQ7MvOfYHg4vrZed+7lXbi+tfO/dxoIrnXSudBzyRV5IoAAAAAAAAAAAAAAAAAAAAEdMXOOmILi8XOLgLj6n4fn0sLhe77V8qPVyXF6OePsv7b/IPXyWHRzzxvc48f18vN75w9Z3L24yXzj5/Mevl5g7Y8zlJrq8+9y2rluF07u+rO2+33PTxOWl7P2/YHPluFu7vZOz316eJw5lOvuVjjJJJ2RoPnc1h0curss3HbkOzLzn2bz+O8Zl7L9Kn8OvVl5wHh4vrXzv3csl8W/uy8793Ogioq7UZA55IXkgAAAAAAAAAAAAAAAAAAAACLiIqAuKiIqA6Sqlc5VSg+7yvE6eGN79avnHh5jDLp5axys32yVz5Tm/y5ZZuXr7dar0+kp4L/YDHmOJJqcPUnw5N/VcXwf5yPSM8H1PSM8F+YN/VcTwf5yZ+q4vg/wA5HpGeC/M9IzwfUE8Tj8TKWXDqvV6uTr+HY2TLcs652zTn6SngvzZ6Tngv9geHi392X/q/dztbnlu2+22otBlTk2poIqVVIAAAAAAAAAAAAAAAAAAAAEVEqBqpUNBcqtucqtguVUrnK3YOkrduezYOmzbn0i0FbZck7ZsG2stZtloFqaUBiWsAAAAAAAAAAAAAAAAAAAAAaxoDWAKakBcptICzaGgrZtIDdm07Ng3bGAAMArG1gAAAAAAAAAAAAAAAAAAAABsAaMAaMAUJAUJAUJAUJAaMAaMAbWAAAAAAAAAAAD//2Q==';
  const currentCost = useMemo(() => {
    if (!percentDiscount) return cost;
    return parseFloat(cost) * (1 - percentDiscount / 100);
  }, []);

  const renderGenre = () => {
    if (!genres) return null;
    let genreDisplay = '';
    const maxItemDisplay = genres.length >= 2 ? 2 : genres.length;
    for (let i = 0; i < maxItemDisplay; i++) {
      genreDisplay += genres[i].idGenreNavigation.nameGenre;
      if (i != maxItemDisplay - 1) {
        genreDisplay += ' - ';
      }
    }
    return <p className='game-item__detail-wrapper__type'>{genreDisplay}</p>;
  };

  const handleClickGameItem = e => {
    if (typeof onClickGameItem != 'undefined') {
      onClickGameItem(game);
      e.preventDefault();
      return;
    } else {
      history.push('/game/' + game.idGame);
    }
  };

  return (
    <div
      onClick={handleClickGameItem}
      className={
        isHorizontal ? 'game-item game-item--horizontal' : 'game-item'
      }>
      {action && (
        <Tooltip
          overlayInnerStyle={{ fontSize: 14 }}
          placement='topLeft'
          title={titleTooltip}
          color={rootColor.redColor}
          key={rootColor.whiteColor}>
          <button className='game-item__action'>
            {action === ActionType.REMOVE ? (
              <MinusCircleOutlined className='game-item__action__icon' />
            ) : (
              <PlusCircleOutlined className='game-item__action__icon' />
            )}
          </button>
        </Tooltip>
      )}
      <div className='game-item__container'>
        <div
          style={heightImage ? { height: heightImage } : {}}
          className='game-item__image'>
          <img src={displayImage} alt='game-item' />
        </div>
        <div className='game-item__detail-wrapper'>
          <p className='game-item__detail-wrapper__name'>{nameGame}</p>
          {renderGenre()}
          <div className='game-item__detail-wrapper__price-container'>
            {percentDiscount ? (
              <div className='price-container__sale-container'>
                <div className='price-container__sale'>
                  <p>-{percentDiscount}%</p>
                </div>
                <p className='price-container__cost'>
                  {cost === 0 ? 'Free' : numberWithCommas(cost)}
                </p>
              </div>
            ) : null}

            <p className='price-container__current-price'>
              {currentCost === 0 ? 'Free' : numberWithCommas(currentCost)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameItem;
