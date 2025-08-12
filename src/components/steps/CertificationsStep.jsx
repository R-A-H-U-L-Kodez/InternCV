import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { FormInput } from '../FormInput';

export const CertificationsStep = ({
  data,
  onUpdate,
  onSubmit,
  onPrev,
}) => {
  const [certifications, setCertifications] = useState(data);

  useEffect(() => {
    onUpdate(certifications);
  }, [certifications, onUpdate]);

  const addCertification = () => {
    const newCertification = {
      id: Date.now().toString(),
      name: '',
      institution: '',
      year: '',
    };
    setCertifications(prev => [...prev, newCertification]);
  };

  const removeCertification = (id) => {
    setCertifications(prev => prev.filter(cert => cert.id !== id));
  };

  const updateCertification = (id, field, value) => {
    setCertifications(prev =>
      prev.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Certifications</h2>
        <p className="text-gray-600">Add any relevant certifications or courses you've completed</p>
      </div>

      <AnimatePresence>
        {certifications.map((certification, index) => (
          <motion.div
            key={certification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Certification {index + 1}
              </h3>
              <button
                onClick={() => removeCertification(certification.id)}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormInput
                label="Certification Name"
                value={certification.name}
                onChange={(value) => updateCertification(certification.id, 'name', value)}
                placeholder="AWS Certified Developer"
              />
              <FormInput
                label="Institution/Provider"
                value={certification.institution}
                onChange={(value) => updateCertification(certification.id, 'institution', value)}
                placeholder="Amazon Web Services"
              />
              <FormInput
                label="Year Obtained"
                value={certification.year}
                onChange={(value) => updateCertification(certification.id, 'year', value)}
                placeholder="2023"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.button
        onClick={addCertification}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus size={20} />
        Add Certification
      </motion.button>

      <div className="flex justify-between">
        <motion.button
          onClick={onPrev}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Previous
        </motion.button>
        <motion.button
          onClick={onSubmit}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Generate Resume
        </motion.button>
      </div>
    </motion.div>
  );
};