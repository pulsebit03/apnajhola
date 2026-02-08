import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfUse() {
    return (
        <div className="min-h-screen font-sans">
            <Navbar />
            <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold mb-8 text-stone-900">Terms of Service</h1>
                <div className="prose prose-stone prose-lg space-y-6 text-stone-600">
                    <p>Last updated: February 01, 2026</p>
                    <p>
                        Please read these terms and conditions carefully before using Our Service.
                    </p>
                    <h2 className="text-2xl font-bold text-stone-900">Acknowledgment</h2>
                    <p>
                        These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
                    </p>
                    <h2 className="text-2xl font-bold text-stone-900">User Accounts</h2>
                    <p>
                        When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.
                    </p>
                    <h2 className="text-2xl font-bold text-stone-900">Content</h2>
                    <p>
                        Our Service allows You to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the Content that You post to the Service.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
