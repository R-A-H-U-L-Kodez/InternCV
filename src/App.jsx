import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';
import { useResumeData } from './hooks/useResumeData';
import { StepIndicator } from './components/StepIndicator';
import { PersonalInfoStep } from './components/steps/PersonalInfoStep';
import { ObjectiveStep } from './components/steps/ObjectiveStep';
import { EducationStep } from './components/steps/EducationStep';
import { ProjectsStep } from './components/steps/ProjectsStep';
import { ExperienceStep } from './components/steps/ExperienceStep';
import { SkillsStep } from './components/steps/SkillsStep';
import { CertificationsStep } from './components/steps/CertificationsStep';
import { LoadingModal } from './components/LoadingModal';

const STEP_TITLES = [
  'Personal Info',
  'Objective',
  'Education',
  'Projects',
  'Experience',
  'Skills',
  'Certifications',
];

export default function App() {
  const {
    resumeData,
    currentStep,
    updatePersonalInfo,
    updateObjective,
    updateEducation,
    updateProjects,
    updateExperience,
    updateSkills,
    updateCertifications,
    nextStep,
    prevStep,
    goToStep,
  } = useResumeData();

  const [modalStatus, setModalStatus] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);

  const handleSubmit = async () => {
    setModalStatus('generating');
    
    try {
      const response = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      });

      if (response.ok) {
        const blob = await response.blob();
        setPdfBlob(blob);
        setModalStatus('success');
      } else {
        setModalStatus('error');
      }
    } catch (error) {
      console.error('Error generating resume:', error);
      setModalStatus('error');
    }
  };

  const handleDownload = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep
            data={resumeData.personalInfo}
            onUpdate={updatePersonalInfo}
            onNext={nextStep}
          />
        );
      case 1:
        return (
          <ObjectiveStep
            data={resumeData.objective}
            onUpdate={updateObjective}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 2:
        return (
          <EducationStep
            data={resumeData.education}
            onUpdate={updateEducation}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <ProjectsStep
            data={resumeData.projects}
            onUpdate={updateProjects}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <ExperienceStep
            data={resumeData.experience}
            onUpdate={updateExperience}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <SkillsStep
            data={resumeData.skills}
            onUpdate={updateSkills}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 6:
        return (
          <CertificationsStep
            data={resumeData.certifications}
            onUpdate={updateCertifications}
            onSubmit={handleSubmit}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText size={40} className="text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">InternCV</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Create your professional ATS-optimized resume in minutes
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <StepIndicator
              currentStep={currentStep}
              totalSteps={STEP_TITLES.length}
              stepTitles={STEP_TITLES}
              onStepClick={goToStep}
            />

            <AnimatePresence mode="wait">
              <div key={currentStep}>
                {renderCurrentStep()}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <LoadingModal
        isOpen={modalStatus !== null}
        status={modalStatus || 'generating'}
        onDownload={handleDownload}
        onClose={() => setModalStatus(null)}
      />
    </div>
  );
}