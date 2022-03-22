import { AuthResponse } from "src/app/core/services/http/auth/auth.interface"



export interface authState {
    authResponse?:AuthResponse,
    error?:string
}

export const initialState: authState={
    authResponse:undefined,
    error:undefined
}