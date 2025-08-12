import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const StepIndicator = ({
  currentStep,
  totalSteps,
  stepTitles,
  onStepClick,
}) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                index < currentStep
                  ? 'bg-green-500 text-white'
                  : index === currentStep
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
              onClick={() => onStepClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {index < currentStep ? (
                <Check size={20} />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </motion.div>
            <span className="text-xs mt-2 text-center text-gray-600 hidden sm:block">
              {stepTitles[index]}
            </span>
            {index < totalSteps - 1 && (
              <div
                className={`hidden sm:block absolute h-0.5 mt-5 transition-all duration-300 ${
                  index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
                style={{
                  width: `calc(100% / ${totalSteps} - 2.5rem)`,
                  left: `calc(${((index + 1) / totalSteps) * 100}% - ${
                    (1 / totalSteps) * 50
                  }%)`,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};