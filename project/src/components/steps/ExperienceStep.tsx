import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X } from 'lucide-react';
import { Experience } from '../../types/resume';
import { FormInput } from '../FormInput';

interface ExperienceStepProps {
  data: Experience[];
  onUpdate: (data: Experience[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ExperienceStep: React.FC<ExperienceStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrev,
}) => {
  const [experiences, setExperiences] = useState(data);
  const [newResponsibility, setNewResponsibility] = useState<{[key: string]: string}>({});

  useEffect(() => {
    onUpdate(experiences);
  }, [experiences, onUpdate]);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      role: '',
      company: '',
      startDate: '',
      endDate: '',
      responsibilities: [],
    };
    setExperiences(prev => [...prev, newExperience]);
  };

  const removeExperience = (id: string) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(prev =>
      prev.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const addResponsibility = (expId: string, responsibility: string) => {
    if (responsibility.trim()) {
      const exp = experiences.find(e => e.id === expId);
      if (exp) {
        updateExperience(expId, 'responsibilities', [...exp.responsibilities, responsibility.trim()]);
        setNewResponsibility(prev => ({ ...prev, [expId]: '' }));
      }
    }
  };

  const removeResponsibility = (expId: string, index: number) => {
    const exp = experiences.find(e => e.id === expId);
    if (exp) {
      updateExperience(
        expId,
        'responsibilities',
        exp.responsibilities.filter((_, i) => i !== index)
      );
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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Experience</h2>
        <p className="text-gray-600">Add your work experience, internships, and relevant positions</p>
      </div>

      <AnimatePresence>
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Experience {index + 1}
              </h3>
              <button
                onClick={() => removeExperience(experience.id)}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Role/Position"
                  value={experience.role}
                  onChange={(value) => updateExperience(experience.id, 'role', value)}
                  placeholder="Software Engineering Intern"
                  required
                />
                <FormInput
                  label="Company"
                  value={experience.company}
                  onChange={(value) => updateExperience(experience.id, 'company', value)}
                  placeholder="Tech Corp Inc."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Start Date"
                  type="date"
                  value={experience.startDate}
                  onChange={(value) => updateExperience(experience.id, 'startDate', value)}
                  required
                />
                <FormInput
                  label="End Date"
                  type="date"
                  value={experience.endDate}
                  onChange={(value) => updateExperience(experience.id, 'endDate', value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Responsibilities
                </label>
                <div className="space-y-2 mb-3">
                  {experience.responsibilities.map((responsibility, respIndex) => (
                    <div
                      key={respIndex}
                      className="flex items-start gap-2 p-3 bg-white rounded-lg border"
                    >
                      <span className="flex-1 text-sm">{responsibility}</span>
                      <button
                        onClick={() => removeResponsibility(experience.id, respIndex)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newResponsibility[experience.id] || ''}
                    onChange={(e) => setNewResponsibility(prev => ({
                      ...prev,
                      [experience.id]: e.target.value
                    }))}
                    placeholder="Describe a key responsibility or achievement..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addResponsibility(experience.id, newResponsibility[experience.id] || '');
                      }
                    }}
                  />
                  <button
                    onClick={() => addResponsibility(experience.id, newResponsibility[experience.id] || '')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.button
        onClick={addExperience}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus size={20} />
        Add Experience
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
          onClick={onNext}
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