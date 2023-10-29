type ActivateProps = {
    uid: string;
    token: string;
};

export const activate = async ({ uid, token }: ActivateProps) => {
    const url = import.meta.env.VITE_BASE_URL;

    return await fetch(`${url}/api/auth/users/activation/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, token }),
    });
};
