import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
    return (
        <div className="min-h-screen font-sans">
            <Navbar />
            <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold mb-8 text-stone-900">Contact Us</h1>
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <p className="text-xl text-stone-600 mb-8">
                            Have questions? We'd love to hear from you.
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-primary">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold">Email</h3>
                                    <a href="mailto:contact@apnajhola.in" className="text-stone-600">contact@apnajhola.in</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-primary">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold">Phone</h3>
                                    <p className="text-stone-600">+91 6306411343</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-primary">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold">Location</h3>
                                    <p className="text-stone-600">Renukoot, Uttar Pradesh, 231217, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className="bg-stone-50 p-8 rounded-3xl border border-stone-200 space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-stone-700 mb-1">Name</label>
                            <input type="text" className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-primary" placeholder="Your Name" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-700 mb-1">Email</label>
                            <input type="email" className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-primary" placeholder="hello@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-700 mb-1">Message</label>
                            <textarea className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-primary h-32" placeholder="How can we help?"></textarea>
                        </div>
                        <button className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
