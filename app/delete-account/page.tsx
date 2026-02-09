import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trash2, AlertTriangle, Mail } from "lucide-react";

export default function DeleteAccount() {
    return (
        <div className="min-h-screen font-sans bg-stone-50">
            <Navbar />
            <div className="pt-32 pb-20 max-w-3xl mx-auto px-6">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                            <Trash2 size={24} />
                        </div>
                        <h1 className="text-3xl font-bold text-stone-900">Delete Account</h1>
                    </div>

                    <div className="space-y-6 text-stone-600 leading-relaxed">
                        <p>
                            We are sorry to see you go. If you wish to delete your account and all associated data from the ApnaJhola platform, please follow the instructions below.
                        </p>

                        <div className="bg-amber-50 border border-amber-100 p-6 rounded-xl flex gap-4">
                            <AlertTriangle className="text-amber-600 shrink-0 mt-1" size={24} />
                            <div>
                                <h3 className="font-bold text-amber-800 mb-1">Warning: Irreversible Action</h3>
                                <p className="text-amber-700 text-sm">
                                    Deleting your account is permanent. All your order history, saved addresses, and preferences will be permanently removed. This action cannot be undone.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-stone-900 mt-8">How to delete your account</h2>

                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                            <div className="border border-stone-200 rounded-xl p-6 hover:border-primary/50 transition-colors">
                                <h3 className="font-bold text-lg mb-3">Option 1: In App</h3>
                                <ol className="list-decimal pl-5 space-y-2 text-sm">
                                    <li>Open the <strong>ApnaJhola App</strong>.</li>
                                    <li>Go to the <strong>Profile</strong> tab.</li>
                                    <li>Scroll down and tap <strong>"Delete Account"</strong>.</li>
                                    <li>Confirm your password to proceed.</li>
                                </ol>
                            </div>

                            <div className="border border-stone-200 rounded-xl p-6 hover:border-primary/50 transition-colors">
                                <h3 className="font-bold text-lg mb-3">Option 2: Request via Email</h3>
                                <p className="text-sm mb-4">
                                    If you cannot access the app, you can request deletion via email.
                                </p>
                                <a
                                    href="mailto:support@apnajhola.com?subject=Delete Account Request"
                                    className="flex items-center gap-2 text-primary font-bold hover:underline"
                                >
                                    <Mail size={18} />
                                    support@apnajhola.com
                                </a>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-stone-900 mt-8">Data Retention</h2>
                        <p>
                            Once your request is processed, your personal data will be deleted from our active databases within 30 days, except for data we are required to retain for legal or accounting purposes (such as transaction records).
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
