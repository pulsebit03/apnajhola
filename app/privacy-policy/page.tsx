import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen font-sans bg-stone-50">
            <Navbar />
            <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-2 text-stone-900">Privacy Policy</h1>
                    <p className="text-stone-500 mb-10">Last updated: February 09, 2026</p>

                    <div className="prose prose-stone prose-lg max-w-none space-y-8 text-stone-600">
                        <p className="leading-relaxed">
                            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                        </p>

                        <section>
                            <h2 className="text-2xl font-bold text-stone-900 mb-4">1. Interpretation and Definitions</h2>
                            <h3 className="text-xl font-semibold text-stone-800 mb-2">Interpretation</h3>
                            <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-stone-900 mb-4">2. Collecting and Using Your Personal Data</h2>
                            <h3 className="text-xl font-semibold text-stone-800 mb-2">Types of Data Collected</h3>

                            <h4 className="text-lg font-semibold text-stone-700 mt-4 mb-2">Personal Data</h4>
                            <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2 bg-stone-50 p-6 rounded-xl border border-stone-100">
                                <li>Email address</li>
                                <li>First name and last name</li>
                                <li>Phone number</li>
                                <li>Address, State, Province, ZIP/Postal code, City</li>
                                <li>Usage Data</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-stone-900 mb-4">3. Use of Your Personal Data</h2>
                            <p>The Company may use Personal Data for the following purposes:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
                                <li><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service.</li>
                                <li><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
                                <li><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.</li>
                                <li><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-stone-900 mb-4">4. Retention of Your Personal Data</h2>
                            <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-stone-900 mb-4">5. Delete Your Account</h2>
                            <p>You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.</p>
                            <p className="mt-4">Our Service limits the ability to delete your account information directly within the application settings.</p>
                            <div className="bg-red-50 border border-red-100 p-6 rounded-xl mt-4">
                                <h4 className="text-lg font-bold text-red-800 mb-2">How to Request Deletion:</h4>
                                <ul className="list-disc pl-6 space-y-2 text-stone-800">
                                    <li>Visit our <a href="/delete-account" className="text-red-700 underline font-semibold">Delete Account Page</a> for detailed instructions.</li>
                                    <li>Contact us via email at <strong>support@apnajhola.com</strong>.</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-stone-900 mb-4">6. Contact Us</h2>
                            <p>If you have any questions about this Privacy Policy, You can contact us:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>By email: support@apnajhola.com</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
