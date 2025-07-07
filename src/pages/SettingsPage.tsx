
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Settings } from 'lucide-react';

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(() => {
    return JSON.parse(localStorage.getItem('fame_user_data') || '{}');
  });

  const handleSave = () => {
    localStorage.setItem('fame_user_data', JSON.stringify(userData));
    toast({
      title: "Impostazioni salvate",
      description: "Le tue preferenze sono state aggiornate con successo."
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout effettuato",
      description: "A presto!"
    });
  };

  const updateUserData = (field: string, value: any) => {
    setUserData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Impostazioni</h1>
          <p className="text-muted-foreground">Gestisci il tuo profilo e le preferenze</p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-primary-gradient hover:opacity-90"
        >
          <Settings className="w-4 h-4 mr-2" />
          Salva Modifiche
        </Button>
      </div>

      {/* Profile Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informazioni Profilo</CardTitle>
          <CardDescription>
            Aggiorna i tuoi dati personali per calcoli più precisi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={user?.name || ''}
                disabled
                className="bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user?.email || ''}
                disabled
                className="bg-muted"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="age">Età</Label>
              <Input
                id="age"
                type="number"
                value={userData.age || ''}
                onChange={(e) => updateUserData('age', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={userData.weight || ''}
                onChange={(e) => updateUserData('weight', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="height">Altezza (cm)</Label>
              <Input
                id="height"
                type="number"
                value={userData.height || ''}
                onChange={(e) => updateUserData('height', parseInt(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sports & Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Sport e Obiettivi</CardTitle>
          <CardDescription>
            Configura la tua attività fisica e i tuoi obiettivi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sport-frequency">Frequenza sportiva (volte/settimana)</Label>
              <Input
                id="sport-frequency"
                type="number"
                min="0"
                max="7"
                value={userData.sportFrequency || ''}
                onChange={(e) => updateUserData('sportFrequency', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="goal">Obiettivo</Label>
              <Select
                value={userData.goal || ''}
                onValueChange={(value) => updateUserData('goal', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona obiettivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose_weight">Perdere peso</SelectItem>
                  <SelectItem value="gain_muscle">Aumentare massa muscolare</SelectItem>
                  <SelectItem value="maintain">Mantenere peso</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Alimentare</CardTitle>
          <CardDescription>
            Gestisci il tuo budget mensile per una pianificazione ottimale
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget">Budget mensile (€)</Label>
              <Input
                id="budget"
                type="number"
                min="50"
                max="2000"
                value={userData.monthlyBudget || ''}
                onChange={(e) => updateUserData('monthlyBudget', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="family-members">Membri famiglia</Label>
              <Input
                id="family-members"
                type="number"
                min="1"
                max="10"
                value={userData.familyMembers || ''}
                onChange={(e) => updateUserData('familyMembers', parseInt(e.target.value))}
              />
            </div>
          </div>
          
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium">
              Budget per persona: €{((userData.monthlyBudget || 0) / (userData.familyMembers || 1)).toFixed(2)}/mese
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Water Reminders */}
      <Card>
        <CardHeader>
          <CardTitle>Promemoria Acqua</CardTitle>
          <CardDescription>
            Configura i promemoria per mantenerti idratato
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="water-reminders">Attiva promemoria</Label>
              <p className="text-sm text-muted-foreground">
                Ricevi notifiche per ricordarti di bere acqua
              </p>
            </div>
            <Switch
              id="water-reminders"
              checked={userData.waterReminders || false}
              onCheckedChange={(checked) => updateUserData('waterReminders', checked)}
            />
          </div>

          {userData.waterReminders && (
            <div>
              <Label htmlFor="reminder-interval">Intervallo promemoria (ore)</Label>
              <Input
                id="reminder-interval"
                type="number"
                min="1"
                max="6"
                value={userData.reminderInterval || 2}
                onChange={(e) => updateUserData('reminderInterval', parseInt(e.target.value))}
                className="w-32"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Allergies */}
      <Card>
        <CardHeader>
          <CardTitle>Allergie e Intolleranze</CardTitle>
          <CardDescription>
            Gestisci le tue restrizioni alimentari
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {(userData.allergies || []).map((allergy: string, index: number) => (
              <Badge key={index} variant="secondary" className="cursor-pointer">
                {allergy} ×
              </Badge>
            ))}
          </div>
          {(userData.allergies || []).length === 0 && (
            <p className="text-sm text-muted-foreground">
              Nessuna allergia o intolleranza registrata
            </p>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Zona Pericolosa</CardTitle>
          <CardDescription>
            Azioni irreversibili per il tuo account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
