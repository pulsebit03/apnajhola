'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Image as ImageIcon, CheckCircle, AlertCircle, Trash2, Users, Package, TrendingUp, LogOut, Pencil, X, Search, Ban, Unlock, Bell, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image_url: string;
    description: string;
    unit?: string;
}

interface AppUser {
    id: string;
    email: string;
    name?: string;
    phone?: string;
    role?: 'admin' | 'delivery' | 'client';
    created_at: string;
    banned?: boolean;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'products' | 'users' | 'banners' | 'notifications'>('products');

    // Data State
    const [products, setProducts] = useState<Product[]>([]);
    const [users, setUsers] = useState<AppUser[]>([]);
    const [stats, setStats] = useState({ totalProducts: 0, totalUsers: 0, totalEarnings: 0 });

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        unit: '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState(''); // For preview/direct URL
    const [editingProductId, setEditingProductId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // UI State
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        checkUser();
        fetchData();
    }, []);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push('/admin/login');
            return;
        }

        const { data: userData } = await supabase
            .from('app_users')
            .select('role')
            .eq('id', user.id)
            .single();

        if (!userData || userData.role !== 'admin') {
            await supabase.auth.signOut();
            router.push('/admin/login');
        }
    };

    const fetchData = async () => {
        setFetching(true);

        // Fetch Products
        const { data: productsData } = await supabase
            .from('products')
            .select('*', { count: 'exact' });

        // Fetch Users
        const { data: usersData } = await supabase
            .from('app_users')
            .select('*', { count: 'exact' });

        // Fetch Orders for Earnings
        const { data: ordersData } = await supabase
            .from('orders')
            .select('total_amount');

        // Fetch Banners
        const { data: bannersData } = await supabase
            .from('banners')
            .select('*')
            .order('created_at', { ascending: false });

        if (bannersData) setBanners(bannersData);
        if (productsData) setProducts(productsData);
        if (usersData) setUsers(usersData);

        const totalEarnings = ordersData?.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0) || 0;

        // Update Stats
        setStats({
            totalProducts: productsData?.length || 0,
            totalUsers: usersData?.length || 0,
            totalEarnings: totalEarnings
        });

        setFetching(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [bannerTitle, setBannerTitle] = useState('');
    const [bannerImageFile, setBannerImageFile] = useState<File | null>(null);
    const [bannerImageUrl, setBannerImageUrl] = useState('');
    const [banners, setBanners] = useState<any[]>([]);

    // Notification states
    const [notificationTitle, setNotificationTitle] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState<'general' | 'offer' | 'order'>('general');
    const [sendingNotification, setSendingNotification] = useState(false);

    const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setBannerImageFile(file);
            setBannerImageUrl(URL.createObjectURL(file));
        }
    };

    const handleBannerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setIsError(false);

        try {
            if (!bannerImageFile) throw new Error('Please select an image');

            const fileExt = bannerImageFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('banners')
                .upload(filePath, bannerImageFile);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('banners')
                .getPublicUrl(filePath);

            const { error: dbError } = await supabase
                .from('banners')
                .insert([{ title: bannerTitle, image_url: publicUrl }]);

            if (dbError) throw dbError;

            setMessage('Banner added successfully!');
            setBannerTitle('');
            setBannerImageFile(null);
            setBannerImageUrl('');
            fetchData();
        } catch (error: any) {
            setIsError(true);
            setMessage(error.message || 'Failed to add banner');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBanner = async (id: string) => {
        if (!confirm('Delete this banner?')) return;
        const { error } = await supabase.from('banners').delete().eq('id', id);
        if (!error) fetchData();
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            // Create local preview
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('products')
            .upload(filePath, file);

        if (uploadError) return null;

        const { data: { publicUrl } } = supabase.storage
            .from('products')
            .getPublicUrl(filePath);

        return publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setIsError(false);

        try {
            let finalImageUrl = imageUrl;

            // Upload image if a file is selected
            if (imageFile) {
                const uploadedUrl = await uploadImage(imageFile);
                if (uploadedUrl) {
                    finalImageUrl = uploadedUrl;
                } else {
                    throw new Error('Image upload failed');
                }
            }

            if (editingProductId) {
                // Update existing product
                const { error } = await supabase
                    .from('products')
                    .update({
                        name: formData.name,
                        price: parseFloat(formData.price),
                        category: formData.category,
                        description: formData.description,
                        unit: formData.unit,
                        image_url: finalImageUrl,
                    })
                    .eq('id', editingProductId);

                if (error) throw error;
                setMessage('Product updated successfully!');
            } else {
                // Insert new product
                const { error } = await supabase
                    .from('products')
                    .insert([
                        {
                            name: formData.name,
                            price: parseFloat(formData.price),
                            category: formData.category,
                            description: formData.description,
                            unit: formData.unit,
                            image_url: finalImageUrl,
                        }
                    ]);

                if (error) throw error;
                setMessage('Product added successfully!');
            }

            // Reset form
            setFormData({ name: '', price: '', category: '', description: '', unit: '' });
            setImageFile(null);
            setImageUrl('');
            setEditingProductId(null);
            fetchData(); // Refresh list
        } catch (error: any) {
            setIsError(true);
            setMessage(error.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (product: Product) => {
        setFormData({
            name: product.name,
            price: product.price.toString(),
            category: product.category,
            description: product.description,
            unit: product.unit || '',
        });
        setImageUrl(product.image_url || '');
        setEditingProductId(product.id);
        setImageFile(null); // Reset file input as we might strictly keep existing URL
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setFormData({ name: '', price: '', category: '', description: '', unit: '' });
        setImageUrl('');
        setImageFile(null);
        setEditingProductId(null);
    };

    const handleDeleteProduct = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        const { error } = await supabase.from('products').delete().eq('id', id);
        if (!error) {
            fetchData();
        } else {
            alert('Failed to delete product');
        }
    };

    const handleBanUser = async (userId: string, currentStatus: boolean) => {
        const action = currentStatus ? 'Unban' : 'Ban';
        if (!confirm(`Are you sure you want to ${action} this user?`)) return;

        setLoading(true);
        const { error } = await supabase
            .from('app_users')
            .update({ banned: !currentStatus })
            .eq('id', userId);

        if (error) {
            alert(`Failed to ${action} user`);
        } else {
            fetchData();
        }
        setLoading(false);
    };

    const handleSendNotification = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!notificationTitle.trim() || !notificationMessage.trim()) {
            setMessage('Please fill in title and message');
            setIsError(true);
            return;
        }

        setSendingNotification(true);
        setMessage('');
        setIsError(false);

        try {
            // Send notification via Edge Function (handles DB insert + push notification)
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-push-notification`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
                    },
                    body: JSON.stringify({
                        title: notificationTitle,
                        message: notificationMessage,
                        type: notificationType,
                    }),
                }
            );

            const result = await response.json();
            console.log('Push notification result:', result);

            if (!response.ok) {
                throw new Error(result.error || 'Failed to send notification');
            }

            setMessage('Notification sent successfully! 🎉');
            setNotificationTitle('');
            setNotificationMessage('');
            setNotificationType('general');

        } catch (error: any) {
            setIsError(true);
            setMessage(error.message || 'Failed to send notification');
        } finally {
            setSendingNotification(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        document.cookie = 'admin_session=; Max-Age=0; path=/;'; // Clear fallback cookie
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-stone-50 font-sans">
            <nav className="bg-white border-b border-stone-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">A</div>
                    <h1 className="text-xl font-bold text-stone-900">Admin Dashboard</h1>
                </div>
                <button
                    onClick={handleLogout}
                    className="text-stone-500 hover:text-red-600 font-medium text-sm transition-colors flex items-center gap-2"
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </nav>

            <main className="max-w-7xl mx-auto p-6 md:p-8">

                {/* Analytics Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                            <Package size={24} />
                        </div>
                        <div>
                            <p className="text-stone-500 text-sm font-medium">Total Products</p>
                            <p className="text-2xl font-extrabold text-stone-900">{stats.totalProducts}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-stone-500 text-sm font-medium">Total Users</p>
                            <p className="text-2xl font-extrabold text-stone-900">{stats.totalUsers}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-stone-500 text-sm font-medium">Total Earnings</p>
                            <p className="text-2xl font-extrabold text-stone-900">₹{stats.totalEarnings.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-stone-200 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`pb-3 font-bold text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === 'products' ? 'border-primary text-primary' : 'border-transparent text-stone-500 hover:text-stone-800'}`}
                    >
                        Manage Products
                    </button>
                    <button
                        onClick={() => setActiveTab('banners')}
                        className={`pb-3 font-bold text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === 'banners' ? 'border-primary text-primary' : 'border-transparent text-stone-500 hover:text-stone-800'}`}
                    >
                        Manage Banners
                    </button>
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`pb-3 font-bold text-sm transition-colors border-b-2 whitespace-nowrap flex items-center gap-1 ${activeTab === 'notifications' ? 'border-primary text-primary' : 'border-transparent text-stone-500 hover:text-stone-800'}`}
                    >
                        <Bell size={14} /> Push Notifications
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`pb-3 font-bold text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === 'users' ? 'border-primary text-primary' : 'border-transparent text-stone-500 hover:text-stone-800'}`}
                    >
                        User List
                    </button>
                </div>

                {activeTab === 'products' ? (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Add Product Form */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-lg text-stone-900">
                                        {editingProductId ? 'Edit Product' : 'Add New Product'}
                                    </h3>
                                    {editingProductId && (
                                        <button
                                            onClick={handleCancelEdit}
                                            className="text-xs flex items-center gap-1 text-stone-500 hover:text-stone-800 bg-stone-100 px-2 py-1 rounded-lg transition-colors"
                                        >
                                            <X size={12} /> Cancel
                                        </button>
                                    )}
                                </div>

                                {message && (
                                    <div className={`mb-4 p-3 rounded-xl flex items-center gap-2 text-sm ${isError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                                        {isError ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
                                        <span className="font-medium">{message}</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-stone-600 mb-1">Product Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                            placeholder="e.g. Fresh Apples"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-stone-600 mb-1">Price (₹)</label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-stone-600 mb-1">Unit</label>
                                            <select
                                                name="unit"
                                                value={formData.unit}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white text-sm"
                                                required
                                            >
                                                <option value="">Select Unit</option>
                                                <option value="kg">kg</option>
                                                <option value="gram">gram</option>
                                                <option value="piece">piece</option>
                                                <option value="liter">liter</option>
                                                <option value="packet">packet</option>
                                                <option value="dozen">dozen</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label className="block text-xs font-bold text-stone-600 mb-1">Category</label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white text-sm"
                                                required
                                            >
                                                <option value="">Select</option>
                                                <option value="Fruits">Fruits</option>
                                                <option value="Vegetables">Vegetables</option>
                                                <option value="Dairy">Dairy</option>
                                                <option value="Bakery">Bakery</option>
                                                <option value="Meat">Meat</option>
                                                <option value="Beverages">Beverages</option>
                                                <option value="Snacks">Snacks</option>
                                                <option value="Household">Household</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-stone-600 mb-1">Product Image</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="block w-full text-xs text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                        />
                                        {imageUrl && (
                                            <div className="mt-2 w-full h-32 rounded-lg bg-stone-100 overflow-hidden relative border border-stone-200">
                                                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-stone-600 mb-1">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
                                            placeholder="Describe product..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-stone-900 text-white font-bold py-3 rounded-xl hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
                                    >
                                        {loading ? 'Saving...' : (
                                            <>
                                                <Plus size={16} />
                                                {editingProductId ? 'Update Product' : 'Add Product'}
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Product List */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
                                <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                                    <h3 className="font-bold text-lg text-stone-900">Product Inventory</h3>
                                    <button onClick={fetchData} className="text-xs text-primary font-bold hover:underline">Refresh</button>
                                </div>

                                {fetching ? (
                                    <div className="p-12 text-center text-stone-400">Loading products...</div>
                                ) : products.length === 0 ? (
                                    <div className="p-12 text-center text-stone-500">
                                        No products found. Add one to get started.
                                    </div>
                                ) : (
                                    <div className="divide-y divide-stone-100 max-h-[600px] overflow-y-auto">
                                        {products.map((product) => (
                                            <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-stone-50 transition-colors group">
                                                <div className="w-12 h-12 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0 border border-stone-200">
                                                    {product.image_url ? (
                                                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-stone-400">
                                                            <ImageIcon size={16} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-stone-900 text-sm truncate">{product.name}</h4>
                                                    <div className="text-xs text-stone-500">{product.category}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-primary text-sm">₹{product.price} {product.unit && <span className="text-xs text-stone-500">/ {product.unit}</span>}</div>
                                                </div>
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleEditClick(product)}
                                                        className="p-2 text-stone-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                                                        title="Edit"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteProduct(product.id)}
                                                        className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'banners' ? (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Add Banner Form */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
                                <h3 className="font-bold text-lg text-stone-900 mb-4">Add New Banner</h3>
                                {message && (
                                    <div className={`mb-4 p-3 rounded-xl flex items-center gap-2 text-sm ${isError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                                        {isError ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
                                        <span className="font-medium">{message}</span>
                                    </div>
                                )}
                                <form onSubmit={handleBannerSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-stone-600 mb-1">Banner Title</label>
                                        <input
                                            type="text"
                                            value={bannerTitle}
                                            onChange={(e) => setBannerTitle(e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                            placeholder="e.g. Summer Sale"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-stone-600 mb-1">Banner Image</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleBannerImageChange}
                                            required
                                            className="block w-full text-xs text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                        />
                                        {bannerImageUrl && (
                                            <div className="mt-2 w-full h-32 rounded-lg bg-stone-100 overflow-hidden relative border border-stone-200">
                                                <img src={bannerImageUrl} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-stone-900 text-white font-bold py-3 rounded-xl hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
                                    >
                                        {loading ? 'Uploading...' : (
                                            <>
                                                <Plus size={16} />
                                                Add Banner
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Banner List */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
                                <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                                    <h3 className="font-bold text-lg text-stone-900">Active Banners</h3>
                                    <button onClick={fetchData} className="text-xs text-primary font-bold hover:underline">Refresh</button>
                                </div>
                                {fetching ? (
                                    <div className="p-12 text-center text-stone-400">Loading banners...</div>
                                ) : banners.length === 0 ? (
                                    <div className="p-12 text-center text-stone-500">No banners found.</div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                                        {banners.map((banner) => (
                                            <div key={banner.id} className="relative group rounded-xl overflow-hidden shadow-sm border border-stone-100 aspect-video">
                                                <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleDeleteBanner(banner.id)}
                                                        className="bg-white text-red-600 p-2 rounded-full hover:bg-red-50"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent text-white text-xs font-bold">
                                                    {banner.title}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'notifications' ? (
                    // Notifications Tab
                    <div className="max-w-xl mx-auto">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                                    <Bell size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-stone-900">Send Push Notification</h3>
                                    <p className="text-xs text-stone-500">Send notification to all app users</p>
                                </div>
                            </div>

                            {message && (
                                <div className={`mb-4 p-3 rounded-xl flex items-center gap-2 text-sm ${isError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                                    {isError ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
                                    <span className="font-medium">{message}</span>
                                </div>
                            )}

                            <form onSubmit={handleSendNotification} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-stone-600 mb-1">Notification Type</label>
                                    <select
                                        value={notificationType}
                                        onChange={(e) => setNotificationType(e.target.value as 'general' | 'offer' | 'order')}
                                        className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white text-sm"
                                    >
                                        <option value="general">📢 General Announcement</option>
                                        <option value="offer">🏷️ Offer / Discount</option>
                                        <option value="order">📦 Order Update</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-stone-600 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={notificationTitle}
                                        onChange={(e) => setNotificationTitle(e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                        placeholder="e.g. 50% Off on Vegetables!"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-stone-600 mb-1">Message</label>
                                    <textarea
                                        value={notificationMessage}
                                        onChange={(e) => setNotificationMessage(e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
                                        placeholder="Write your notification message here..."
                                        required
                                    />
                                </div>

                                {/* Preview */}
                                <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                                    <p className="text-xs text-stone-500 mb-2 font-bold">Preview</p>
                                    <div className="bg-white p-3 rounded-lg shadow-sm border border-stone-200 flex gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${notificationType === 'offer' ? 'bg-orange-500' : notificationType === 'order' ? 'bg-blue-500' : 'bg-primary'}`}>
                                            {notificationType === 'offer' ? '🏷️' : notificationType === 'order' ? '📦' : '📢'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm text-stone-900 truncate">{notificationTitle || 'Notification Title'}</p>
                                            <p className="text-xs text-stone-500 line-clamp-2">{notificationMessage || 'Notification message will appear here...'}</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={sendingNotification}
                                    className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
                                >
                                    {sendingNotification ? 'Sending...' : (
                                        <>
                                            <Send size={16} />
                                            Send to All Users
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    // User List Tab
                    <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
                        <div className="p-6 border-b border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h3 className="font-bold text-lg text-stone-900">Registered Users</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-9 pr-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                />
                            </div>
                            <button onClick={fetchData} className="text-xs text-primary font-bold hover:underline">Refresh</button>
                        </div>

                        {fetching ? (
                            <div className="p-12 text-center text-stone-400">Loading users...</div>
                        ) : users.length === 0 ? (
                            <div className="p-12 text-center text-stone-500">
                                No users registered yet.
                            </div>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 font-bold">User</th>
                                        <th className="px-6 py-4 font-bold">Role</th>
                                        <th className="px-6 py-4 font-bold">Status</th>
                                        <th className="px-6 py-4 font-bold">Joined Date</th>
                                        <th className="px-6 py-4 font-bold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-100">
                                    {users
                                        .filter(user =>
                                            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            user.phone?.includes(searchTerm) ||
                                            user.id.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .map((user) => (
                                            <tr key={user.id} className="hover:bg-stone-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-stone-900 text-sm">{user.name || 'Unknown Name'}</span>
                                                        <span className="text-xs text-stone-500">{user.email}</span>
                                                        <span className="text-xs text-stone-400">{user.phone || 'No Phone'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                                        user.role === 'delivery' ? 'bg-orange-100 text-orange-700' :
                                                            'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {user.role || 'client'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {user.banned ? (
                                                        <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold flex w-fit items-center gap-1">
                                                            <Ban size={12} /> Banned
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold flex w-fit items-center gap-1">
                                                            <CheckCircle size={12} /> Active
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-stone-600">{new Date(user.created_at).toLocaleDateString()}</td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleBanUser(user.id, !!user.banned)}
                                                        className={`p-2 rounded-lg transition-colors ${user.banned
                                                            ? 'text-green-600 hover:bg-green-50'
                                                            : 'text-red-600 hover:bg-red-50'
                                                            }`}
                                                        title={user.banned ? "Unban User" : "Ban User"}
                                                    >
                                                        {user.banned ? <Unlock size={18} /> : <Ban size={18} />}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

            </main>
        </div>
    );
}
