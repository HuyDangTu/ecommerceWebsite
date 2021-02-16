import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_TYPES,
    GET_GENUSES,
    GET_PRODUCTS_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    ADD_GENUS,
    ADD_TYPE,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL,
} from '../actions/types';


export default function (state = {}, action) {
    switch (action.type) {
        case GET_PRODUCTS_BY_SELL: {
            return {...state,bySell: action.payload}
        }
        case GET_PRODUCTS_BY_ARRIVAL: {
            return { ...state, byArrival: action.payload }
        }
        case GET_GENUSES:{
            return {...state,genuses:action.payload}
        }
        case GET_TYPES:{
            return { ...state, types: action.payload }
        }
        case GET_PRODUCTS_TO_SHOP: {
            return { ...state, 
                    toShop: action.payload.articles,
                    toShopSize: action.payload.size,
                }
        }
        case ADD_PRODUCT:{
            return {
                ...state,
                addProduct: action.payload
            }
        }
        case CLEAR_PRODUCT:{
            return {
                ...state, 
                addProduct: action.payload
            }
        }
        case ADD_GENUS: {
            return {
                ...state,
                addGenus: action.payload.success,
                genuses: action.payload.genuses
            }
        }
        case ADD_TYPE: {
            return {
                ...state,
                addType: action.payload.success,
                types: action.payload.types
            }
        }
        case GET_PRODUCT_DETAIL:{
            return {
                ...state, 
                prodDetail: action.payload
            }
        }
        case CLEAR_PRODUCT_DETAIL: {
            return {
                ...state,
                prodDetail: action.payload
            }
        }
        default: return state;
    }
}