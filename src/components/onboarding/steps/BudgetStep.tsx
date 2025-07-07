
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { OnboardingData } from '../OnboardingStepper';

interface BudgetStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

const budgetRanges = [
  { value: 150, label: 'Economico', description: 'Fino a €150/mese', color: 'text-food-green' },
  { value: 300, label: 'Medio', description: '€150-300/mese', color: 'text-food-orange' },
  { value: 500, label: 'Elevato', description: '€300-500/mese', color: 'text-food-red' },
  { value: 750, label: 'Premium', description: 'Oltre €500/mese', color: 'text-purple-600' },
];

export const BudgetStep = ({ data, updateData }: BudgetStepProps) => {
  const selectedRange = budgetRanges.find(range => range.value >= data.monthlyBudget) || budgetRanges[0];

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium mb-3 block">
          Qual è il tuo budget mensile per l'alimentazione?
        </Label>
        <RadioGroup
          value={data.monthlyBudget.toString()}
          onValueChange={(value) => updateData({ monthlyBudget: parseInt(value) })}
          className="space-y-3"
        >
          {budgetRanges.map((range) => (
            <div key={range.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
              <RadioGroupItem value={range.value.toString()} id={range.value.toString()} />
              <div className="flex-1">
                <Label htmlFor={range.value.toString()} className="font-medium">
                  {range.label}
                </Label>
                <p className="text-sm text-muted-foreground">{range.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="custom-budget" className="text-base font-medium">
          Oppure inserisci un importo personalizzato
        </Label>
        <div className="mt-2 flex items-center space-x-2">
          <span className="text-lg">€</span>
          <Input
            id="custom-budget"
            type="number"
            min="50"
            max="2000"
            value={data.monthlyBudget}
            onChange={(e) => updateData({ monthlyBudget: parseInt(e.target.value) || 0 })}
            className="w-32"
          />
          <span className="text-sm text-muted-foreground">al mese</span>
        </div>
      </div>

      <div className="p-4 bg-food-green-light rounded-lg">
        <h4 className="font-medium mb-2">Come utilizziamo il budget</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Suggerimenti di ingredienti in base alla fascia di prezzo</li>
          <li>• Ricette ottimizzate per il rapporto qualità-prezzo</li>
          <li>• Consigli per gli acquisti di stagione</li>
          <li>• Alternative economiche per ingredienti costosi</li>
        </ul>
      </div>

      <div className="text-center p-4 bg-muted rounded-lg">
        <p className="text-sm font-medium">
          Budget selezionato: <span className={selectedRange.color}>€{data.monthlyBudget}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Per {data.familyMembers} {data.familyMembers === 1 ? 'persona' : 'persone'}
        </p>
      </div>
    </div>
  );
};
