import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./lib/formRegistration.scss";
import { InputChechbox } from "./inputsRegistration/inputCheckbox/InputCheckbox";
import { InputEmail } from "./inputsRegistration/inputEmail/InputEmail";
import { InputName } from "./inputsRegistration/inputName/InputName";
import { InputPassword } from "./inputsRegistration/inputPassword/InputPassword";
import { InputRepeatPassword } from "./inputsRegistration/inputPassword/InputRepeatPassword";
import { InputPhone } from "./inputsRegistration/inputPhone/InputPhone";
import { InputSubmit } from "./inputsRegistration/inputSubmit/InputSubmit";
import { AuthRegistration } from "./lib/RegistrationTypes";
// import './inputsRegistration/inputRegistration.scss'

export const FormRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset, formState, watch } =
    useForm<AuthRegistration>({
      mode: "onBlur",
    });

  const onsubmit: SubmitHandler<AuthRegistration> = (data) => {
    alert(JSON.stringify(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)} autoComplete="false">
      <InputName formState={formState} register={register} />
      <InputPhone formState={formState} register={register} />
      <InputEmail formState={formState} register={register} />
      <InputPassword
        formState={formState}
        register={register}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      <InputRepeatPassword
        formState={formState}
        register={register}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        watch={watch}
      />
      <InputChechbox register={register} formState={formState} />
      <InputSubmit formState={formState} />
    </form>
  );
};
