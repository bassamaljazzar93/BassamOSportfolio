
import React, { useState } from 'react';
import { Send, Linkedin, Mail, Phone, ExternalLink } from 'lucide-react';

const ContactApp: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', message: '' }); }, 3000);
  };

  return (
    <div className="h-full bg-white text-gray-900 flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 bg-[#f5f5f5] p-8 border-r border-gray-200">
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">Contact</h2>
        <div className="space-y-6">
          <a href="mailto:b_aljazzar@yahoo.com" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 transition"><Mail size={20} /></div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase">Email</p>
              <p className="font-bold">b_aljazzar@yahoo.com</p>
            </div>
          </a>
          <a href="tel:+971566113381" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition"><Phone size={20} /></div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase">Phone</p>
              <p className="font-bold">+971 56 611 3381</p>
            </div>
          </a>
          <a href="https://linkedin.com/in/bassam-aljazzar" target="_blank" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition"><Linkedin size={20} /></div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase">LinkedIn</p>
              <p className="font-bold">bassam-aljazzar</p>
            </div>
          </a>
        </div>
      </div>
      <div className="flex-1 p-8">
        {sent ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4"><Send size={32} /></div>
            <h3 className="text-xl font-black uppercase">Message Sent!</h3>
            <p className="text-gray-500">I will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400">Name</label>
              <input required className="w-full px-4 py-2 bg-gray-100 rounded border-transparent focus:border-orange-500 outline-none transition" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400">Email</label>
              <input required type="email" className="w-full px-4 py-2 bg-gray-100 rounded border-transparent focus:border-orange-500 outline-none transition" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400">Message</label>
              <textarea required rows={4} className="w-full px-4 py-2 bg-gray-100 rounded border-transparent focus:border-orange-500 outline-none transition" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
            </div>
            <button type="submit" className="w-full py-3 ubuntu-orange text-white font-black uppercase tracking-widest rounded shadow-lg hover:brightness-110 transition">Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactApp;
