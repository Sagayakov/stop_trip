import { setLoading } from 'entities/loading/model/setLoadingSlice.ts';
import { SetStateAction } from 'react';
import { Dispatch } from 'redux';


const url = import.meta.env.VITE_BASE_URL;
export const handleFetchResetPassword = async (
    email: string,
    setSuccess: React.Dispatch<SetStateAction<boolean>>,
    dispatch: Dispatch
) => {
    dispatch(setLoading(true));
    try {
        const response = await fetch(`${url}/api/auth/users/reset_password/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        if (response.ok) {
            setSuccess(true);
            dispatch(setLoading(false));
            return response;
        }
    } catch (error) {
        console.log(error);
    }
};
