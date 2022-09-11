import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        cart: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        loadShop: (state, action) => {
            state.products = action.payload
        },
        addProduct: (state, action) => {
            state.cart.push(action.payload)
            state.quantity += 1
            state.total += action.payload.price * action.payload.quantity;
        },
        addQty: (state,action) => {
            state.cart.map(item => item._id === action.payload._id ? item.quantity++ : item)
            state.cart.map(item => item._id === action.payload._id ? state.total += item.price * item.quantity : item)
        },
        decQty: (state,action) => {
            state.cart.map(item => item._id === action.payload._id ? item.quantity-- : item)
            state.cart.map(item => item._id === action.payload._id ? state.total -= item.price * item.quantity : item)
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(item => item._id !== action.payload._id)
            state.quantity -= 1
            state.total -= action.payload.price * action.payload.quantity
        },
        cartLogout: (state) => {
            state.quantity = 0
            state.cart = []
            state.total = 0
        },
    }
})

export const { addProduct, cartLogout, loadShop, addQty, decQty, removeItem } = cartSlice.actions
export default cartSlice.reducer

        // addProduct: (state, action) => {
        //     const item = state.products.find(prod => prod._id === action.payload._id)
        //     const inCart = state.cart.find(item => item._id === action.payload._id ? true : false)
        //     state.quantity += 1
        //     inCart ? state.cart.map(item => item._id === action.payload._id ? {...item, quantity: item.quantity + 1} : item) : state.cart.push(action.payload)
        //     state.total += action.payload.price * action.payload.quantity;
        // },