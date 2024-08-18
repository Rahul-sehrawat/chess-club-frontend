import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

type UseSignupReturnType = {
  signup: (email: string, password: string , name:string) => Promise<void>;
  isLoading: undefined | boolean ;
  error: string | null;
};

export const useSignup = (): UseSignupReturnType => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | undefined >();
  const { dispatch } = useAuthContext();
  const signupUrl = import.meta.env.VITE_SIGNUP_URL;

  const signup = async (email: string, password: string ,name :string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(signupUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
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
    } catch (error) {
      setIsLoading(false);
      setError((error as Error).message);
    }
  };

  return { signup, isLoading, error };
};
