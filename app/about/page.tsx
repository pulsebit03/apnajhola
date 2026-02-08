import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
    return (
        <div className="min-h-screen font-sans">
            <Navbar />
            <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold mb-8 text-stone-900">About ApnaJhola</h1>
                <div className="prose prose-stone prose-lg">
                    <p className="mb-4">
                        Welcome to ApnaJhola, your number one source for all your daily needs. We're dedicated to providing you the best of fresh vegetables, fruits, and groceries, with a focus on dependability, customer service, and uniqueness.
                    </p>
                    <p className="mb-4">
                        Founded in 2026, ApnaJhola has come a long way from its beginnings. When we first started out, our passion for quick, eco-friendly delivery drove us to start our own business.
                    </p>
                    <p>
                        We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
