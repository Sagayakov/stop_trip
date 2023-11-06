import { UseFormRegister } from "react-hook-form";
import { TypeSettingTransport } from "../../../widgets/settingForm/settingTransport/TypeSettingTransport";

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const TypeOfTransport = ({}: Props) => {
    return (
        <div className="typeOfTransport">
            <h3>Тип транспорта</h3>
        </div>
    );
};
