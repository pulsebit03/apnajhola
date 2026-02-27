'use client';

import Image from "next/image";
import { MoveRight, ShoppingBag, Clock, ShieldCheck, Star, Phone, MapPin, Milk, Croissant, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-20 md:pt-36 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-full text-primary font-semibold text-sm">
              <MapPin size={16} />
              Serving exclusively in Renukoot, Sonebhadra
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-stone-900 leading-[1.1]">
              Fresh Groceries, <br />
              <span className="text-primary">Delivered Fast.</span>
            </h1>
            <p className="text-xl text-stone-600 max-w-lg leading-relaxed">
              Experience the freshest vegetables, fruits, and daily essentials delivered to your doorstep in minutes. Quality you can trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-stone-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-stone-800 transition-transform hover:-translate-y-1 shadow-xl">
                <ShoppingBag size={24} />
                Download App
              </button>
              <a href="/products" className="bg-white text-stone-900 border border-stone-200 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-stone-50 transition-colors">
                View Products
                <MoveRight size={20} />
              </a>
            </div>
            <div className="flex items-center gap-4 pt-4 text-sm text-stone-500 font-medium">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-stone-200"></div>
                ))}
              </div>
              <span>Trusted by 10,000+ happy customers</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            {/* Texture & Decorative Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10">
              {/* Dot Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

              {/* Gradient Blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-orange-100/50 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-blue-50/50 rounded-full blur-3xl"></div>
            </div>

            {/* Phone Mockup Placeholder */}
            <div className="relative mx-auto w-[300px] h-[600px] bg-stone-900 rounded-[3rem] border-8 border-stone-900 shadow-2xl overflow-hidden z-10">
              {/* Simulated App Screen */}
              <div className="w-full h-full bg-stone-50 relative">
                <Image
                  src="/app-mockup.jpeg"
                  alt="App Screenshot"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-20 -right-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl shadow-stone-200/50 z-20 border border-stone-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-orange-100/80 rounded-full flex items-center justify-center text-xl">🥕</div>
              <div>
                <p className="font-bold text-sm text-stone-800">Fresh Carrots</p>
                <p className="text-xs text-stone-500 font-medium">Delivered to you</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 1, ease: "easeInOut" }}
              className="absolute bottom-40 -left-16 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl shadow-stone-200/50 z-20 border border-stone-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-green-100/80 rounded-full flex items-center justify-center text-xl">🥦</div>
              <div>
                <p className="font-bold text-sm text-stone-800">Organic Broccoli</p>
                <p className="text-xs text-stone-500 font-medium">Fresh from farm</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, delay: 2, ease: "easeInOut" }}
              className="absolute top-48 -left-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl shadow-stone-200/50 z-20 border border-stone-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-blue-100/80 rounded-full flex items-center justify-center text-xl">
                {/* <Milk size={20} className="text-blue-600" /> */}
                🍶
              </div>
              <div>
                <p className="font-bold text-sm text-stone-800">Dairy Products</p>
                <p className="text-xs text-stone-500 font-medium">100% Pure</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, delay: 0.5, ease: "easeInOut" }}
              className="absolute bottom-16 -right-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl shadow-stone-200/50 z-20 border border-stone-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-yellow-100/80 rounded-full flex items-center justify-center text-xl">🥐</div>
              <div>
                <p className="font-bold text-sm text-stone-800">Fresh Bakery</p>
                <p className="text-xs text-stone-500 font-medium">Hot & Crispy</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">Why ApnaJhola?</span>
            <h2 className="text-4xl font-bold mt-2 text-stone-900">We deliver more than just groceries</h2>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: Clock, title: "Super Fast Delivery", desc: "Get your order delivered to your doorstep in as fast as 10 minutes." },
              { icon: ShieldCheck, title: "Quality Guarantee", desc: "We ensure every item is fresh. If you're not satisfied, we replace it instantly." },
              { icon: ShoppingBag, title: "No Minimum Order", desc: "Forgot a lemon? No problem. We fulfill orders of all sizes." }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants} className="p-8 rounded-3xl bg-stone-50 border border-stone-100 hover:border-primary/20 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6 border border-stone-100">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-stone-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-20 bg-stone-50 border-y border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Successful Orders", value: "10k+", color: "text-blue-600" },
              { label: "Fresh Products", value: "500+", color: "text-green-600" },
              { label: "Partner Stores", value: "20+", color: "text-orange-600" },
              { label: "Happy Customers", value: "4.8/5", color: "text-yellow-600" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 bg-white rounded-3xl border border-stone-100 shadow-sm"
              >
                <div className={`text-3xl md:text-4xl font-black mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-sm font-bold text-stone-500 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works / Showcase */}
      <section className="py-24 bg-stone-900 text-white overflow-hidden" id="how-it-works">
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Simple, Transparent, and Reliable.</h2>
              <div className="space-y-8">
                {[
                  { step: "01", title: "Open the App", desc: "Browse thousands of fresh products at fair prices." },
                  { step: "02", title: "Place Order", desc: "Add to cart and pay securely via UPI or Card." },
                  { step: "03", title: "Instant Delivery", desc: "Our rider picks up and delivers in minutes." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="text-3xl font-bold text-stone-700">{item.step}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                      <p className="text-stone-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <div className="relative bg-stone-800 rounded-3xl p-8 border border-stone-700">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-stone-700 overflow-hidden relative">
                    <Image src="/nobg-logo.png" alt="user" width={48} height={48} className="object-cover opacity-80" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">ApnaJhola User</div>
                    <div className="text-xs text-stone-400">Premium Member</div>
                  </div>
                </div>
                <motion.div
                  className="space-y-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.4 }
                    }
                  }}
                >
                  {[
                    { title: "Browsing Products", sub: "Looking for fresh vegetables", icon: "🥬", color: "bg-green-500/20 text-green-400" },
                    { title: "Order Placed", sub: "Payment confirmed via UPI", icon: "✅", color: "bg-blue-500/20 text-blue-400" },
                    { title: "Out for Delivery", sub: "Rider arriving in 8 mins", icon: "🛵", color: "bg-orange-500/20 text-orange-400" }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      className="flex items-center justify-between p-4 bg-stone-700/30 border border-stone-700 rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${item.color}`}>
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{item.title}</div>
                          <div className="text-xs text-stone-400">{item.sub}</div>
                        </div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6">Ready to order?</h2>
            <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto mb-10">
              Join thousands of satisfied customers who trust ApnaJhola for their daily needs. Download the app today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-primary px-8 py-4 rounded-2xl font-bold hover:bg-green-50 transition-colors shadow-lg flex items-center justify-center gap-2">
                <Image src="/nobg-logo.png" width={24} height={24} alt="icon" className="w-6 h-6 object-contain" />
                Download for Android
              </button>
              <button className="bg-primary-dark/30 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-dark/50 transition-colors flex items-center justify-center gap-2">
                Download for iOS
              </button>
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
