import { UserModel } from "src/app/shared/models/user.model"




export interface authState {
    user?:UserModel,
    error?:string,
    loginResponse?:any,
    accessToken?:string,
}

export const initialState: authState={
    user:undefined,
    error:undefined,
    loginResponse:undefined,
    accessToken:undefined
}