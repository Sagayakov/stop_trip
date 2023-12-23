import { ReactNode, useEffect } from 'react';

type CallbackFunction = () => void;
interface Props {
    className: string;
    callback: CallbackFunction;
    children?: ReactNode;
}
interface Style {
    width: string;
    height: string;
    top: number | string;
    left: number | string;
    position: "fixed" | "absolute" | "relative" | "static" | "sticky" | undefined;
    zIndex: number;
}
export const BackgroundModal = ({ callback, className,children }: Props) => {
    const style: Style = {
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        position: 'fixed',
        zIndex: 5,
    };
    useEffect(() => {
        const escapeKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                callback();
            }
        };
        document.addEventListener('keydown', escapeKeyPress);
        return () => {
            document.removeEventListener('keydown', escapeKeyPress);
        };
    }, [callback]);

    return <div className={className} style={style} onClick={callback}>{children}</div>;
};
