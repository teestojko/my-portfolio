import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const ContactSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="section contact-section min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6">
      <motion.h1
        className="contact-title text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Contact
      </motion.h1>

      <motion.div
        className="contact-mail flex items-center space-x-3 bg-gray-800 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
      >
        <Mail className="w-6 h-6 text-indigo-400" />
        <p className="text-lg">Email: **************@gmail.com</p>
      </motion.div>
    </div>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;
