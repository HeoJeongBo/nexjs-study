import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { Product } from './';

interface ProductDetailProps {
    product: Product | undefined;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    if (!product) {
        return <div>Loading....</div>;
    }

    return (
        <div>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
        </div>
    );
};

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);

    const data: { products: Product[] } = JSON.parse(jsonData.toString());

    return data;
}

export const getStaticProps: GetStaticProps<ProductDetailProps> = async (
    context
) => {
    const { params } = context;

    const productId = params?.pid as string;

    const data = await getData();

    const product = data.products.find((product) => product.id === productId);

    if (!product) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            product,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await getData();

    const ids = data.products.map((product) => product.id);
    const pathWithParams = ids.map((id) => ({ params: { pid: id } }));

    return {
        paths: pathWithParams,
        fallback: true,
    };
};

export default ProductDetail;
