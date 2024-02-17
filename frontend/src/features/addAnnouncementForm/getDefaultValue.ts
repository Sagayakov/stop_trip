interface SelectOption{
    value: string | number | null | boolean
    label: string | number | null | boolean
}
interface Values{
    label: string | number
    value: string | number
}
type ValueListType = Values[] | SelectOption[] | undefined;

export const getDefaultValue = (defaultValue: string | number | null | undefined, valueList: ValueListType) => {
    if (defaultValue){
        if (valueList) {
            return valueList.find((el) => el.value === defaultValue)
        } else {
            return { value: ' ', label: ' ' }
        }
    }
}