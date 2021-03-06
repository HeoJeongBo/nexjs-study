import { GetServerSideProps } from 'next';

interface UserProfileProps {
    username: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ username }) => {
    return (
        <div>
            <h1>{username}</h1>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<UserProfileProps> = async (
    context
) => {
    const { params, req, res } = context;

    console.log(req);
    console.log(res);

    return {
        props: {
            username: 'Max',
        },
    };
};

export default UserProfile;
