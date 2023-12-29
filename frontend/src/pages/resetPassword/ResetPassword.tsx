import { lazy } from 'react';
const FormConfirmResetPassword = lazy(() => import('features/formResetPassword/FormConfirmResetPassword'));

const ResetPassword = () => {
    return <FormConfirmResetPassword />;
};

export default ResetPassword;