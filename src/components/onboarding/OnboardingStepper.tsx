
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { SportsStep } from './steps/SportsStep';
import { DietaryStep } from './steps/DietaryStep';
import { PreferencesStep } from './steps/PreferencesStep';
import { BudgetStep } from './steps/BudgetStep';
import { ReminderStep } from './steps/ReminderStep';

export interface OnboardingData {
  // Personal info
  gender: 'male' | 'female' | '';
  age: number;
  weight: number;
  height: number;
  
  // Sports
  sportType: string;
  sportFrequency: number;
  
  // Dietary
  allergies: string[];
  goal: 'lose_weight' | 'gain_muscle' | 'maintain' | '';
  meals: string[];
  familyMembers: number;
  
  // Budget
  monthlyBudget: number;
  
  // Reminders
  waterReminders: boolean;
  reminderInterval: number;
}

const initialData: OnboardingData = {
  gender: '',
  age: 25,
  weight: 70,
  height: 170,
  sportType: '',
  sportFrequency: 3,
  allergies: [],
  goal: '',
  meals: [],
  familyMembers: 1,
  monthlyBudget: 300,
  waterReminders: false,
  reminderInterval: 2
};

interface OnboardingStepperProps {
  onComplete: () => void;
}

export const OnboardingStepper = ({ onComplete }: OnboardingStepperProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(initialData);

  const steps = [
    { title: 'Informazioni Personali', component: PersonalInfoStep },
    { title: 'Attività Sportiva', component: SportsStep },
    { title: 'Preferenze Alimentari', component: DietaryStep },
    { title: 'Obiettivi e Famiglia', component: PreferencesStep },
    { title: 'Budget Alimentare', component: BudgetStep },
    { title: 'Promemoria Acqua', component: ReminderStep },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save data and complete onboarding
      localStorage.setItem('fame_user_data', JSON.stringify(data));
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (stepData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...stepData }));
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Benvenuto in FAME
        </h1>
        <p className="text-muted-foreground">
          Configura il tuo profilo per ricevere piani alimentari personalizzati
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-lg">{steps[currentStep].title}</CardTitle>
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} di {steps.length}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        
        <CardContent>
          <CurrentStepComponent data={data} updateData={updateData} />
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Indietro
        </Button>
        
        <Button
          onClick={handleNext}
          className="bg-primary-gradient hover:opacity-90"
        >
          {currentStep === steps.length - 1 ? 'Completa' : 'Avanti'}
        </Button>
      </div>
    </div>
  );
};
