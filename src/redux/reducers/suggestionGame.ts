import {GameType} from '../../interfaces/rootInterface'

export interface GameDiscover {
    gameData: GameType[] | null;
    itemsFree: GameType[] | null;
    topGamesWeek: GameType[]| null;
    mostPopular: GameType[]| null;
    topSellers: GameType[]| null;
    newRelease: GameType[]| null;
    freeGames: GameType[]| null;
    topGamesMonth: GameType[]| null;
    gameOnSales: GameType[]| null;
    mostFavorite: GameType[]| null;
    isLoading: number;
}

const initialState = {
    gameData: null,
    itemsFree: null,
    topGamesWeek: null,
    mostPopular: null,
    topSellers: null,
    newRelease: null,
    freeGames: null,
    topGamesMonth: null,
    gameOnSales: null,
    mostFavorite: null,
    isLoading: 0,
}
export interface GameDiscoverType {
    gameData: GameType[];
    itemsFree: GameType[];
    topGamesWeek: GameType[];
    mostPopular: GameType[];
    topSellers: GameType[];
    newRelease: GameType[];
    freeGames: GameType[];
    topGamesMonth: GameType[];
    gameOnSales: GameType[];
    mostFavorite: GameType[];
    isLoading: number;
    type: string;
}
const suggestionGameReducer = (state: GameDiscover = initialState, action: GameDiscoverType) => {
    switch (action.type) {
        case "set":
            return action;
        default:
            return state;
    }
}

export default suggestionGameReducer;