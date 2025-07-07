
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { OnboardingData } from '../OnboardingStepper';

interface ReminderStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

export const ReminderStep = ({ data, updateData }: ReminderStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">💧</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">Promemoria Idratazione</h3>
        <p className="text-muted-foreground">
          Rimanere idratati è fondamentale per il benessere e il raggiungimento dei tuoi obiettivi
        </p>
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <Label htmlFor="water-reminders" className="text-base font-medium">
            Attiva promemoria acqua
          </Label>
          <p className="text-sm text-muted-foreground">
            Ricevi notifiche per ricordarti di bere acqua
          </p>
        </div>
        <Switch
          id="water-reminders"
          checked={data.waterReminders}
          onCheckedChange={(checked) => updateData({ waterReminders: checked })}
        />
      </div>

      {data.waterReminders && (
        <div className="animate-fade-in">
          <Label htmlFor="reminder-interval" className="text-base font-medium">
            Frequenza promemoria
          </Label>
          <div className="mt-2 flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Ogni</span>
            <Input
              id="reminder-interval"
              type="number"
              min="1"
              max="6"
              value={data.reminderInterval}
              onChange={(e) => updateData({ reminderInterval: parseInt(e.target.value) || 2 })}
              className="w-20"
            />
            <span className="text-sm text-muted-foreground">
              {data.reminderInterval === 1 ? 'ora' : 'ore'}
            </span>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Esempio:</strong> Riceverai una notifica ogni {data.reminderInterval} {data.reminderInterval === 1 ? 'ora' : 'ore'} 
              dalle 8:00 alle 22:00 per ricordarti di bere acqua.
            </p>
          </div>
        </div>
      )}

      <div className="p-4 bg-food-green-light rounded-lg">
        <h4 className="font-medium mb-2">Benefici dell'idratazione</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Migliora le performance sportive</li>
          <li>• Supporta il metabolismo</li>
          <li>• Favorisce la digestione</li>
          <li>• Aumenta i livelli di energia</li>
          <li>• Mantiene la pelle sana</li>
        </ul>
      </div>

      <div className="text-center p-4 bg-muted rounded-lg">
        <p className="text-sm font-medium">
          {data.waterReminders 
            ? `Promemoria attivati ogni ${data.reminderInterval} ${data.reminderInterval === 1 ? 'ora' : 'ore'}`
            : 'Promemoria disattivati'
          }
        </p>
      </div>
    </div>
  );
};
