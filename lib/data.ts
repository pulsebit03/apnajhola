import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app/data/products.json');

export interface Product {
    id: string; // Changed to string for UUIDs
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
}

export const getProducts = (): Product[] => {
    try {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileData) as Product[];
    } catch (error) {
        console.error('Error reading data file:', error);
        return [];
    }
};

export const addProduct = (product: Product): boolean => {
    try {
        const products = getProducts();
        products.push(product);
        fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing data file:', error);
        return false;
    }
};
