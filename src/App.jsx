import React, { useState } from 'react';
import { 
  ShoppingBag, X, Menu, Instagram, Facebook, Twitter, 
  ChevronRight, ShoppingCart, MapPin, Phone, Mail, 
  CheckCircle2, CreditCard, Send 
} from 'lucide-react';

/**
 * Komponen Utama App Sasak Exotic
 * Fitur: Multi-page (State-based), Keranjang, Dual Checkout (WA & Direct)
 */
const App = () => {
  // State untuk Navigasi Halaman
  const [currentPage, setCurrentPage] = useState('home');
  
  // State untuk UI (Cart & Menu)
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State untuk Checkout Logic
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'options', 'direct-pay', 'success'
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Semua');

  // Data Produk (Dapat diganti dengan API di masa depan)
  const products = [
    { id: 1, name: "Kemeja Tenun Sade", price: 450000, category: "Pria", image: "https://images.unsplash.com/photo-1594932224491-365287e07a38?q=80&w=800&auto=format&fit=crop", description: "Tenun tangan asli dengan motif khas Sasak yang elegan." },
    { id: 2, name: "Outer Ethnic Rinjani", price: 385000, category: "Wanita", image: "https://images.unsplash.com/photo-1583846662270-7389d0465851?q=80&w=800&auto=format&fit=crop", description: "Outerwear ringan dengan detail etnik untuk tampilan kasual." },
    { id: 3, name: "Syal Tenun Mandalika", price: 125000, category: "Aksesoris", image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop", description: "Aksesoris sempurna untuk melengkapi gaya harian Anda." },
    { id: 4, name: "Dress Etnik Gili", price: 520000, category: "Wanita", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop", description: "Terusan premium dengan sentuhan motif eksotis." },
    { id: 5, name: "Kemeja Koko Sasak", price: 320000, category: "Pria", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop", description: "Perpaduan desain modern dan tradisional." },
    { id: 6, name: "Tas Tenun Handmade", price: 275000, category: "Aksesoris", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop", description: "Tas anyaman dengan detail kain tenun asli." }
  ];

  const categories = ['Semua', 'Pria', 'Wanita', 'Aksesoris'];

  // Fungsi Keranjang
  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
    setIsCartOpen(true);
    setCheckoutStep('cart');
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  // Logic Checkout WhatsApp
  const handleWhatsAppCheckout = () => {
    const phoneNumber = "6281234567890"; // GANTI DENGAN NOMOR WA ANDA
    let message = "Halo Sasak Exotic, saya ingin memesan:\n\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ${formatPrice(item.price)}\n`;
    });
    message += `\nTotal: ${formatPrice(totalPrice)}\n\nMohon info selanjutnya untuk pengiriman.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  // --- KOMPONEN HALAMAN ---

  const HomeView = () => (
    <div className="animate-in fade-in duration-700">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop" alt="Hero Background" className="w-full h-full object-cover brightness-75" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <h2 className="text-sm uppercase tracking-[0.4em] mb-4 opacity-90">Koleksi Terkini</h2>
          <h1 className="text-5xl md:text-7xl font-light mb-8 tracking-tight">Eksotisme Budaya <br/> dalam Gaya Modern</h1>
          <button onClick={() => setCurrentPage('shop')} className="inline-block border border-white px-10 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-all duration-300">
            Jelajahi Produk
          </button>
        </div>
      </section>
      
      <section className="max-w-7xl mx-auto px-6 py-24">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4">Kenapa Sasak Exotic?</h2>
            <div className="w-20 h-px bg-stone-300 mx-auto mb-6"></div>
            <p className="text-stone-500 max-w-2xl mx-auto italic">"Membawa warisan kain tenun Sasak ke panggung fashion kontemporer."</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8">
               <div className="mb-6 flex justify-center"><CheckCircle2 className="text-stone-400" size={40} strokeWidth={1} /></div>
               <h3 className="uppercase tracking-widest text-sm font-bold mb-4">Autentik</h3>
               <p className="text-stone-500 text-sm leading-relaxed">Setiap pola adalah hasil karya tangan pengrajin lokal Lombok yang autentik.</p>
            </div>
            <div className="p-8">
               <div className="mb-6 flex justify-center"><ShoppingBag className="text-stone-400" size={40} strokeWidth={1} /></div>
               <h3 className="uppercase tracking-widest text-sm font-bold mb-4">Eksklusif</h3>
               <p className="text-stone-500 text-sm leading-relaxed">Setiap koleksi dibuat dalam jumlah terbatas untuk menjaga eksklusivitas.</p>
            </div>
            <div className="p-8">
               <div className="mb-6 flex justify-center"><Instagram className="text-stone-400" size={40} strokeWidth={1} /></div>
               <h3 className="uppercase tracking-widest text-sm font-bold mb-4">Minimalis</h3>
               <p className="text-stone-500 text-sm leading-relaxed">Desain bersih dan modern yang menonjolkan keindahan motif etnik.</p>
            </div>
         </div>
      </section>
    </div>
  );

  const ShopView = () => {
    const filtered = activeCategory === 'Semua' ? products : products.filter(p => p.category === activeCategory);
    return (
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl font-light mb-4 tracking-tight uppercase">Katalog Belanja</h2>
            <p className="text-stone-500 max-w-md">Temukan pakaian etnik yang sempurna untuk setiap momen spesial Anda.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2 text-xs uppercase tracking-widest border transition-all ${activeCategory === cat ? 'bg-stone-900 border-stone-900 text-white' : 'border-stone-200 text-stone-500 hover:border-stone-400'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {filtered.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-6">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <button onClick={() => addToCart(product)} className="absolute bottom-0 left-0 w-full bg-stone-900 text-white py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-sm uppercase tracking-widest">
                  Tambah ke Keranjang
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-light mb-1">{product.name}</h3>
                  <p className="text-stone-400 text-sm mb-2">{product.category}</p>
                  <p className="font-medium text-stone-900">{formatPrice(product.price)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const StoryView = () => (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 animate-in fade-in duration-700">
      <h2 className="text-4xl font-light mb-12 tracking-tight text-center uppercase">Our Story</h2>
      <div className="aspect-video mb-12 bg-stone-100 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Workshop Sasak Exotic" />
      </div>
      <div className="space-y-8 text-stone-600 leading-relaxed text-lg text-center md:text-left">
        <p>Berawal dari kecintaan terhadap kain tradisional Sasak di Pulau Lombok, **Sasak Exotic** hadir untuk menjembatani kesenjangan antara budaya lokal dan gaya hidup modern.</p>
        <p>Setiap koleksi adalah bentuk penghormatan kami kepada para pengrajin lokal. Kami tidak hanya menjual pakaian, kami menceritakan kisah ketekunan di setiap jalinan benangnya.</p>
        <p>Filosofi desain kami adalah "Exotic Minimalism" — membiarkan kerumitan motif tenun berbicara sendiri melalui potongan pakaian yang sederhana dan elegan.</p>
      </div>
    </div>
  );

  const ContactView = () => (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h2 className="text-4xl font-light mb-8 uppercase tracking-tight">Hubungi Kami</h2>
          <p className="text-stone-500 mb-12 leading-relaxed">Apakah Anda memiliki pertanyaan atau ingin berkonsultasi mengenai pesanan khusus? Kami siap melayani Anda.</p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="text-stone-400 mt-1" size={20} />
              <div>
                <h4 className="font-bold uppercase text-[10px] tracking-widest mb-1">Showroom Mataram</h4>
                <p className="text-stone-500 text-sm">Jl. Pejanggik No. 123, Mataram, NTB</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="text-stone-400 mt-1" size={20} />
              <div>
                <h4 className="font-bold uppercase text-[10px] tracking-widest mb-1">WhatsApp</h4>
                <p className="text-stone-500 text-sm">+62 812-3456-7890</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="text-stone-400 mt-1" size={20} />
              <div>
                <h4 className="font-bold uppercase text-[10px] tracking-widest mb-1">Email Support</h4>
                <p className="text-stone-500 text-sm">hello@sasakexotic.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-stone-50 p-10 border border-stone-100">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Nama Depan</label>
                <input type="text" placeholder="John" className="w-full bg-white border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-900" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Nama Belakang</label>
                <input type="text" placeholder="Doe" className="w-full bg-white border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-900" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Email</label>
              <input type="email" placeholder="john@example.com" className="w-full bg-white border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-900" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Pesan</label>
              <textarea rows="4" placeholder="Tuliskan pesan Anda di sini..." className="w-full bg-white border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-900"></textarea>
            </div>
            <button className="w-full bg-stone-900 text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-stone-800 transition-colors">
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-stone-800 font-sans selection:bg-stone-200">
      
      {/* Header / Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
          
          <div onClick={() => setCurrentPage('home')} className="text-2xl font-light tracking-[0.2em] uppercase cursor-pointer">
            Sasak<span className="font-bold">Exotic</span>
          </div>

          <div className="hidden md:flex space-x-10 text-[11px] uppercase tracking-[0.2em] font-medium">
            <button onClick={() => setCurrentPage('home')} className={`transition-all ${currentPage === 'home' ? 'text-stone-900 font-bold' : 'text-stone-400 hover:text-stone-900'}`}>Home</button>
            <button onClick={() => setCurrentPage('shop')} className={`transition-all ${currentPage === 'shop' ? 'text-stone-900 font-bold' : 'text-stone-400 hover:text-stone-900'}`}>Shop</button>
            <button onClick={() => setCurrentPage('story')} className={`transition-all ${currentPage === 'story' ? 'text-stone-900 font-bold' : 'text-stone-400 hover:text-stone-900'}`}>Story</button>
            <button onClick={() => setCurrentPage('contact')} className={`transition-all ${currentPage === 'contact' ? 'text-stone-900 font-bold' : 'text-stone-400 hover:text-stone-900'}`}>Contact</button>
          </div>

          <div className="flex items-center">
            <button className="relative p-2 hover:bg-stone-50 rounded-full transition-colors" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cart.length > 0 && <span className="absolute top-0 right-0 bg-stone-900 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{cart.length}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Router */}
      <main className="min-h-screen">
        {currentPage === 'home' && <HomeView />}
        {currentPage === 'shop' && <ShopView />}
        {currentPage === 'story' && <StoryView />}
        {currentPage === 'contact' && <ContactView />}
      </main>

      {/* Simple Footer */}
      <footer className="bg-stone-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="text-xl font-light tracking-[0.2em] uppercase mb-8">Sasak<span className="font-bold">Exotic</span></div>
              <p className="text-stone-500 max-w-sm mx-auto md:mx-0 leading-relaxed text-sm mb-8">Eksotisme budaya Lombok dalam balutan desain modern yang minimalis. Pengiriman ke seluruh Indonesia.</p>
              <div className="flex justify-center md:justify-start space-x-6 text-stone-400">
                <Instagram size={18} className="cursor-pointer hover:text-stone-900" />
                <Facebook size={18} className="cursor-pointer hover:text-stone-900" />
                <Twitter size={18} className="cursor-pointer hover:text-stone-900" />
              </div>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6">Navigasi</h4>
              <ul className="space-y-4 text-stone-500 text-[11px] uppercase tracking-wider">
                <li><button onClick={() => setCurrentPage('shop')} className="hover:text-stone-900">Shop All</button></li>
                <li><button onClick={() => setCurrentPage('story')} className="hover:text-stone-900">Brand Story</button></li>
                <li><button onClick={() => setCurrentPage('contact')} className="hover:text-stone-900">Customer Support</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6">Newsletter</h4>
              <div className="flex border-b border-stone-300 py-1">
                <input type="email" placeholder="Email" className="bg-transparent text-sm focus:outline-none w-full" />
                <button className="text-stone-400 hover:text-stone-900"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.3em] text-stone-400">
            <p>© 2024 Sasak Exotic Indonesia. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span>Privacy Policy</span>
              <span>Terms</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <h2 className="text-lg font-light uppercase tracking-widest">
                {checkoutStep === 'direct-pay' ? 'Checkout' : checkoutStep === 'success' ? 'Sukses' : 'Shopping Cart'}
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-stone-50 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {checkoutStep === 'cart' && (
                <div className="space-y-6">
                  {cart.length === 0 ? (
                    <div className="h-full py-20 flex flex-col items-center justify-center text-stone-300">
                      <ShoppingBag size={48} strokeWidth={1} className="mb-4" />
                      <p className="uppercase tracking-widest text-[10px]">Keranjang Kosong</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.cartId} className="flex gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <img src={item.image} className="w-20 h-24 object-cover bg-stone-100" />
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <h3 className="text-sm font-medium">{item.name}</h3>
                            <button onClick={() => removeFromCart(item.cartId)} className="text-stone-300 hover:text-red-400"><X size={14} /></button>
                          </div>
                          <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-2">{item.category}</p>
                          <p className="text-sm font-bold">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {checkoutStep === 'options' && (
                <div className="space-y-6 py-4 animate-in fade-in duration-300">
                  <p className="text-stone-500 text-xs text-center mb-8 uppercase tracking-widest">Pilih Metode Checkout</p>
                  <button onClick={handleWhatsAppCheckout} className="w-full flex items-center justify-between p-5 border border-stone-200 hover:border-stone-900 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600"><Send size={18} /></div>
                      <div className="text-left">
                        <h4 className="font-bold uppercase text-[10px] tracking-widest">WhatsApp Order</h4>
                        <p className="text-[9px] text-stone-400">Pesan langsung ke Admin</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-all" />
                  </button>
                  <button onClick={() => setCheckoutStep('direct-pay')} className="w-full flex items-center justify-between p-5 border border-stone-200 hover:border-stone-900 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><CreditCard size={18} /></div>
                      <div className="text-left">
                        <h4 className="font-bold uppercase text-[10px] tracking-widest">Direct Payment</h4>
                        <p className="text-[9px] text-stone-400">Bayar di website (Transfer)</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-all" />
                  </button>
                  <button onClick={() => setCheckoutStep('cart')} className="w-full text-[10px] uppercase tracking-widest text-stone-400 mt-4">Kembali ke Keranjang</button>
                </div>
              )}

              {checkoutStep === 'direct-pay' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setCheckoutStep('success'); setCart([]); }}>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Nama Lengkap</label>
                      <input required type="text" className="w-full border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-900" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Alamat Lengkap</label>
                      <textarea required rows="3" className="w-full border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-900"></textarea>
                    </div>
                    <div className="p-4 bg-stone-50 border border-stone-200">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2">Instruksi Transfer</h4>
                      <p className="text-[11px] text-stone-500 mb-2">Transfer ke Bank BCA: **123-456-7890**</p>
                      <p className="text-[11px] text-stone-500">Atas Nama: **Sasak Exotic CV**</p>
                    </div>
                    <button className="w-full bg-stone-900 text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-stone-800">
                      Konfirmasi Pesanan
                    </button>
                    <button type="button" onClick={() => setCheckoutStep('options')} className="w-full text-[10px] uppercase tracking-widest text-stone-400 mt-2">Batal</button>
                  </form>
                </div>
              )}

              {checkoutStep === 'success' && (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                  <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6"><CheckCircle2 size={32} /></div>
                  <h3 className="text-xl font-light mb-2 uppercase tracking-widest">Pesanan Diproses</h3>
                  <p className="text-stone-500 text-sm mb-8 leading-relaxed">Terima kasih. Admin kami akan segera melakukan verifikasi pembayaran dan mengirimkan resi melalui email/nomor HP Anda.</p>
                  <button onClick={() => {setIsCartOpen(false); setCheckoutStep('cart'); setCurrentPage('shop')}} className="bg-stone-900 text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold">Terus Berbelanja</button>
                </div>
              )}
            </div>

            {/* Cart Sticky Bottom */}
            {cart.length > 0 && checkoutStep === 'cart' && (
              <div className="p-6 border-t border-stone-100 bg-stone-50">
                <div className="flex justify-between mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400">Estimated Total</span>
                  <span className="text-lg font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <button onClick={() => setCheckoutStep('options')} className="w-full bg-stone-900 text-white py-4 uppercase tracking-[0.2em] text-[11px] font-bold hover:bg-stone-800 transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[70] bg-white p-10 flex flex-col animate-in fade-in duration-300">
          <div className="flex justify-end">
            <button onClick={() => setIsMenuOpen(false)} className="p-2"><X size={32} strokeWidth={1} /></button>
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-10 text-4xl font-light uppercase tracking-tighter">
            {['home', 'shop', 'story', 'contact'].map(page => (
              <button key={page} onClick={() => {setCurrentPage(page); setIsMenuOpen(false)}} className="text-left hover:text-stone-400 transition-all">{page}</button>
            ))}
          </div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-stone-300">Sasak Exotic Official Store</div>
        </div>
      )}

    </div>
  );
};

export default App;
