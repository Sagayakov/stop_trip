import { lazy } from 'react';
const FormConfirmResetPassword = lazy(() => import('features/formResetPassword/FormConfirmResetPassword'));

export const ResetPassword = () => {
    return <FormConfirmResetPassword />;
};
