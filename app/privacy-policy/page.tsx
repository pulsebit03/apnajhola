import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen font-sans">
            <Navbar />
            <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold mb-8 text-stone-900">Privacy Policy</h1>
                <div className="prose prose-stone prose-lg space-y-6 text-stone-600">
                    <p>Last updated: February 01, 2026</p>
                    <p>
                        This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                    </p>
                    <h2 className="text-2xl font-bold text-stone-900">Collecting and Using Your Personal Data</h2>
                    <p>
                        While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to: Email address, First name and last name, Phone number, Address, State, Province, ZIP/Postal code, City.
                    </p>
                    <h2 className="text-2xl font-bold text-stone-900">Use of Your Personal Data</h2>
                    <p>
                        The Company may use Personal Data for the following purposes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                        <li>To provide and maintain our Service.</li>
                        <li>To manage Your Account.</li>
                        <li>For the performance of a contract.</li>
                        <li>To contact You.</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}
