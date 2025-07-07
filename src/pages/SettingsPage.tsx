
import { useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { OnboardingStepper } from '@/components/onboarding/OnboardingStepper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { Settings, User, Edit } from 'lucide-react';

const SettingsPage = () => {
  const { user, userProfile, logout, updateProfile } = useAuth();
  const [showOnboardingEditor, setShowOnboardingEditor] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: userProfile?.full_name || '',
    email: userProfile?.email || ''
  });

  const handleProfileUpdate = async () => {
    try {
      await updateProfile({
        full_name: profileData.full_name,
        email: profileData.email
      });
      
      toast({
        title: "Profilo aggiornato",
        description: "Le informazioni del profilo sono state aggiornate con successo."
      });
      
      setIsEditingProfile(false);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Errore durante l'aggiornamento del profilo.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logout effettuato",
      description: "A presto!"
    });
  };

  const handleOnboardingComplete = () => {
    setShowOnboardingEditor(false);
    toast({
      title: "Dati aggiornati",
      description: "Le tue informazioni sono state aggiornate con successo!"
    });
  };

  if (showOnboardingEditor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-food-green-light to-food-orange-light">
        <div className="container mx-auto p-4 max-w-2xl">
          <Button
            variant="outline"
            onClick={() => setShowOnboardingEditor(false)}
            className="mb-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            ← Torna alle Impostazioni
          </Button>
          <OnboardingStepper 
            onComplete={handleOnboardingComplete}
            isEditing={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Impostazioni</h1>
          <p className="text-muted-foreground">Gestisci il tuo profilo e le preferenze</p>
        </div>
        <Button
          onClick={() => setShowOnboardingEditor(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          <Edit className="w-4 h-4 mr-2" />
          Modifica Profilo Completo
        </Button>
      </div>

      {/* Profile Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Informazioni Profilo
          </CardTitle>
          <CardDescription>
            Gestisci i tuoi dati personali di base
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditingProfile ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    value={profileData.full_name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleProfileUpdate} className="bg-primary hover:bg-primary/90">
                  Salva
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditingProfile(false)}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Annulla
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nome</Label>
                  <p className="text-sm font-medium mt-1">{userProfile?.full_name || 'Non specificato'}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-sm font-medium mt-1">{user?.email || 'Non specificata'}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsEditingProfile(true)}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Edit className="w-4 h-4 mr-2" />
                Modifica Informazioni Base
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Azioni Rapide</CardTitle>
          <CardDescription>
            Gestisci le tue impostazioni principali
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => setShowOnboardingEditor(true)}
            variant="outline"
            className="w-full justify-start border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Settings className="w-4 h-4 mr-2" />
            Modifica Preferenze Alimentari e Sportive
          </Button>
          
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Stato Onboarding</h4>
            <p className="text-sm text-muted-foreground">
              {userProfile?.isOnboarded 
                ? '✅ Profilo completato - Puoi modificare le tue informazioni in qualsiasi momento'
                : '⚠️ Profilo incompleto - Completa il tuo profilo per una migliore esperienza'
              }
            </p>
          </div>
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
