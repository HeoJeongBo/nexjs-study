import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface UserIdPageProps {
    id: string;
}

const UserIdPage: React.FC<UserIdPageProps> = ({ id }) => {
    return (
        <div>
            <h1>UserID: {id}</h1>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<UserIdPageProps> = async (
    context
) => {
    const params = context.params as ParsedUrlQuery;

    const userId = params.uid;

    return {
        props: {
            id: 'userid-' + userId,
        },
    };
};

export default UserIdPage;
