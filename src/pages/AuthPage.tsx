
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const AuthPage = () => {
  const { user, login, register, isLoading } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!isLoginMode && formData.password !== formData.confirmPassword) {
      toast({
        title: "Errore",
        description: "Le password non corrispondono",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (!isLoginMode && formData.password.length < 6) {
      toast({
        title: "Errore",
        description: "La password deve essere di almeno 6 caratteri",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      if (isLoginMode) {
        const { error } = await login(formData.email, formData.password);
        if (error) {
          if (error.includes('Invalid login credentials')) {
            toast({
              title: "Credenziali non valide",
              description: "Email o password errate. Se non hai un account, registrati prima.",
              variant: "destructive"
            });
          } else {
            toast({
              title: "Errore di accesso",
              description: error,
              variant: "destructive"
            });
          }
        } else {
          toast({
            title: "Benvenuto!",
            description: "Accesso effettuato con successo"
          });
        }
      } else {
        const { error } = await register(formData.email, formData.password, formData.name);
        if (error) {
          if (error.includes('User already registered')) {
            toast({
              title: "Utente già registrato",
              description: "Questo indirizzo email è già in uso. Prova ad accedere.",
              variant: "destructive"
            });
            setIsLoginMode(true);
          } else {
            toast({
              title: "Errore di registrazione",
              description: error,
              variant: "destructive"
            });
          }
        }
      }
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore. Riprova più tardi.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-food-green-light to-food-orange-light p-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
            F
          </div>
          <CardTitle className="text-2xl font-bold">
            {isLoginMode ? 'Accedi' : 'Registrati'}
          </CardTitle>
          <CardDescription>
            {isLoginMode 
              ? 'Accedi a FAME per gestire i tuoi piani alimentari'
              : 'Crea il tuo account per iniziare'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginMode && (
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Il tuo nome"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLoginMode}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="la-tua-email@esempio.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={isLoginMode ? "Password" : "Minimo 6 caratteri"}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            
            {!isLoginMode && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Conferma Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Conferma la password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={!isLoginMode}
                />
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              disabled={isLoading || isSubmitting}
            >
              {isSubmitting ? 'Caricamento...' : (isLoginMode ? 'Accedi' : 'Registrati')}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-primary hover:underline font-medium"
            >
              {isLoginMode 
                ? 'Non hai un account? Registrati' 
                : 'Hai già un account? Accedi'
              }
            </button>
          </div>
          
          {!isLoginMode && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                📧 Dopo la registrazione riceverai un'email di conferma. 
                Clicca sul link per attivare il tuo account.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
