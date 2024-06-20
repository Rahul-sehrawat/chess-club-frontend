// import { createContext, useReducer, useEffect } from 'react'

// export const AuthContext = createContext()

// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN':
//       return { user: action.payload }
//     case 'LOGOUT':
//       return { user: null }
//     default:
//       return state
//   }
// }

// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, { 
//     user: null
//   })

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'))

//     if (user) {
//       dispatch({ type: 'LOGIN', payload: user }) 
//     }
//   }, [])

//   console.log('AuthContext state:', state)
  
//   return (
//     <AuthContext.Provider value={{ ...state, dispatch }}>
//       { children }
//     </AuthContext.Provider>
//   )

// }

// import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// // Define User type
// type User = {
//   id: string;
//   username: string;
//   email: string;
//   // Add other fields as needed
// };

// // Define Action type
// type Action = { type: 'LOGIN'; payload: User } | { type: 'LOGOUT' };

// // Define AuthContextType
// export type AuthContextType = {
//   state: {
//     user: User | null;
//   };
//   dispatch: React.Dispatch<Action>;
// };

// // Create AuthContext with a default value
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Define initial state
// const initialState = {
//   user: null,
// };

// // Reducer function
// const authReducer = (state: typeof initialState, action: Action) => {
//   switch (action.type) {
//     case 'LOGIN':
//       return { user: action.payload };
//     case 'LOGOUT':
//       return { user: null };
//     default:
//       return state;
//   }
// };

// // AuthContextProvider component
// type AuthContextProviderProps = {
//   children: ReactNode;
// };

// export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   return (
//     <AuthContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use AuthContext
// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuthContext must be used within an AuthContextProvider');
//   }
//   return context;
// };


import React, { createContext, useReducer, useEffect, ReactNode, Dispatch } from 'react';

// Define User type
type User = {
  name: string;
  username: string;
  email: string;
  // Add other fields as needed
};

// Define Action type
type Action = { type: 'LOGIN'; payload: User } | { type: 'LOGOUT' };

// Define AuthContextType
export type AuthContextType = {
  user: User | null;
  dispatch: Dispatch<Action>;
};

// Create AuthContext with a default value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define initial state
const initialState = {
  user: null,
};

// Reducer function
const authReducer = (state: typeof initialState, action: Action): typeof initialState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

// AuthContextProvider component
type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
    }
  }, []);

  console.log('AuthContext state:', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
