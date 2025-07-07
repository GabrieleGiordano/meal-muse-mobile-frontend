
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OnboardingData } from '../OnboardingStepper';

interface SportsStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

const sportTypes = [
  { value: 'running', label: 'Corsa' },
  { value: 'cycling', label: 'Ciclismo' },
  { value: 'swimming', label: 'Nuoto' },
  { value: 'gym', label: 'Palestra' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'football', label: 'Calcio' },
  { value: 'basketball', label: 'Basket' },
  { value: 'tennis', label: 'Tennis' },
  { value: 'martial_arts', label: 'Arti Marziali' },
  { value: 'dancing', label: 'Danza' },
  { value: 'none', label: 'Nessuna attività' },
];

export const SportsStep = ({ data, updateData }: SportsStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="sport-type" className="text-base font-medium">
          Che tipo di sport pratichi principalmente?
        </Label>
        <Select
          value={data.sportType}
          onValueChange={(value) => updateData({ sportType: value })}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Seleziona uno sport" />
          </SelectTrigger>
          <SelectContent>
            {sportTypes.map((sport) => (
              <SelectItem key={sport.value} value={sport.value}>
                {sport.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {data.sportType && data.sportType !== 'none' && (
        <div>
          <Label htmlFor="sport-frequency" className="text-base font-medium">
            Quante volte alla settimana pratichi sport?
          </Label>
          <div className="mt-2 flex items-center space-x-4">
            <Input
              id="sport-frequency"
              type="number"
              min="1"
              max="7"
              value={data.sportFrequency}
              onChange={(e) => updateData({ sportFrequency: parseInt(e.target.value) || 1 })}
              className="w-20"
            />
            <span className="text-sm text-muted-foreground">
              volte a settimana
            </span>
          </div>
        </div>
      )}

      <div className="p-4 bg-food-orange-light rounded-lg">
        <h4 className="font-medium mb-2">Perché è importante?</h4>
        <p className="text-sm text-muted-foreground">
          La frequenza e il tipo di attività sportiva influenzano il tuo fabbisogno calorico
          e la distribuzione dei macronutrienti. Questo ci permette di creare piani alimentari
          che supportano al meglio le tue performance e il recupero.
        </p>
      </div>
    </div>
  );
};
