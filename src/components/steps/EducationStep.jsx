import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FormInput } from '../FormInput';

export const EducationStep = ({
  data,
  onUpdate,
  onNext,
  onPrev,
}) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.degree.trim()) newErrors.degree = 'Degree is required';
    if (!formData.college.trim()) newErrors.college = 'College/University is required';
    if (!formData.cgpa.trim()) {
      newErrors.cgpa = 'CGPA/GPA is required';
    } else if (isNaN(Number(formData.cgpa)) || Number(formData.cgpa) < 0 || Number(formData.cgpa) > 10) {
      newErrors.cgpa = 'Please enter a valid CGPA (0-10)';
    }
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Education</h2>
        <p className="text-gray-600">Tell us about your educational background</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Degree"
          value={formData.degree}
          onChange={(value) => setFormData(prev => ({ ...prev, degree: value }))}
          error={errors.degree}
          placeholder="Bachelor of Technology in Computer Science"
          required
        />
        <FormInput
          label="College/University"
          value={formData.college}
          onChange={(value) => setFormData(prev => ({ ...prev, college: value }))}
          error={errors.college}
          placeholder="ABC University"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormInput
          label="CGPA/GPA"
          value={formData.cgpa}
          onChange={(value) => setFormData(prev => ({ ...prev, cgpa: value }))}
          error={errors.cgpa}
          placeholder="8.5"
          required
        />
        <FormInput
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={(value) => setFormData(prev => ({ ...prev, startDate: value }))}
          error={errors.startDate}
          required
        />
        <FormInput
          label="End Date"
          type="date"
          value={formData.endDate}
          onChange={(value) => setFormData(prev => ({ ...prev, endDate: value }))}
          error={errors.endDate}
          required
        />
      </div>

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
          onClick={handleNext}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Next Step
        </motion.button>
      </div>
    </motion.div>
  );
};