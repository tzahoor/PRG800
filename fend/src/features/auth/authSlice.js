import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

import authService from './authService'

// Get user from localStorage  // the user is send in the form of token from the backend.
//Headers
const  user = JSON.parse(localStorage.getItem('user')) // locate user item in local storage
const initialState={
    user:user?user:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}
// Register User
export const register = createAsyncThunk('auth/register',async(user,thunkAPI)=>{
    try{
            return await authService.register(user)
    }catch(err){
        const message= (err.response  &&  err.response.data && err.response.data.message)|| err.message||err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
//Login User
export const login = createAsyncThunk('auth/login',async(user,thunkAPI)=>{
    try{
            return await authService.login(user)
    }catch(err){
        const message= (err.response  &&  err.response.data && err.response.data.message)|| err.message||err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout= createAsyncThunk('auth/logout',async()=>{
   return await authService.logout()
})
export const  authSlice=createSlice({
    name:'auth' ,// name of slice
    initialState,
    reducers:{
       reset:(state)=>{
        state.isError=false
        state.isSuccess=false
        state.isLoading=false
        state.message=''
       }
    },
    extraReducers:(builder)=>{ //actions
        builder
                .addCase(register.pending,(state)=>{
                    state.isLoading=true
                })
                .addCase(register.fulfilled,(state,action)=>{
                   
                    state.isSuccess=true
                    state.isLoading=false
                 
                  
                })
                .addCase(register.rejected,(state,action)=>{
                    state.isLoading=false
                    state.isError=true
                    state.message = action.payload
                    state.user=null

                })

                .addCase(login.pending,(state)=>{
                    state.isLoading=true
                })
                .addCase(login.fulfilled,(state,action)=>{
                    state.isLoading=false
                    state.isSuccess=true
                    state.user=action.payload
                })
                .addCase(login.rejected,(state,action)=>{
                    state.isLoading=false
                    state.isError=true
                    state.message = action.payload
                    state.user=null

                })
                .addCase(logout.fulfilled,(state)=>{
                    state.user=null
                })
    }
})
export const {reset} = authSlice.actions

export default authSlice.reducer