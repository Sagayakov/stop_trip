import styles from '../header.module.scss'

export const handleScroll = (ref: React.MutableRefObject<null>) => {
    if (ref.current) {
        if (
            document.body.scrollTop > 1 ||
            document.documentElement.scrollTop > 1
        ) {
            (ref.current as HTMLElement).classList.add(`${styles.fixed_header}`);
        } else {
            (ref.current as HTMLElement).classList.remove(`${styles.fixed_header}`);
        }
    }
};
