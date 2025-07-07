
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Settings } from 'lucide-react';
import { MealCard } from '@/components/meals/MealCard';

// Mock data for demonstration
const mockMeals = [
  {
    id: '1',
    title: 'Overnight Oats ai Frutti di Bosco',
    description: 'Colazione energetica e ricca di fibre',
    calories: 350,
    protein: 12,
    carbs: 45,
    fat: 8,
    ingredients: [
      { name: 'Avena', amount: 50, unit: 'g' },
      { name: 'Latte di mandorla', amount: 200, unit: 'ml' },
      { name: 'Frutti di bosco', amount: 80, unit: 'g' },
      { name: 'Miele', amount: 1, unit: 'cucchiaio' }
    ],
    instructions: [
      'Mescola avena e latte in una ciotola',
      'Aggiungi il miele e mescola bene',
      'Lascia riposare in frigo per tutta la notte',
      'Al mattino aggiungi i frutti di bosco'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    mealType: 'breakfast' as const
  },
  {
    id: '2',
    title: 'Pollo Grigliato con Verdure',
    description: 'Pranzo proteico e bilanciato',
    calories: 420,
    protein: 35,
    carbs: 20,
    fat: 15,
    ingredients: [
      { name: 'Petto di pollo', amount: 150, unit: 'g' },
      { name: 'Zucchine', amount: 100, unit: 'g' },
      { name: 'Peperoni', amount: 80, unit: 'g' },
      { name: 'Olio EVO', amount: 1, unit: 'cucchiaio' }
    ],
    instructions: [
      'Marina il pollo con spezie per 30 minuti',
      'Griglia il pollo per 6-8 minuti per lato',
      'Griglia le verdure per 4-5 minuti',
      'Condisci con olio e servi'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    mealType: 'lunch' as const
  }
];

const Index = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get user data from localStorage (in a real app, this would come from the backend)
  const userData = JSON.parse(localStorage.getItem('fame_user_data') || '{}');

  const getTodayMeals = () => {
    return mockMeals.filter(meal => 
      userData.meals?.includes(meal.mealType) || true
    );
  };

  const getDailyCalories = () => {
    return getTodayMeals().reduce((total, meal) => total + meal.calories, 0);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Ciao, {user?.name || 'Utente'}! 👋
        </h1>
        <p className="text-muted-foreground">
          Ecco il tuo piano alimentare per oggi
        </p>
      </div>

      {/* Daily Overview */}
      <Card className="bg-gradient-to-r from-food-green-light to-food-orange-light">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Oggi - {selectedDate.toLocaleDateString('it-IT', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long' 
            })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{getDailyCalories()}</p>
              <p className="text-sm text-muted-foreground">Calorie</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-food-orange">{getTodayMeals().length}</p>
              <p className="text-sm text-muted-foreground">Pasti</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-food-green">
                {userData.sportFrequency || 3}
              </p>
              <p className="text-sm text-muted-foreground">Allenamenti/sett</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">2.5L</p>
              <p className="text-sm text-muted-foreground">Acqua obiettivo</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goal Badge */}
      {userData.goal && (
        <div className="flex justify-center">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            Obiettivo: {
              userData.goal === 'lose_weight' ? 'Perdere peso' :
              userData.goal === 'gain_muscle' ? 'Aumentare massa' :
              'Mantenere peso'
            }
          </Badge>
        </div>
      )}

      {/* Today's Meals */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">I tuoi pasti di oggi</h2>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Cambia giorno
          </Button>
        </div>

        <div className="grid gap-4">
          {getTodayMeals().map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>

        {getTodayMeals().length === 0 && (
          <Card className="text-center py-8">
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Nessun pasto programmato per oggi
              </p>
              <Button className="bg-primary-gradient hover:opacity-90">
                Genera Piano Giornaliero
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Genera Nuovo Piano</CardTitle>
            <CardDescription>
              Crea un piano settimanale personalizzato con AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-primary-gradient hover:opacity-90">
              Genera con AI
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Lista della Spesa</CardTitle>
            <CardDescription>
              Ingredienti per la settimana corrente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Visualizza Lista
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Carica Dieta</CardTitle>
            <CardDescription>
              Scansiona PDF o immagine della tua dieta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Carica File
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Water Reminder */}
      {userData.waterReminders && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl">💧</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-blue-900">Momento di idratarsi!</p>
                <p className="text-sm text-blue-700">
                  Ricordati di bere un bicchiere d'acqua. Prossimo promemoria tra {userData.reminderInterval} ore.
                </p>
              </div>
              <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                Fatto! 
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;
