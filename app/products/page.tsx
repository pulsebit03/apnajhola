'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { ShoppingBag, Loader2 } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image_url: string;
    description: string;
    unit?: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) {
                setProducts(data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen font-sans flex flex-col">
            <Navbar />

            <main className="flex-grow pt-28 pb-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-stone-900 mb-4">Our Products</h1>
                        <p className="text-stone-600 max-w-2xl mx-auto">
                            Browse our selection of fresh groceries, delivered to your doorstep in minutes.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-24">
                            <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-24 bg-stone-50 rounded-3xl border border-stone-100">
                            <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-stone-700">No products found</h3>
                            <p className="text-stone-500 mt-2">Check back later for fresh stock!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-lg transition-all hover:-translate-y-1 group">
                                    <div className="aspect-square bg-stone-100 relative overflow-hidden">
                                        {product.image_url ? (
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-stone-300">
                                                <ShoppingBag size={32} />
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-stone-700 shadow-sm">
                                            {product.category}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-stone-900 mb-1 truncate">{product.name}</h3>
                                        <p className="text-sm text-stone-500 line-clamp-2 mb-3 h-10">{product.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-extrabold text-primary">
                                                ₹{product.price}
                                                {product.unit && <span className="text-sm font-medium text-stone-500 ml-1">/ {product.unit}</span>}
                                            </span>
                                            <button className="bg-stone-900 text-white p-2 rounded-lg hover:bg-primary transition-colors">
                                                <ShoppingBag size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
