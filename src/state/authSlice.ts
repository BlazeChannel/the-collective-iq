import { createSlice, createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import api from "../services/api";
import localStorage from "redux-persist/es/storage";

//shape of data
interface User {
    firstName: string;
    lastName: string;
    email: string;
    role : string[];
}
//const bankUser = localStorage.getItem('banktoken') ? localStorage.getItem('banktoken') : null

//state type/status
interface AuthState {
    user: User | null;
    isAuthenticated: boolean,
    isLoading : boolean,
   
}
//custom api fetching
export const RegisterSlice = createAsyncThunk(
    '/register',
    async(user: User, {rejectWithValue}) => {
        try{
            const response= await api.post('/user/register', user);
            console.log('Raw response:', response); 
            const isJson = response.headers['content-type']?.includes('application/json');
            if (isJson) {
                return response.data;
            } else {
                throw new Error('Invalid JSON response');
            }
        } catch (error) {
            console.error('Register fetch failed:', error);
            return rejectWithValue('Registration Failed');
        }
    }
)

export const LoginSlice = createAsyncThunk(
    '/login',
    async ( user:{ email:string, password:string }, {rejectWithValue}) => {
        try{
            const response= await api.post('/login', user);
            return response.data;
        }
        catch(error) { return console.error('login fetch failed', error) ;
            return rejectWithValue('Login Failed')}
    }
)
//comnbining it all for your slice
const initialState: AuthState ={
    user: null,
    isAuthenticated:false,
    isLoading: false,
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        //for updating state
        login: (state, action: PayloadAction<User>) => {
             state.user = action.payload;
             state.isAuthenticated = true;
         },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder)=>{
        // for actions
        builder.addCase(RegisterSlice.fulfilled, (state, action: PayloadAction<User>)=>{
            state.user= action.payload;
            state.isAuthenticated= true;
            state.isLoading= true;
            localStorage.setItem('banktoken', JSON.stringify(action.payload));
        }).addCase(LoginSlice.fulfilled, (state, action: PayloadAction<User>)=>{
            state.user= action.payload;
            state.isAuthenticated= true;
            state.isLoading= false;
            localStorage.setItem('banktoken', JSON.stringify(action.payload));
        })
    }
});

export const { login, logout } = authSlice.actions;
export const userSelector = (state: AuthState) => state.user
export default authSlice.reducer