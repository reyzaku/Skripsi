import { userRequest } from "../reqMethod"
import * as actionTypes from "./cartTypes"

const getData = async () => {
    try{
        const res = await userRequest.get("/product")
        return res.data
    }catch{

    }
}

const INITIAL_STATE = {
    products: [],
    cart: [],
    currentItem: null,
}

console.log(INITIAL_STATE)

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.LOAD_SHOP:
            return {
                ...state,
                products: action.payload,
            }
        case actionTypes.ADD_TO_CART:
            const item = state.products.find(prod => prod.id === action.payload.id)
            const inCart = state.cart.find(item => item.id === action.payload.id ? true : false)
            return {
                ...state, 
                cart: inCart ? state.cart.map(item => item.id === action.payload.id ? {...item, qty: item.qty + 1} : item) : [...state.cart, {...item, qty: 1}]
            }
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload.id),
            }
        case actionTypes.ADJUST_QTY:
            return {
                ...state,
                cart: state.cart.map(item => item.id === action.payload.id ? {...item, qty: action.payload.qty} : item)
            }
        case actionTypes.LOAD_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.payload,
            }
        default:
            return state;
    }
}

export default cartReducer;