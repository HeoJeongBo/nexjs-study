import { GetStaticProps, NextPage } from 'next';
import fs from 'fs/promises';
import path from 'path';

interface Product {
    id: string;
    title: string;
}

interface HomePageProps {
    products: Product[];
}

const HomePage: NextPage<HomePageProps> = ({ products }) => {
    return (
        <ul>
            {products.map(({ id, title }) => (
                <li key={id}>{title}</li>
            ))}
        </ul>
    );
};

export const getStaticProps: GetStaticProps<HomePageProps, { id: string }> =
    async (context) => {
        const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
        const jsonData = await fs.readFile(filePath);
        const data: { products: Product[] } = JSON.parse(jsonData.toString());

        return {
            props: {
                products: data.products,
            },
        };
    };

export default HomePage;
