// import { AuthContext } from "../context/AuthContext"
// import { useContext } from "react"

// export const useAuthContext = () => {
//   const context = useContext(AuthContext)

//   if(!context) {
//     throw Error('useAuthContext must be used inside an AuthContextProvider')
//   }

//   return context
// }

// import { ReactNode } from 'react';

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

// // AuthContextProvider component (example)
// type AuthContextProviderProps = {
//   children: ReactNode;
// };

// export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
//   // Implementation of AuthContextProvider
// };



import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthContext';

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used inside an AuthContextProvider');
  }

  return context;
};
