import { UseFormRegister } from "react-hook-form";
import { TypeSettingTransport } from "../../../widgets/settingForm/settingTransport/TypeSettingTransport";

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const TransportationCategory = ({}:Props) => {
    return (
        <div className="transportationCategory">
            <h3>Категория транспорта</h3>
        </div>
    );
};
