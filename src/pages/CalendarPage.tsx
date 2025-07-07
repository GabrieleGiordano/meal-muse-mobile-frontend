
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Settings, Edit } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Meal {
  id: string;
  title: string;
  calories: number;
  mealType: 'breakfast' | 'lunch' | 'snack' | 'dinner';
}

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingMeal, setEditingMeal] = useState<{ date: string; mealType: string } | null>(null);

  // Mock weekly data
  const weekDays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
  const currentWeek = [];
  
  // Generate current week dates
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    currentWeek.push(date);
  }

  // Mock meals database with different meals for different days
  const allMeals: Record<string, Meal> = {
    'overnight-oats': { id: '1', title: 'Overnight Oats ai Frutti di Bosco', calories: 350, mealType: 'breakfast' },
    'scrambled-eggs': { id: '2', title: 'Uova Strapazzate con Spinaci', calories: 280, mealType: 'breakfast' },
    'avocado-toast': { id: '3', title: 'Avocado Toast Integrale', calories: 320, mealType: 'breakfast' },
    'greek-yogurt': { id: '4', title: 'Yogurt Greco con Muesli', calories: 290, mealType: 'breakfast' },
    'pollo-grigliato': { id: '5', title: 'Pollo Grigliato con Verdure', calories: 420, mealType: 'lunch' },
    'pasta-pomodoro': { id: '6', title: 'Pasta al Pomodoro e Basilico', calories: 380, mealType: 'lunch' },
    'insalata-quinoa': { id: '7', title: 'Insalata di Quinoa e Feta', calories: 340, mealType: 'lunch' },
    'salmone-riso': { id: '8', title: 'Salmone con Riso Basmati', calories: 450, mealType: 'lunch' },
    'frutta-secca': { id: '9', title: 'Mix di Frutta Secca', calories: 180, mealType: 'snack' },
    'smoothie': { id: '10', title: 'Smoothie Proteico', calories: 220, mealType: 'snack' },
    'crackers': { id: '11', title: 'Crackers con Hummus', calories: 160, mealType: 'snack' },
    'salmone-forno': { id: '12', title: 'Salmone al Forno con Patate', calories: 380, mealType: 'dinner' },
    'zuppa-legumi': { id: '13', title: 'Zuppa di Legumi', calories: 320, mealType: 'dinner' },
    'bistecca-verdure': { id: '14', title: 'Bistecca con Verdure Grigliate', calories: 420, mealType: 'dinner' },
  };

  // Meal plan storage (in a real app, this would be in a database)
  const [mealPlan, setMealPlan] = useState<Record<string, Record<string, string>>>(() => {
    const plan: Record<string, Record<string, string>> = {};
    currentWeek.forEach((date, index) => {
      const dateKey = date.toISOString().split('T')[0];
      plan[dateKey] = {
        breakfast: ['overnight-oats', 'scrambled-eggs', 'avocado-toast', 'greek-yogurt'][index % 4],
        lunch: ['pollo-grigliato', 'pasta-pomodoro', 'insalata-quinoa', 'salmone-riso'][index % 4],
        snack: ['frutta-secca', 'smoothie', 'crackers'][index % 3],
        dinner: ['salmone-forno', 'zuppa-legumi', 'bistecca-verdure'][index % 3]
      };
    });
    return plan;
  });

  const getMealsForDate = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    const dayPlan = mealPlan[dateKey] || {};
    
    return {
      breakfast: allMeals[dayPlan.breakfast] || null,
      lunch: allMeals[dayPlan.lunch] || null,
      snack: allMeals[dayPlan.snack] || null,
      dinner: allMeals[dayPlan.dinner] || null
    };
  };

  const getMealTypeColor = (type: string) => {
    const colors = {
      breakfast: 'bg-yellow-100 text-yellow-800',
      lunch: 'bg-orange-100 text-orange-800',
      snack: 'bg-green-100 text-green-800',
      dinner: 'bg-blue-100 text-blue-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getMealTypeLabel = (type: string) => {
    const labels = {
      breakfast: '🌅 Colazione',
      lunch: '☀️ Pranzo',
      snack: '🍎 Merenda',
      dinner: '🌙 Cena'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const handleMealChange = (mealType: string, newMealId: string) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setMealPlan(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [mealType]: newMealId
      }
    }));
    setEditingMeal(null);
    toast({
      title: "Pasto aggiornato",
      description: `Il pasto è stato modificato con successo!`
    });
  };

  const getAvailableMealsForType = (mealType: string) => {
    return Object.values(allMeals).filter(meal => meal.mealType === mealType);
  };

  const selectedDateMeals = getMealsForDate(selectedDate);
  const selectedDateKey = selectedDate.toISOString().split('T')[0];
  const todayKey = new Date().toISOString().split('T')[0];

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calendario Pasti</h1>
          <p className="text-muted-foreground">Pianifica e gestisci i tuoi pasti settimanali</p>
        </div>
        <Button className="bg-primary-gradient hover:opacity-90">
          <Settings className="w-4 h-4 mr-2" />
          Genera Piano
        </Button>
      </div>

      {/* Week Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Settimana Corrente</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">←</Button>
              <Button variant="outline" size="sm">→</Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {currentWeek.map((date, index) => {
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = date.toDateString() === selectedDate.toDateString();
              return (
                <div
                  key={index}
                  className={`text-center p-2 rounded-lg cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-primary text-primary-foreground' 
                      : isToday
                      ? 'bg-green-100 text-green-800 border-2 border-green-300'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="text-xs font-medium">{weekDays[index]}</div>
                  <div className="text-lg font-bold">{date.getDate()}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Daily View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {selectedDate.toLocaleDateString('it-IT', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long' 
            })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {Object.entries(selectedDateMeals).map(([mealType, meal]) => (
              <div
                key={mealType}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <Badge className={getMealTypeColor(mealType)}>
                    {getMealTypeLabel(mealType)}
                  </Badge>
                  <div>
                    <h4 className="font-medium">{meal?.title || 'Nessun pasto programmato'}</h4>
                    <p className="text-sm text-muted-foreground">
                      {meal?.calories ? `${meal.calories} calorie` : 'Seleziona un pasto'}
                    </p>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Riprogramma
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Modifica {getMealTypeLabel(mealType)}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Seleziona un nuovo pasto per {getMealTypeLabel(mealType).toLowerCase()}
                      </p>
                      <Select onValueChange={(value) => handleMealChange(mealType, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona un pasto" />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableMealsForType(mealType).map((availableMeal) => (
                            <SelectItem key={availableMeal.id} value={availableMeal.id}>
                              {availableMeal.title} - {availableMeal.calories} cal
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Riepilogo Settimanale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">
                {Object.values(mealPlan).reduce((total, dayPlan) => {
                  return total + Object.values(dayPlan).reduce((dayTotal, mealId) => {
                    return dayTotal + (allMeals[mealId]?.calories || 0);
                  }, 0);
                }, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Calorie Totali</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-food-orange">
                {Object.values(mealPlan).reduce((total, dayPlan) => {
                  return total + Object.keys(dayPlan).length;
                }, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Pasti Pianificati</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-food-green">
                {new Set(Object.values(mealPlan).flatMap(dayPlan => Object.values(dayPlan))).size}
              </p>
              <p className="text-sm text-muted-foreground">Ricette Diverse</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-blue-600">€85</p>
              <p className="text-sm text-muted-foreground">Budget Stimato</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarPage;
