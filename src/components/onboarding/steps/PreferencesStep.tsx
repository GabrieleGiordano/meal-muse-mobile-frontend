
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { OnboardingData } from '../OnboardingStepper';

interface PreferencesStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

export const PreferencesStep = ({ data, updateData }: PreferencesStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium mb-3 block">
          Qual è il tuo obiettivo principale?
        </Label>
        <RadioGroup
          value={data.goal}
          onValueChange={(value) => updateData({ goal: value as OnboardingData['goal'] })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
            <RadioGroupItem value="lose_weight" id="lose_weight" />
            <div>
              <Label htmlFor="lose_weight" className="font-medium">Perdere peso</Label>
              <p className="text-sm text-muted-foreground">Ridurre la massa grassa mantenendo i muscoli</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
            <RadioGroupItem value="gain_muscle" id="gain_muscle" />
            <div>
              <Label htmlFor="gain_muscle" className="font-medium">Aumentare massa muscolare</Label>
              <p className="text-sm text-muted-foreground">Costruire muscoli e aumentare la forza</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
            <RadioGroupItem value="maintain" id="maintain" />
            <div>
              <Label htmlFor="maintain" className="font-medium">Mantenere il peso</Label>
              <p className="text-sm text-muted-foreground">Alimentazione equilibrata per il benessere generale</p>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="family-members" className="text-base font-medium">
          Per quante persone cucini abitualmente?
        </Label>
        <div className="mt-2 flex items-center space-x-4">
          <Input
            id="family-members"
            type="number"
            min="1"
            max="10"
            value={data.familyMembers}
            onChange={(e) => updateData({ familyMembers: parseInt(e.target.value) || 1 })}
            className="w-20"
          />
          <span className="text-sm text-muted-foreground">
            {data.familyMembers === 1 ? 'persona' : 'persone'}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Questo ci aiuta a calcolare le giuste quantità per le ricette
        </p>
      </div>

      <div className="p-4 bg-food-orange-light rounded-lg">
        <h4 className="font-medium mb-2">Personalizzazione avanzata</h4>
        <p className="text-sm text-muted-foreground">
          I tuoi obiettivi influenzano la distribuzione calorica e dei macronutrienti.
          Il numero di persone ci permette di scalare automaticamente le ricette.
        </p>
      </div>
    </div>
  );
};
