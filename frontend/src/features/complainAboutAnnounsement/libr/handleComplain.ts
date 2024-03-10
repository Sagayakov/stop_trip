import { url } from 'shared/const/url.ts';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { getAccessTokenWithRefresh } from 'shared/model/getAccessTokenWithRefresh.ts';
import { setLoading } from 'entity/loading/model/setLoadingSlice.ts';
import { toast } from 'react-toastify';
import { ComplainTypes } from 'features/complainAboutAnnounsement/libr/ComplainTypes.ts';
import { Dispatch } from '@reduxjs/toolkit';
import { TFunction } from 'i18next';
import { getCsrfToken } from 'app/api/handlers/getCsrfToken.ts';

interface Props {
    payload: ComplainTypes;
    dispatch: Dispatch;
    t: TFunction<'translation', undefined>;
}

export const handleComplain = async ({ dispatch, payload, t }: Props) => {
    dispatch(setLoading(true));
    const { refreshToken } = getTokensFromStorage();
    await getAccessTokenWithRefresh(dispatch, refreshToken);
    const { accessToken } = getTokensFromStorage();
    try {
        const response = await fetch(`${url}/api/report/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'X-Csrftoken': getCsrfToken(),
            },
            body: JSON.stringify(payload),
        });
        if (response.ok) {
            const toastId = 'complain ok toast';
            toast.success(t('add-page.complain-success'), { toastId });
        }
        if (response.status === 400) {
            const toastId = 'complain status 400 toast';
            toast.error(t('add-page.complain-error'), { toastId });
        }
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
        const toastId = 'complain error toast';
        toast(t('errors.add-announcement-error'), { toastId });
    }
};
