import { useState } from 'react';

export function useStory(totalSteps: number = 4) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const openStoryMode = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  const closeStoryMode = () => {
    setIsOpen(false);
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      closeStoryMode();
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  return {
    isOpen,
    currentStep,
    openStoryMode,
    closeStoryMode,
    nextStep,
    prevStep
  };
}
