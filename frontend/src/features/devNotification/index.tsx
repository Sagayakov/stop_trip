import { useRef, useEffect, useState } from 'react';
import './libr/devNotification.styles.scss';
import { Close } from 'shared/ui/icons/icons-tools/Close';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'app/store/hooks';
import {
    setDevNotificationHeight,
    setIsDevNotificationVisible,
} from './model/isDevNotificationVisible';

export const DevNotification = () => {
    const { t } = useTranslation();
    const [isNotificationOpen, setIsNotificationOpen] = useState(true);
    const dispatch = useAppDispatch();
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            const height = (ref.current as HTMLElement).getBoundingClientRect()
                .height;

            dispatch(setDevNotificationHeight(`${height}px`));
        }
    }, [ref, dispatch, t]);

    const handleCloseNotification = () => {
        setIsNotificationOpen(false);
        dispatch(setIsDevNotificationVisible(false));
    };

    return (
        <div
            ref={ref}
            className={
                isNotificationOpen
                    ? 'dev_notification'
                    : 'dev_notification_hidden'
            }
        >
            {t('main-page.dev_notification')}
            <div
                className="close_notification"
                onClick={handleCloseNotification}
            >
                <Close color="white" />
            </div>
        </div>
    );
};
