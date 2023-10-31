export type ResetPasswordType = {
    password: string;
    repeat_password: string;
};

export type ConfirmResetPasswordProps = {
    new_password: string;
    uid: string;
    token: string;
};
