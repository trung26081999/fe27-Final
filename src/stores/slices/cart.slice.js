import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const CART_LIMIT = 5

export const CART_ITEM_KEY = 'CART_ITEM'

const cartInfoFromStorage = localStorage?.getItem(CART_ITEM_KEY)
  ? JSON.parse(localStorage?.getItem(CART_ITEM_KEY))
  : []

console.log(cartInfoFromStorage)

const initialState = {
  cartState: {
    data: cartInfoFromStorage,
    totalQuantity: 0,
    totalAmount: 0,
    loading: false,
    error: null,
    // Thông tin phân trang
    pagination: {
      // Trang hiện tại
      page: 1,
      // Số record trả về trong 1 trang
      limit: CART_LIMIT,
      // Tổng số record từ server
      total: null,
      // Tổng số trang
      totalPage: null,
    },
  },
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getListCartAction: (state, action) => {
      localStorage.removeItem(CART_ITEM_KEY)
      state.cartState = {
        ...state.cartState,
        loading: true,
        pagination: {
          ...state.cartState.pagination,
        },
      }
    },
    getListCartActionSuccess: (state, action) => {
      const { data, totalProduct } = action.payload
      localStorage.setItem(CART_ITEM_KEY, JSON.stringify(data))
      // console.log(cartResponse)
      state.cartState = {
        ...state.cartState,
        data,
        loading: false,
        pagination: {
          ...state.cartState.pagination,
          total: +totalProduct,
          totalPage: totalProduct / CART_LIMIT,
        },
      }
    },
    getListCartActionFailed: (state, action) => {
      localStorage.removeItem(CART_ITEM_KEY)
      state.cartState = {
        ...state.cartState,
        loading: false,
        error: action.payload,
      }
    },
    getTotalBill: (state, action) => {
      const total = state?.cartState?.cart?.reduce?.(
        (cartTotal, cartItem) => (cartTotal += cartItem.total),
        0,
      )
      state.cartState.total = total
    },
    getTotalItem: (state, action) => {
      const cartItem = state?.cartState?.cart?.reduce?.(
        (cartTotal, cartItem) => (cartTotal += cartItem.count),
        0,
      )
      state.cartState.cartItem = cartItem
    },
    addProductToCartAction: (state, action) => {
      state.cartState = {
        ...state.cartState,
        data: action.payload,
        loading: true,
      }
    },
    addProductToCartSuccess: (state, action) => {
      toast.success('Add to cart successfully')
      const cartResponse = action.payload
      console.log(cartResponse)
      localStorage.setItem(CART_ITEM_KEY, JSON.stringify(cartResponse))
      // state.cartState.totalQuantity++
      state.cartState = {
        ...state.cartState,
        loading: false,
        data: cartResponse,
      }
      console.log(state.cartState)
      toast.info('Increased product quantity', {
        position: 'bottom-left',
      })
    },
    addProductToCartFailed: (state, action) => {
      toast.error('Add to cart failed')
      localStorage.removeItem(CART_ITEM_KEY)
      state.cartState = {
        ...state.cartState,
        loading: false,
        error: action.payload,
      }
    },

    updateProductCartAction: (state, action) => {
      localStorage.removeItem(CART_ITEM_KEY)
      state.cartState = {
        ...state.cartState,
        loading: true,
      }
    },
    updateProductCartActionSuccess: (state, action) => {
      toast.success('Add to cart successfully')
      // localStorage.setItem('cartItems', JSON.stringify(action.payload))
    },
    updateProductCartActionFailed: (state, action) => {},

    deleteProductCartAction: (state, action) => {
      localStorage.removeItem(CART_ITEM_KEY)
    },
    deleteProductCartActionSuccess: (state, action) => {
      // toast.success('Delete product successfully')
      // localStorage.setItem('cartItems', JSON.stringify(action.payload))
    },
    deleteProductCartActionFailed: (state, action) => {},

    // getTotal(state, action) {
    //   let { total, quantity } = state.cartState.data.reduce(
    //     (cartTotal, cartItem) => {
    //       const { price, quantity } = cartItem
    //       const itemTotal = price * quantity

    //       cartTotal.total += itemTotal
    //       cartTotal.quantity += quantity

    //       return cartTotal
    //     },
    //     {
    //       total: 0,
    //       quantity: 0,
    //     },
    //   )
    //   total = parseFloat(total.toFixed(2))
    //   state.cartState.totalQuantity = quantity
    //   state.cartState.totalAmount = total
    // },
    logOutCart: (state, action) => {
      state.cartState = {
        ...state.cartState,
        data: [],
        loading: true,
      }
    },
    clearCart(state, action) {
      localStorage.removeItem(CART_ITEM_KEY)
      // state.cartState.data = []
      state.cartState = initialState
      toast.error('Cart cleared', { position: 'bottom-left' })
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  addProductToCartAction,
  addProductToCartSuccess,
  addProductToCartFailed,
  getListCartAction,
  getListCartActionSuccess,
  getListCartActionFailed,
  deleteProductCartAction,
  deleteProductCartActionSuccess,
  deleteProductCartActionFailed,
  updateProductCartAction,
  updateProductCartActionSuccess,
  updateProductCartActionFailed,
  logOutCart,
  getTotalBill,
  getTotalItem,
  clearCart,
} = cartSlice.actions

export const cartReducer = cartSlice.reducer
