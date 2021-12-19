import callApi from '../utils/callApi';
import { Endpoint } from './endpoint';

const checkIsWishlist = async (
    idGame: string,
    idUser: string
) => {
    try {
        const request = await callApi(
            'get',
            `${Endpoint.mainApi}api/wishlist/check-is-wishlist/${idUser}/${idGame}`
        );
        const {data} = request || {}
        return data;
    } catch (error) {
        return error
    }
}

const addToWishlist = async (
    idGame:string,
    idUser: string,
) => {
    try {
        const request = await callApi(
            'post',
            `${Endpoint.mainApi}api/wishlist/create/${idUser}`,
            `${idGame}`,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('accessToken')
                }
            }
        )
        const {data} = request || {}
        return data;
    } catch (error) {
        return error
    }
}
const removeToWishlist = async (
    idGame:string,
    idUser: string,
) => {
    try {
        const request = await callApi(
            'delete',
            `${Endpoint.mainApi}api/wishlist/delete/${idUser}`,
            idGame,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('accessToken')
                }
            }
        )
        const {data} = request || {}
        return data;
    } catch (error) {
        return error
    }
}

const wishlistApi = {
    checkIsWishlist,
    removeToWishlist,
    addToWishlist
}
export default wishlistApi;