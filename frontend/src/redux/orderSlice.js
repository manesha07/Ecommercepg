import {createSlice } from '@reduxjs/toolkit'
const orderSlice = createSlice({
    name: 'order',
    initialState: {
        count: 0,
        products:[],
        total_amount:"",
        total_item: "",
        loading: false,
        error: ''
    },
    reducers: {
        addToOrder(state,action) {
            console.log("reduxer",action.payload.id)
            const user = JSON.parse(localStorage.getItem("user"))
            state.count += 1
            const itemIndex = state.products.findIndex(
                (item) => item.id === action.payload.id
            );
            if(itemIndex >= 0) {
                state.products[itemIndex].orderQuantity +=1;
                user && localStorage.setItem("order",JSON.stringify(state.products))
            }
            else{
                const tempProduct = {...action.payload,orderQuantity:1}
                state.products.push(tempProduct)
                user && localStorage.setItem("order",JSON.stringify(state.products))
            }

        },
        removeFromOrder(state, action) {
            state.count -= 1
        }
    }
})

export const {addToOrder,removeFromOrder} = orderSlice.actions
export default orderSlice.reducer