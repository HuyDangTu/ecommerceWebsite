import axios from 'axios';
import { PRODUCT_SERVER } from '../components/ultils/mise';

import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_GENUSES,
    GET_TYPES,
    GET_PRODUCTS_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    ADD_GENUS,
    ADD_TYPE,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL,
} from './types';

export function getProductDetail(id){
    const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then(response=>{
       return response.data[0]
    })
    return {
        type: GET_PRODUCT_DETAIL,
        payload: request,
    }
}

export function clearProductDetail(){
    const request = {}
    return {
        type: CLEAR_PRODUCT_DETAIL,
        payload: request,
    }
}

export function getProductsBySell(){
    
    //articles?sortBy=sold&order=desc&limit=4
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
        .then(response => response.data);
    console.log(request)
    return {
        type: GET_PRODUCTS_BY_SELL,
        payload: request
    }
}

export function getProductsByArrival(){
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createAt&order=desc&limit=4`)
        .then(response => response.data);
    console.log(request)
    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
}


export function getProductsToShop(skip, limit, filters =[],previousState = []){
    const data = {
        limit,
        skip,
        filters
    }
    const request = axios.post(`${PRODUCT_SERVER}/shop`,data)
    .then(response =>{

        let newState = [
            ...previousState,
            ...response.data.articles
        ]

        return {
            size: response.data.size,
            articles: newState
        }
    })
    return {
        type: GET_PRODUCTS_TO_SHOP,
        payload: request
    }
}

export function getGenuses(){
    const request = axios.get(`${PRODUCT_SERVER}/genuses`)
        .then(response => response.data);
   
    return {
        type: GET_GENUSES,
        payload: request
    }
}

export function getTypes() {
    const request = axios.get(`${PRODUCT_SERVER}/types`)
        .then(response => response.data);
    console.log(request)
    return {
        type: GET_TYPES,
        payload: request,
    }
}

export function addProduct(dataToSubmit){

    const request = axios.post(`${PRODUCT_SERVER}/article`,dataToSubmit)
    .then(response => {
        return response.data
    });

    return{
        type: ADD_PRODUCT,
        payload: request
    }
}


export function clearProduct(){
    
    return{
        type: CLEAR_PRODUCT,
        payload: ''
    }

}


export function addGenus(dataToSubmit, existingGenuses){

    const request = axios.post(`${PRODUCT_SERVER}/genus`, dataToSubmit)
    .then(response=>{
    if (response.data.success)
    {
        console.log(existingGenuses, response.data.genus)
        let genuses = [
            ...existingGenuses,
            response.data.genus
        ];
        return {
            success: response.data.success,
            genuses
        }  
    }else{
        console.log(existingGenuses, response.data.genus)
        let genuses = [
            ...existingGenuses,
        ];
        return {
            success: response.data.success,
            genuses
        }  
    }
    });
    console.log(request);
    return {
        type: ADD_GENUS,
        payload: request
    }
}

export function addType(dataToSubmit, existingTypes) {
    const request = axios.post(`${PRODUCT_SERVER}/type`, dataToSubmit)
        .then(response => {
            if (response.data.success) {
                let types = [
                    ...existingTypes,
                    response.data.type
                ];
                return {
                    success: response.data.success,
                    types
                }
            }else{
                let types = [
                    ...existingTypes,
                ];
                return {
                    success: response.data.success,
                    types
                }
            }
        });

    return {
        type: ADD_TYPE,
        payload: request
    }
}


