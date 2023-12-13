import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useAppSelector } from '../../../../../../app/store/hooks';
import '../../libr/inputEmail.scss';
import { AuthData } from '../../libr/EnterType';

interface Props {
    errors: FieldErrors<AuthData>;

    control: Control<AuthData, string>;
}

export const InputEmail = ({ errors, control }: Props) => {
    const errorEnter = useAppSelector((state) => state.setIsAuth.errorEnter);

    return (
        <>
            <Controller
                name="email"
                control={control}
                defaultValue=''
                rules={{
                    required: true,
                    pattern:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    minLength: 10,
                }}
                render={({ field }) => (
                    <input
                        {...field}
                        type="email"
                        placeholder="Email"
                        autoComplete="username"
                        style={{
                            border: `1px solid ${
                                errors?.email || errorEnter ? '#FF3F25' : '#DCDCDC'
                            }`,
                        }}
                    />
                )}
            />
            {/* <input
                {...register('email', {
                    required: true,
                    pattern:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    minLength: 10,
                })}
                type='email'
                placeholder="Email"
                autoComplete="username"
                style={{
                    border: `1px solid ${
                        errors?.email || errorEnter ? '#FF3F25' : '#DCDCDC'
                    }`,
                }}
            /> */}
            <div className="input-error">
                {errors?.email && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        Введите корректный email
                    </p>
                )}
            </div>
        </>
    );
};
