import { UseFormRegister } from "react-hook-form";
import { TypeSettingTransport } from "../../../widgets/settingForm/settingTransport/TypeSettingTransport";

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const MarkOfTransport = ({}:Props) => {
    return (
        <div className="mark">
            <h3>Марка</h3>
        </div>
    );
};
