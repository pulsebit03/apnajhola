import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-stone-50 py-16 border-t border-stone-200">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-100 p-1">
                            <Image src="/nobg-logo.png" alt="Logo" width={32} height={32} className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-xl text-stone-900 tracking-tight">ApnaJhola</span>
                    </div>
                    <p className="text-stone-500 text-sm">
                        Making daily shopping easy, fast, and reliable for everyone.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold text-stone-900 mb-4">Company</h4>
                    <ul className="space-y-2 text-stone-600 text-sm">
                        <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                        {/* <li><Link href="#" className="hover:text-primary">Careers</Link></li>
                        <li><Link href="#" className="hover:text-primary">Blog</Link></li> */}
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-stone-900 mb-4">Support</h4>
                    <ul className="space-y-2 text-stone-600 text-sm">
                        <li><Link href="/contact" className="hover:text-primary">Help Center</Link></li>
                        <li><Link href="/terms-of-use" className="hover:text-primary">Terms of Service</Link></li>
                        <li><Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-stone-900 mb-4">Contact</h4>
                    <ul className="space-y-2 text-stone-600 text-sm">
                        <li>support@apnajhola.in</li>
                        <li>+91 6306411343</li>
                    </ul>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-stone-200 text-center text-stone-400 text-sm">
                © 2026 ApnaJhola. All rights reserved.
            </div>
        </footer>
    );
}
