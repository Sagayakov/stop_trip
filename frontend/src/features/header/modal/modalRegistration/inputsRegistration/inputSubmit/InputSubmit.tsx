import { FormState } from 'react-hook-form';
import { AuthRegistration } from '../../lib/RegistrationTypes';

interface Props {
    formState: FormState<AuthRegistration>;
}

export const InputSubmit = ({ formState }: Props) => {
    const { isValid } = formState;
    console.log(isValid);

    return (
        <input
            type="submit"
            style={{
                width: '100%',
                height: '43px',
                backgroundColor: '#02C66E',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
            }}
            value="Войти"
            //disabled={!isValid}
        />
    );
};
