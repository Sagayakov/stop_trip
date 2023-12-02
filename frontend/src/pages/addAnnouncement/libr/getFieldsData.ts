import { ChoicesType } from "../../../app/api/types/filtersType";
import { useGetFiltersQuery } from "../../../app/api/fetchAdverts";
import { SelectOption } from "./AnnouncementFormTypes";

interface IFieldData{
    categoryList?: SelectOption[] | undefined
}

export const useGetFieldsData = () => {
    const { data } = useGetFiltersQuery('');
    const fieldData: IFieldData = {}
    if(data){
        const categoryList = (data.params.find((el) => el.name === 'category') as ChoicesType).choices as SelectOption[]
        fieldData.categoryList = categoryList
    }
    return fieldData

}