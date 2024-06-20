import { createContext, useReducer, useEffect, ReactNode, Dispatch } from 'react';

// Define User type
type User = {
  name: string;
  email: string;
  // Add other fields as needed
};

// Define Action type
type Action = { type: 'LOGIN'; payload: User } | { type: 'LOGOUT' };

// Define AuthContextType
export type AuthContextType = {
  user:  null | User ;
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
    // case 'LOGIN':
    //   return { user: action.payload };
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
