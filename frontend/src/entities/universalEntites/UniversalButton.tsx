import { MouseEventHandler, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export const UniversalButton = ({ children, className,onClick }: Props) => {
    return <button className={className} onClick={onClick}>{children}</button>;
};
