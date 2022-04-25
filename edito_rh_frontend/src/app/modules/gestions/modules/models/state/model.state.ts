


export enum ModelPageType{
    CREER='creer',
    MODIFIER='modifier',
    LIST='list'
}

export enum ModelPage {
    NO_PAGE="",
    FONCTION = "Fonction",
    VILLE = "Ville",
    ENTITE = "Entité",
    DIRECTION = "Direction",
    CONTRAT = "Contrat",
    CENTRE_COUT = "Centre Cout",
    AFFECTATION = "Affectation",
    EMPLOYE = "Employé",
    RUBRIQUE = "Rubrique",
    FORMULE = "Formule",
    VARIABLE = "Variable",
}


export interface modelState {
    modelPageType:ModelPageType,
    modelPage:ModelPage,
}


export const initialState: modelState={
    modelPageType:ModelPageType.LIST,
    modelPage:ModelPage.NO_PAGE
}