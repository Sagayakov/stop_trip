import { setLoading } from 'entity/loading/model/setLoadingSlice.ts';
import { SetStateAction } from 'react';
import { Dispatch } from 'redux';
import { url } from 'shared/const/url';

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
