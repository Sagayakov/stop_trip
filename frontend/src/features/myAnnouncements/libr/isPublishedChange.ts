import { getAccessTokenWithRefresh } from 'shared/model/getAccessTokenWithRefresh.ts';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { setLoading } from 'entity/loading/model/setLoadingSlice.ts';
import { url } from 'shared/const/url.ts';
import { TypesForHandlers } from 'features/myAnnouncements/libr/TypesForHandlers.ts';

export const fetchIsPublishedChange = async (slug: string, accessToken: string, is_published: boolean) => {
    await fetch(`${url}/api/advertisements/${slug}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${accessToken}`,
            "X-Csrftoken": `${accessToken}`,
        },
        body: JSON.stringify({ is_published: !is_published }),
    })
}

export const isPublishedChange = async (props: TypesForHandlers) => {
    const { is_published, refetch, dispatch, slug, t } = props;
    try {
        dispatch(setLoading(true));
        const { refreshToken } = getTokensFromStorage();
        await getAccessTokenWithRefresh(dispatch, refreshToken);
        const { accessToken } = getTokensFromStorage();
        await fetchIsPublishedChange(slug!, accessToken, is_published!);
        await refetch();
        dispatch(setLoading(false));
    } catch(error) {
        console.log(error);
        dispatch(setLoading(false));
        t('main-page.toast-wrong');
    }
}