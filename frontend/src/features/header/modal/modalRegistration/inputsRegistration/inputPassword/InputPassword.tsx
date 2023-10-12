import { FormState, UseFormRegister } from 'react-hook-form'
import { Eye } from '../../../../../../shared/ui/icons/icons-tools/Eye'
import { AuthRegistration } from '../../lib/RegistrationTypes'
import { useRef } from 'react'

interface Props {
    formState: FormState<AuthRegistration>
    register: UseFormRegister<AuthRegistration>
    showPassword: boolean
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
}

export const InputPassword = ({ formState, register, showPassword, setShowPassword }: Props) => {
    const { errors } = formState
    const inputRef = useRef<HTMLInputElement | null>(null)
    const handleShowPass = () => {
        setShowPassword(!showPassword)
        inputRef.current?.focus()
    }

    return (
        <>
            <div className="password-div">
                <input
                    {...register('password', {
                        required: true,
                        minLength: 5,
                    })}
                    placeholder="Пароль"
                    type={showPassword ? 'text' : 'password'}
                    style={{
                        border: `1px solid ${errors?.password ? '#FF3F25' : '#DCDCDC'}`,
                    }}
                    ref={inputRef}
                    onBlur={() => setShowPassword(false)}
                />
                <div id="eye" onClick={handleShowPass}>
                    <Eye />
                </div>
            </div>
            <div style={{ height: '1.5rem' }}>
                {errors?.password && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>Ведите корректный пароль</p>
                )}
            </div>
        </>
    )
}
