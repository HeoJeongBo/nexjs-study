import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

interface Sale {
    username: string;
    volume: number;
    id: string;
}

interface LastSalesProps {
    sales: Sale[];
}

const LastSales: React.FC<LastSalesProps> = ({ sales: initialSales }) => {
    const [sales, setSales] = useState<Sale[]>(initialSales);

    const { data, error } = useSWR(
        'https://nextjs-study-dummy-default-rtdb.firebaseio.com/sales.json',
        (url: string) => fetch(url).then((res) => res.json())
    );

    useEffect(() => {
        if (data) {
            const transformedSales: Sale[] = [];

            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }

            setSales(transformedSales);
        }
    }, [data]);

    if (error) {
        return <p>Failed to load.</p>;
    }

    if (!data && !sales) {
        return <p>Loading ....</p>;
    }

    return (
        <div>
            <ul>
                {sales.map((sale) => (
                    <li key={sale.id}>
                        {sale.username} - ${sale.volume}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const getStaticProps: GetStaticProps<LastSalesProps> = async () => {
    const response = await fetch(
        'https://nextjs-study-dummy-default-rtdb.firebaseio.com/sales.json'
    );
    const data: { [key: string]: Sale } = await response.json();

    const transformedSales: Sale[] = [];

    for (const key in data) {
        transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
        });
    }

    return {
        props: { sales: transformedSales },
        revalidate: 10,
    };
};

export default LastSales;
