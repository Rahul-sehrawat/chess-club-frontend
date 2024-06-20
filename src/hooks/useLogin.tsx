import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

type UseLoginReturnType = {
  login: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export const useLogin = (): UseLoginReturnType => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://chess-club-backend-main.onrender.com/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      } else {
        // save the user to local storage
        localStorage.setItem('user', JSON.stringify(json));

        // update the auth context
        dispatch({ type: 'LOGIN', payload: json });

        // update loading state
        setIsLoading(false);
      }
    } catch (error:any) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { login, isLoading, error };
};
