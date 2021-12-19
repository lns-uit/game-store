import callApi from '../utils/callApi';
import { Endpoint } from './endpoint';

const checkIsWishlist = async (
    idUser: string,
    idGame: string,
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
    idUser: string,
    idGame:string,
) => {
    try {
        const request = await callApi(
            'post',
            `${Endpoint.mainApi}api/wishlist/create/${idUser}/${idGame}`,
            null,
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
    idUser: string,
    idGame:string,

) => {
    try {
        const request = await callApi(
            'delete',
            `${Endpoint.mainApi}api/wishlist/delete/${idUser}/${idGame}`,
            null,
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