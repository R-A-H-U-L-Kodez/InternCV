import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, Download } from 'lucide-react';

interface LoadingModalProps {
  isOpen: boolean;
  status: 'generating' | 'success' | 'error';
  onDownload?: () => void;
  onClose?: () => void;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({
  isOpen,
  status,
  onDownload,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4"
      >
        {status === 'generating' && (
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              <FileText size={48} className="text-blue-600" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Generating Your Resume
            </h3>
            <p className="text-gray-600">
              Please wait while we create your ATS-optimized resume...
            </p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-blue-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <CheckCircle size={48} className="text-green-600" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Resume Generated Successfully!
            </h3>
            <p className="text-gray-600 mb-6">
              Your ATS-optimized resume is ready for download.
            </p>
            <div className="flex gap-3 justify-center">
              <motion.button
                onClick={onDownload}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={20} />
                Download Resume
              </motion.button>
              <motion.button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="inline-block mb-4">
              <FileText size={48} className="text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Generation Failed
            </h3>
            <p className="text-gray-600 mb-6">
              There was an error generating your resume. Please try again.
            </p>
            <motion.button
              onClick={onClose}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
};