import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Categories() {
  const [message, setMessage] = useState('');

  const showMessage = () => {
    setMessage('Awaiting app updates to this section!');
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div className="pt-24 p-4">
      <button className="bg-blue-500 text-white rounded-md px-4 py-2 font-normal" type="button" onClick={showMessage}>CHECK STATUS</button>
      {message && (
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="w-full p-8 bg-green-600 rounded-md text-white font-medium mt-4 font-montserrat"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
