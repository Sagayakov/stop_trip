import { lazy } from 'react';
const FormConfirmResetPassword = lazy(() => import('../../features/formResetPassword/FormConfirmResetPassword'));
import './resetPassword.scss';

export const ResetPassword = () => {
    return <FormConfirmResetPassword />;
};
