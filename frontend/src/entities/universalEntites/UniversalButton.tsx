import { ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    className?: string
}

export const UniversalButton = ({ children, className }: Props) => {
    return <button className={className}>{children}</button>;
};
