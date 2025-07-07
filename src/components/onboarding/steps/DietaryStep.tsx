
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { OnboardingData } from '../OnboardingStepper';

interface DietaryStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

const commonAllergies = [
  'Glutine', 'Lattosio', 'Uova', 'Pesce', 'Crostacei', 'Frutta secca',
  'Soia', 'Sesamo', 'Arachidi', 'Pomodori'
];

const mealTypes = [
  { id: 'breakfast', label: 'Colazione' },
  { id: 'lunch', label: 'Pranzo' },
  { id: 'snack', label: 'Merenda' },
  { id: 'dinner', label: 'Cena' },
];

export const DietaryStep = ({ data, updateData }: DietaryStepProps) => {
  const [customAllergy, setCustomAllergy] = useState('');

  const handleAllergyToggle = (allergy: string) => {
    const updated = data.allergies.includes(allergy)
      ? data.allergies.filter(a => a !== allergy)
      : [...data.allergies, allergy];
    updateData({ allergies: updated });
  };

  const addCustomAllergy = () => {
    if (customAllergy.trim() && !data.allergies.includes(customAllergy.trim())) {
      updateData({ allergies: [...data.allergies, customAllergy.trim()] });
      setCustomAllergy('');
    }
  };

  const handleMealToggle = (mealId: string) => {
    const updated = data.meals.includes(mealId)
      ? data.meals.filter(m => m !== mealId)
      : [...data.meals, mealId];
    updateData({ meals: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium mb-3 block">
          Hai allergie o intolleranze alimentari?
        </Label>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {commonAllergies.map((allergy) => (
            <div key={allergy} className="flex items-center space-x-2">
              <Checkbox
                id={allergy}
                checked={data.allergies.includes(allergy)}
                onCheckedChange={() => handleAllergyToggle(allergy)}
              />
              <Label htmlFor={allergy} className="text-sm">{allergy}</Label>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            placeholder="Altra allergia/intolleranza..."
            value={customAllergy}
            onChange={(e) => setCustomAllergy(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomAllergy()}
          />
          <Button
            type="button"
            variant="outline"
            onClick={addCustomAllergy}
            disabled={!customAllergy.trim()}
          >
            Aggiungi
          </Button>
        </div>
        
        {data.allergies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {data.allergies.map((allergy) => (
              <Badge
                key={allergy}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => handleAllergyToggle(allergy)}
              >
                {allergy} ×
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">
          Quali pasti vuoi includere nel tuo piano?
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {mealTypes.map((meal) => (
            <div key={meal.id} className="flex items-center space-x-2">
              <Checkbox
                id={meal.id}
                checked={data.meals.includes(meal.id)}
                onCheckedChange={() => handleMealToggle(meal.id)}
              />
              <Label htmlFor={meal.id} className="text-sm">{meal.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-food-green-light rounded-lg">
        <p className="text-sm text-muted-foreground">
          Le tue preferenze alimentari ci aiutano a creare menu sicuri e personalizzati,
          evitando ingredienti che potrebbero causarti problemi.
        </p>
      </div>
    </div>
  );
};
