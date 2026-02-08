'use client';

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 transition-all duration-300">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-100 p-1">
                        <Image src="/nobg-logo.png" alt="Logo" width={32} height={32} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-lg font-bold text-stone-900 tracking-tight">ApnaJhola</span>
                </Link>
                <div className="hidden md:flex items-center gap-8 text-stone-600 font-medium text-sm">
                    <Link href="/#features" className="hover:text-primary transition-colors">Features</Link>
                    <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                    <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                </div>
                <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full font-semibold text-sm transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                    Download App
                </button>
            </div>
        </nav>
    );
}
