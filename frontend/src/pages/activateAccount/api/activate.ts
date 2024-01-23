import { url } from 'shared/const/url';

type ActivateProps = {
    uid: string;
    token: string;
};

export const activate = async ({ uid, token }: ActivateProps) => {
    return await fetch(`${url}/api/auth/users/activation/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, token }),
    });
};
