import { Login } from "./auth.interface"

export interface authState {
    login:Login,
}

export const initialState: authState={
    login:{
        email:'',
        password:''
    },
}