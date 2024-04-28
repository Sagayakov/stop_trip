import { useNavigate, useParams } from 'react-router-dom';
import { useGetAdvertBySlugQuery } from 'app/api/authFetchAdverts.ts';
import { UserInfo } from 'entity/userInfo/UserInfo.tsx';

interface Props {
    className: string;
}

export const AdvertOwner = ({ className }: Props) => {
    const { slug } = useParams();
    const { data, refetch } = useGetAdvertBySlugQuery(slug!);
    const navigate = useNavigate();

    const handleNavigate = () => navigate(`/user/${data?.owner.id}`);

    return (
        <>
            {data &&
                <UserInfo
                    user={data.owner}
                    className={className}
                    refetch={refetch}
                    handleNavigate={handleNavigate}
                />
            }
        </>
    );
};
