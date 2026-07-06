import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Trophy, User, Mail, Phone, ShoppingCart, CreditCard, Sparkles, AlertCircle, Calendar, MapPin, Download, CheckCircle2, QrCode } from "lucide-react";
import { RegistrationData } from "../types";

interface RegistrationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedCategory: string; // '3k' | '5k' | ''
}

export default function RegistrationDrawer({ isOpen, onClose, preSelectedCategory }: RegistrationDrawerProps) {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState(preSelectedCategory || "5k");
  const [tShirtSize, setTShirtSize] = useState<"XS"|"S"|"M"|"L"|"XL"|"XXL">("M");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [bloodType, setBloodType] = useState("O+");

  // Payment Form Fields (Mock)
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  // Completed Ticket State
  const [ticketData, setTicketData] = useState<RegistrationData | null>(null);

  // Synchronize category selection if pre-selected changed
  React.useEffect(() => {
    if (preSelectedCategory) {
      setCategory(preSelectedCategory);
    }
  }, [preSelectedCategory]);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate luxury API gateway settlement
    setTimeout(() => {
      const generatedId = `PARI-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      const generatedQRValue = `PARIRUN2026_${generatedId}_${fullName.replace(/\s+/g, "")}`;
      
      const newTicket: RegistrationData = {
        fullName: fullName || "ALEXANDER PACE",
        email: email || "runner@parirun.org",
        phone: phone || "+33 6 12 34 56 78",
        category,
        tShirtSize,
        emergencyContact: emergencyContact || "EMERGENCY BASE",
        emergencyPhone: emergencyPhone || "+33 6 87 65 43 21",
        bloodType,
        ticketId: generatedId,
        qrCodeValue: generatedQRValue,
        registrationDate: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
      };

      setTicketData(newTicket);
      setLoading(false);
      setStep(4); // Move to ticket pass display
    }, 1800);
  };

  const resetForm = () => {
    setStep(1);
    setFullName("");
    setEmail("");
    setPhone("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setCardName("");
    setEmergencyContact("");
    setEmergencyPhone("");
    setTicketData(null);
  };

  const getPrice = () => {
    return category === "3k" ? "€35" : "€45";
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlays */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (step < 4) onClose();
            }}
            className="fixed inset-0 bg-black z-45"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 220 }}
            className="fixed top-0 right-0 w-full md:w-[600px] h-screen bg-luxury-black border-l border-white/5 z-50 flex flex-col justify-between overflow-hidden shadow-2xl"
          >
            {/* Grid background layer */}
            <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />

            {/* HEADER */}
            <div className="p-6 md:p-8 border-b border-white/5 bg-luxury-grey/60 flex justify-between items-center relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-brand-orange flex items-center justify-center font-display font-black text-black text-sm">
                  P
                </div>
                <div>
                  <span className="font-mono text-[9px] text-brand-orange tracking-widest uppercase font-bold block">PARI RUN 2026 GATEWAY</span>
                  <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                    {step === 4 ? "TICKET SECURED" : `REGISTRATION - STEP ${step} OF 3`}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="p-2 rounded bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* FORM / SCROLLER STAGE */}
            <div className="flex-grow overflow-y-auto no-scrollbar p-6 md:p-8 relative z-10 flex flex-col justify-between">
              
              {/* STEP 1: CATEGORY & GENERAL PROFILE */}
              {step === 1 && (
                <form onSubmit={handleNextStep} className="space-y-6 flex-grow">
                  <div>
                    <h4 className="font-display font-bold text-sm text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                      <ShoppingCart className="w-4.5 h-4.5 text-brand-lime" /> Select Discipline & Size
                    </h4>
                    
                    {/* Category quick selectors */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div
                        onClick={() => setCategory("3k")}
                        className={`border rounded-xl p-4 cursor-pointer transition-all ${
                          category === "3k"
                            ? "bg-brand-lime/10 border-brand-lime"
                            : "bg-transparent border-white/5 hover:border-white/10"
                        }`}
                      >
                        <span className="font-mono text-[9px] text-white/40 uppercase block">3 KM DISCIPLE</span>
                        <span className="font-display font-black text-white text-sm block mt-1">3 KM FUN RUN</span>
                        <span className="font-mono text-xs text-brand-lime font-bold block mt-3">€35 PASS</span>
                      </div>

                      <div
                        onClick={() => setCategory("5k")}
                        className={`border rounded-xl p-4 cursor-pointer transition-all ${
                          category === "5k"
                            ? "bg-brand-orange/10 border-brand-orange"
                            : "bg-transparent border-white/5 hover:border-white/10"
                        }`}
                      >
                        <span className="font-mono text-[9px] text-white/40 uppercase block">5 KM DISCIPLE</span>
                        <span className="font-display font-black text-white text-sm block mt-1">5 KM CHALLENGE</span>
                        <span className="font-mono text-xs text-brand-orange font-bold block mt-3">€45 PASS</span>
                      </div>
                    </div>

                    {/* Sizing selection button group */}
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">DRI-FIT SHIRT SIZE</label>
                      <div className="flex flex-wrap gap-2">
                        {["XS", "S", "M", "L", "XL", "XXL"].map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => setTShirtSize(sz as any)}
                            className={`w-9 h-9 rounded font-mono text-xs font-bold border transition-all ${
                              tShirtSize === sz
                                ? "bg-white text-black border-white"
                                : "bg-white/5 text-white/60 border-white/5 hover:border-white/10"
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* General Profile fields */}
                  <div className="border-t border-white/5 pt-6 space-y-4">
                    <h4 className="font-display font-bold text-sm text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                      <User className="w-4.5 h-4.5 text-brand-orange" /> Personal Profile
                    </h4>

                    {/* Name */}
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">RUNNER FULL NAME</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. ALEXANDER PACE"
                          className="w-full bg-white/3 border border-white/5 hover:border-white/10 focus:border-brand-orange focus:bg-white/5 rounded px-10 py-3 text-sm text-white outline-none transition-all placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    {/* Email / Phone grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">EMAIL ADDRESS</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="alex@pace.com"
                            className="w-full bg-white/3 border border-white/5 hover:border-white/10 focus:border-brand-orange focus:bg-white/5 rounded px-10 py-3 text-sm text-white outline-none transition-all placeholder:text-white/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">MOBILE PHONE</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+33 6 12 34 56"
                            className="w-full bg-white/3 border border-white/5 hover:border-white/10 focus:border-brand-orange focus:bg-white/5 rounded px-10 py-3 text-sm text-white outline-none transition-all placeholder:text-white/20"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submission and summary at bottom */}
                  <div className="border-t border-white/5 pt-6 flex justify-between items-center">
                    <div>
                      <span className="font-mono text-[9px] text-white/40 uppercase block">DISCIPLINE PRICE</span>
                      <span className="font-mono text-xl font-black text-white">{getPrice()}</span>
                    </div>
                    <button
                      type="submit"
                      className="bg-white text-black hover:bg-brand-orange font-display font-black text-xs tracking-widest px-8 py-3.5 rounded transition-all cursor-pointer"
                    >
                      PROCEED TO SAFETY CODES
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: SAFETY CONTACTS & MEDICAL INFO */}
              {step === 2 && (
                <form onSubmit={handleNextStep} className="space-y-6 flex-grow">
                  <div className="space-y-4">
                    <h4 className="font-display font-bold text-sm text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                      <AlertCircle className="w-4.5 h-4.5 text-brand-lime" /> Medical Safety Setup
                    </h4>
                    <p className="text-xs text-white/50 leading-relaxed">
                      Your biological parameters are encrypted directly into the timing bib's RFID memory chips, allowing medical outposts to access details in emergency.
                    </p>

                    {/* Blood type */}
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">BLOOD TYPE CORPUS</label>
                      <div className="flex flex-wrap gap-2">
                        {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((bt) => (
                          <button
                            key={bt}
                            type="button"
                            onClick={() => setBloodType(bt)}
                            className={`px-4 py-2.5 rounded font-mono text-xs font-bold border transition-all ${
                              bloodType === bt
                                ? "bg-white text-black border-white"
                                : "bg-white/5 text-white/60 border-white/5 hover:border-white/10"
                            }`}
                          >
                            {bt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Emergency contact Name */}
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">EMERGENCY CONTACT FULL NAME</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
                        <input
                          type="text"
                          required
                          value={emergencyContact}
                          onChange={(e) => setEmergencyContact(e.target.value)}
                          placeholder="e.g. SARAH PACE (SPOUSE)"
                          className="w-full bg-white/3 border border-white/5 hover:border-white/10 focus:border-brand-orange focus:bg-white/5 rounded px-10 py-3 text-sm text-white outline-none transition-all placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    {/* Emergency Phone */}
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">EMERGENCY CONTACT PHONE</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
                        <input
                          type="tel"
                          required
                          value={emergencyPhone}
                          onChange={(e) => setEmergencyPhone(e.target.value)}
                          placeholder="+33 6 87 65 43 21"
                          className="w-full bg-white/3 border border-white/5 hover:border-white/10 focus:border-brand-orange focus:bg-white/5 rounded px-10 py-3 text-sm text-white outline-none transition-all placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    {/* Safety disclosure badge */}
                    <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-lg p-4 text-[11px] font-sans text-white/70 leading-relaxed flex items-start gap-2.5">
                      <AlertCircle className="w-4.5 h-4.5 text-brand-orange shrink-0 mt-0.5" />
                      <span>By completing registration, you confirm that you have read and agree to our general health declaration regulations and hold an active doctor-approved certificate of runner health.</span>
                    </div>
                  </div>

                  {/* Submission and back at bottom */}
                  <div className="border-t border-white/5 pt-6 flex justify-between items-center gap-4">
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="px-6 py-3.5 rounded border border-white/10 text-white hover:bg-white/5 font-display font-bold text-xs tracking-widest uppercase transition-all"
                    >
                      BACK
                    </button>
                    <button
                      type="submit"
                      className="bg-white text-black hover:bg-brand-orange font-display font-black text-xs tracking-widest px-8 py-3.5 rounded transition-all cursor-pointer"
                    >
                      PROCEED TO SECURE CORRAL
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: MOCK PAY TERMINAL */}
              {step === 3 && (
                <form onSubmit={handlePaymentSubmit} className="space-y-6 flex-grow">
                  <div className="space-y-6">
                    <h4 className="font-display font-bold text-sm text-white uppercase tracking-widest flex items-center gap-2">
                      <CreditCard className="w-4.5 h-4.5 text-brand-orange" /> Secure Payment Terminal
                    </h4>

                    {/* Credit Card Graphic Illustration */}
                    <div className="w-full h-48 rounded-2xl bg-gradient-to-tr from-brand-orange/80 via-brand-orange to-brand-lime/80 p-6 relative overflow-hidden shadow-2xl flex flex-col justify-between text-black select-none">
                      {/* Grid patterns */}
                      <div className="absolute inset-0 noise-overlay opacity-25" />
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-mono text-[9px] font-black uppercase opacity-60 tracking-wider">PARI RUN OFFICIAL GATEWAY</span>
                          <h4 className="font-display font-black text-base tracking-wider mt-1">2026 COMPETITOR PASS</h4>
                        </div>
                        <Sparkles className="w-6 h-6 text-black animate-spin-slow" />
                      </div>

                      <div>
                        {/* Dummy Card number */}
                        <div className="font-mono text-lg font-bold tracking-widest">
                          {cardNumber || "•••• •••• •••• ••••"}
                        </div>
                        <div className="flex justify-between items-end mt-4">
                          <div>
                            <span className="font-mono text-[8px] opacity-60 block uppercase">CARD HOLDER</span>
                            <span className="font-display font-extrabold text-xs tracking-widest uppercase">{cardName || "ALEXANDER PACE"}</span>
                          </div>
                          <div>
                            <span className="font-mono text-[8px] opacity-60 block uppercase">VALID THRU</span>
                            <span className="font-mono text-xs font-bold">{expiry || "MM/YY"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4">
                      {/* Name on card */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] text-white/40 uppercase tracking-widest block">CARDHOLDER NAME</label>
                        <input
                          type="text"
                          required
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="ALEXANDER PACE"
                          className="w-full bg-white/3 border border-white/5 hover:border-white/10 focus:border-brand-orange focus:bg-white/5 rounded px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/20 uppercase"
                        />
                      </div>

                      {/* Card number */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] text-white/40 uppercase tracking-widest block">CREDIT CARD NUMBER</label>
                        <input
                          type="text"
                          required
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => {
                            // Formatting CC spacing
                            const v = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
                            const matches = v.match(/\d{4,16}/g);
                            const match = (matches && matches[0]) || "";
                            const parts = [];
                            for (let i = 0, len = match.length; i < len; i += 4) {
                              parts.push(match.substring(i, i + 4));
                            }
                            if (parts.length > 0) {
                              setCardNumber(parts.join(" "));
                            } else {
                              setCardNumber(v);
                            }
                          }}
                          placeholder="4111 2222 3333 4444"
                          className="w-full bg-white/3 border border-white/5 hover:border-white/10 focus:border-brand-orange focus:bg-white/5 rounded px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/20"
                        />
                      </div>

                      {/* Expiry & CVV */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-mono text-[9px] text-white/40 uppercase tracking-widest block">EXPIRY DATE</label>
                          <input
                            type="text"
                            required
                            maxLength={5}
                            value={expiry}
                            onChange={(e) => {
                              let val = e.target.value.replace(/[^0-9]/g, "");
                              if (val.length >= 2) {
                                val = val.substring(0, 2) + "/" + val.substring(2, 4);
                              }
                              setExpiry(val);
                            }}
                            placeholder="MM/YY"
                            className="w-full bg-white/3 border border-white/5 hover:border-white/10 focus:border-brand-orange focus:bg-white/5 rounded px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/20"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-[9px] text-white/40 uppercase tracking-widest block">CVV CODE</label>
                          <input
                            type="password"
                            required
                            maxLength={3}
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
                            placeholder="•••"
                            className="w-full bg-white/3 border border-white/5 hover:border-white/10 focus:border-brand-orange focus:bg-white/5 rounded px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/20"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit checkout */}
                  <div className="border-t border-white/5 pt-6 flex justify-between items-center gap-4">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleBackStep}
                      className="px-6 py-3.5 rounded border border-white/10 text-white hover:bg-white/5 font-display font-bold text-xs tracking-widest uppercase transition-all disabled:opacity-50"
                    >
                      BACK
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-brand-lime hover:bg-white text-black font-display font-black text-xs tracking-widest px-8 py-3.5 rounded transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          SETTLING PASS...
                        </>
                      ) : (
                        <>
                          CONFIRM & PAY {getPrice()} PASS
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 4: INTERACTIVE DIGITAL ATHLETIC PASS (TICKET SUMMARY) */}
              {step === 4 && ticketData && (
                <div className="space-y-8 flex-grow">
                  
                  {/* Confetti success text */}
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-brand-lime/10 border border-brand-lime flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-6 h-6 text-brand-lime" />
                    </div>
                    <h4 className="font-display font-black text-xl text-white tracking-tight uppercase">REGISTRATION COMPLETED</h4>
                    <p className="text-xs text-white/50 font-sans mt-1">Your official pass has been generated. Screenshot or print below.</p>
                  </div>

                  {/* PREMIUM DIGITAL PASS BOX (Aesthetic layout with ticket punches) */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-luxury-grey/90 shadow-2xl relative">
                    <div className="absolute inset-0 noise-overlay opacity-35 pointer-events-none" />

                    {/* Side punch-outs */}
                    <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-luxury-black border-r border-white/10 z-20" />
                    <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-luxury-black border-l border-white/10 z-20" />

                    {/* Dynamic colored accent header bar */}
                    <div className={`h-2 w-full ${ticketData.category === "3k" ? "bg-brand-lime" : "bg-brand-orange"}`} />

                    {/* Ticket Header */}
                    <div className="p-6 border-b border-dashed border-white/10 flex justify-between items-center">
                      <div>
                        <span className="font-mono text-[8px] text-white/40 block">OFFICIAL EVENT ENTRANCE TICKET</span>
                        <h5 className="font-display font-black text-sm text-white tracking-wider">PARI RUN 2026</h5>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-[8px] text-brand-orange font-bold block">TICKET ID</span>
                        <span className="font-mono text-xs font-black text-white">{ticketData.ticketId}</span>
                      </div>
                    </div>

                    {/* Ticket Body (Upper half) */}
                    <div className="p-6 space-y-4">
                      <div>
                        <span className="font-mono text-[8px] text-white/40 block uppercase">COMPETITOR ATHELETE</span>
                        <h4 className="font-display font-extrabold text-base text-white tracking-wide uppercase mt-0.5">
                          {ticketData.fullName}
                        </h4>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="font-mono text-[8px] text-white/40 block uppercase">START CORRAL</span>
                          <span className={`font-mono text-sm font-black block ${ticketData.category === "3k" ? "text-brand-lime text-glow-lime" : "text-brand-orange text-glow-orange"}`}>
                            {ticketData.category === "3k" ? "3K - YELLOW GRID" : "5K - RED GRID"}
                          </span>
                        </div>
                        <div>
                          <span className="font-mono text-[8px] text-white/40 block uppercase">T-SHIRT SIZE</span>
                          <span className="font-mono text-sm font-black text-white">{ticketData.tShirtSize} Unisex</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
                        <div>
                          <span className="font-mono text-[8px] text-white/40 block uppercase">BLOOD CORPUS</span>
                          <span className="font-mono text-xs font-bold text-white">{ticketData.bloodType}</span>
                        </div>
                        <div>
                          <span className="font-mono text-[8px] text-white/40 block uppercase">EMERGENCY PHONE</span>
                          <span className="font-mono text-xs font-bold text-white">{ticketData.emergencyPhone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Ticket Footer (Bottom half) with barcode */}
                    <div className="p-6 border-t border-dashed border-white/10 bg-black/40 flex items-center justify-between gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/50">
                          <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                          <span>OCT 25, 2026 • 07:00 AM</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/50">
                          <MapPin className="w-3.5 h-3.5 text-brand-lime" />
                          <span>PLACE DE LA CONCORDE</span>
                        </div>
                      </div>

                      {/* Mock SVG Barcode */}
                      <div className="bg-white p-2 rounded flex items-center justify-center shrink-0">
                        <div className="flex flex-col items-center">
                          <QrCode className="w-12 h-12 text-black" />
                          <span className="font-mono text-[6px] text-black font-bold tracking-widest mt-1">PASS SCANNABLE</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Print & Download Triggers */}
                  <div className="flex gap-4">
                    <button
                      onClick={handlePrint}
                      className="flex-grow inline-flex items-center justify-center gap-2 py-3.5 bg-white text-black font-display font-black text-xs tracking-widest rounded uppercase cursor-pointer hover:bg-brand-lime transition-all"
                    >
                      <Download className="w-4 h-4" /> PRINT / DOWNLOAD PASS
                    </button>
                    
                    <button
                      onClick={() => {
                        resetForm();
                        onClose();
                      }}
                      className="px-6 py-3.5 border border-white/10 rounded font-display font-bold text-xs tracking-widest text-white uppercase hover:bg-white/5 transition-all"
                    >
                      FINISH
                    </button>
                  </div>

                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
