
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { OnboardingData } from '../OnboardingStepper';

interface PersonalInfoStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

export const PersonalInfoStep = ({ data, updateData }: PersonalInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium mb-3 block">Sesso</Label>
        <RadioGroup
          value={data.gender}
          onValueChange={(value) => updateData({ gender: value as 'male' | 'female' })}
          className="flex space-x-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Uomo</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Donna</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="age">Età</Label>
          <Input
            id="age"
            type="number"
            min="18"
            max="100"
            value={data.age}
            onChange={(e) => updateData({ age: parseInt(e.target.value) || 0 })}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="weight">Peso (kg)</Label>
          <Input
            id="weight"
            type="number"
            min="30"
            max="200"
            value={data.weight}
            onChange={(e) => updateData({ weight: parseInt(e.target.value) || 0 })}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="height">Altezza (cm)</Label>
          <Input
            id="height"
            type="number"
            min="120"
            max="220"
            value={data.height}
            onChange={(e) => updateData({ height: parseInt(e.target.value) || 0 })}
            className="mt-1"
          />
        </div>
      </div>

      <div className="p-4 bg-food-green-light rounded-lg">
        <p className="text-sm text-muted-foreground">
          Questi dati ci aiutano a calcolare il tuo fabbisogno calorico personalizzato
          e a creare piani alimentari specifici per i tuoi obiettivi.
        </p>
      </div>
    </div>
  );
};
