import { url } from '../../../shared/const/url';
import { ConfirmResetPasswordProps } from '../libr/types';

export const confimResetPassword = async ({
    new_password,
    uid,
    token,
}: ConfirmResetPasswordProps) =>
    await fetch(`${url}/api/auth/users/reset_password_confirm/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new_password, uid, token }),
    });
