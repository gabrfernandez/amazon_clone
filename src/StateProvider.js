import React, {createContext, useContext, useReducer} from "react";

//prepares dataLayer
export const StateContext=createContext();

//wrap our app
export const StateProvider=({reducer, initialState, children})=>(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

//pull info from the data layer
export const useStateValue=()=> useContext(StateContext);