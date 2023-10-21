import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const ActivateAccount = () => {
    const url = import.meta.env.VITE_BASE_URL;
    const { uid, token } = useParams();
    const [success, setSuccess] = useState<boolean>(false);

    const activationAcc = async (uid: string, token: string) => {
        const body = {
            uid,
            token,
        };
        const response = await fetch(`${url}/api/auth/users/activation/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (response.ok) setSuccess(true);
    };

    useEffect(() => {
        activationAcc(uid!, token!);
    }, []);

    return (
        <div
            className="activate-acc-page"
            style={{
                paddingTop: '150px',
                width: '90%',
                margin: 'o auto',
                height: '82vh',
                fontSize: '28px',
            }}
        >
            прювет
            <div>{success ? 'аккаунт активирован' : 'пока не активирован'}</div>
        </div>
    );
};
