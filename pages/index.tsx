import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';

export interface Product {
    id: string;
    title: string;
    description: string;
}

interface HomePageProps {
    products: Product[];
}

const HomePage: NextPage<HomePageProps> = ({ products }) => {
    return (
        <ul>
            {products.map(({ id, title }) => (
                <li key={id}>
                    <Link href={`/products/${id}`}>{title}</Link>
                </li>
            ))}
        </ul>
    );
};

export const getStaticProps: GetStaticProps<HomePageProps, { id: string }> =
    async () => {
        const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
        const jsonData = await fs.readFile(filePath);
        const data: { products: Product[] } = JSON.parse(jsonData.toString());

        if (!data) {
            return {
                redirect: {
                    destination: '/no-data',
                    permanent: false,
                },
            };
        }

        if (data.products.length === 0) {
            return { notFound: true };
        }

        return {
            props: {
                products: data.products,
            },
            revalidate: 10,
        };
    };

export default HomePage;
