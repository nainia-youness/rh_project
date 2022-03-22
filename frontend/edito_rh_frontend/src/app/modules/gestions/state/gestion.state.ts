import { FonctionModel } from "src/app/shared/models/fonction.model"


export interface gestionState {
    gestionPage:string,
    entities?:FonctionModel[],
    entitiesError?:string,
    fonctions?:FonctionModel[]
    fonctionsError?:string
}

export const initialState: gestionState={
    gestionPage:"",
    entities:undefined,
    entitiesError:undefined,
    fonctions:undefined,
    fonctionsError:undefined
}
