export interface AuthRegistration {
    userName: string;
    email: string;
    passWord: string;
    repeatPassword: string;
    phone: number;
    agreement: boolean;
}

export type NewUser = {
    full_name: string;
    email: string;
    password: string;
    re_password: string;
};

export type UserEnter = Pick<NewUser, 'email' | 'password'>;
