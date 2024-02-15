import { url } from 'shared/const/url.ts';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { getAccessTokenWithRefresh } from 'shared/model/getAccessTokenWithRefresh.ts';
import { setLoading } from 'entity/loading/model/setLoadingSlice.ts';
import { toast } from 'react-toastify';
import { ComplainTypes } from 'features/complainAboutAnnounsement/libr/ComplainTypes.ts';
import { Dispatch } from '@reduxjs/toolkit';
import { TFunction } from 'i18next';

interface Props{
    payload: ComplainTypes;
    dispatch: Dispatch;
    t: TFunction<"translation", undefined>;
}

export const handleComplain = async ({ dispatch, payload, t }: Props) => {
    dispatch(setLoading(true));
    const { refreshToken } = getTokensFromStorage();
    await getAccessTokenWithRefresh(dispatch, refreshToken);
    const { accessToken } = getTokensFromStorage();
    try {
        const response = await fetch(`${url}/api/report/`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${accessToken}`,
                "X-Csrftoken": `${accessToken}`,
            },
            body: JSON.stringify(payload),
        })
        if(response.ok){
            toast.success(t('add-page.complain-success'));
        }
        if(response.status === 400) toast.error(t('add-page.complain-error'))
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
        toast(t('errors.add-announcement-error'));
    }
}