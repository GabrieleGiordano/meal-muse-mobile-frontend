
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { SportsStep } from './steps/SportsStep';
import { DietaryStep } from './steps/DietaryStep';
import { PreferencesStep } from './steps/PreferencesStep';
import { BudgetStep } from './steps/BudgetStep';
import { ReminderStep } from './steps/ReminderStep';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

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
  isEditing?: boolean;
}

export const OnboardingStepper = ({ onComplete, isEditing = false }: OnboardingStepperProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  const steps = [
    { title: 'Informazioni Personali', component: PersonalInfoStep },
    { title: 'Attività Sportiva', component: SportsStep },
    { title: 'Preferenze Alimentari', component: DietaryStep },
    { title: 'Obiettivi e Famiglia', component: PreferencesStep },
    { title: 'Budget Alimentare', component: BudgetStep },
    { title: 'Promemoria Acqua', component: ReminderStep },
  ];

  // Load existing data if editing
  useEffect(() => {
    if (isEditing && user) {
      loadExistingData();
    }
  }, [isEditing, user]);

  const loadExistingData = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data: userData, error } = await supabase
        .from('user_data')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading user data:', error);
        return;
      }

      if (userData) {
        setData({
          gender: userData.gender || '',
          age: userData.age || 25,
          weight: userData.weight || 70,
          height: userData.height || 170,
          sportType: userData.sport_type || '',
          sportFrequency: userData.sport_frequency || 3,
          allergies: userData.allergies || [],
          goal: userData.goal || '',
          meals: userData.meals || [],
          familyMembers: userData.family_members || 1,
          monthlyBudget: userData.monthly_budget || 300,
          waterReminders: userData.water_reminders || false,
          reminderInterval: userData.reminder_interval || 2
        });
      }
    } catch (error) {
      console.error('Error loading existing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;

  const saveDataToDatabase = async () => {
    if (!user) return false;

    try {
      const userData = {
        user_id: user.id,
        gender: data.gender || null,
        age: data.age,
        weight: data.weight,
        height: data.height,
        sport_type: data.sportType || null,
        sport_frequency: data.sportFrequency,
        allergies: data.allergies,
        goal: data.goal || null,
        meals: data.meals,
        family_members: data.familyMembers,
        monthly_budget: data.monthlyBudget,
        water_reminders: data.waterReminders,
        reminder_interval: data.reminderInterval
      };

      const { error } = await supabase
        .from('user_data')
        .upsert(userData, { onConflict: 'user_id' });

      if (error) {
        console.error('Error saving user data:', error);
        toast({
          title: "Errore",
          description: "Errore durante il salvataggio dei dati. Riprova.",
          variant: "destructive"
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in saveDataToDatabase:', error);
      toast({
        title: "Errore",
        description: "Errore durante il salvataggio. Riprova.",
        variant: "destructive"
      });
      return false;
    }
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      setIsSaving(true);
      const success = await saveDataToDatabase();
      
      if (success) {
        toast({
          title: "Complimenti!",
          description: isEditing ? "Dati aggiornati con successo!" : "Onboarding completato con successo!"
        });
        onComplete();
      }
      setIsSaving(false);
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

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Caricamento dati...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {isEditing ? 'Modifica il tuo Profilo' : 'Benvenuto in FAME'}
        </h1>
        <p className="text-muted-foreground">
          {isEditing 
            ? 'Aggiorna le tue informazioni per migliorare i tuoi piani alimentari'
            : 'Configura il tuo profilo per ricevere piani alimentari personalizzati'
          }
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
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Indietro
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={isSaving}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          {isSaving ? 'Salvataggio...' : (currentStep === steps.length - 1 ? (isEditing ? 'Salva Modifiche' : 'Completa') : 'Avanti')}
        </Button>
      </div>
    </div>
  );
};
