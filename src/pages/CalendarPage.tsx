
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Settings } from 'lucide-react';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const mockMeals = {
    breakfast: { title: 'Overnight Oats', calories: 350 },
    lunch: { title: 'Pollo Grigliato', calories: 420 },
    snack: { title: 'Frutta Secca', calories: 180 },
    dinner: { title: 'Salmone al Forno', calories: 380 }
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
              return (
                <div
                  key={index}
                  className={`text-center p-2 rounded-lg cursor-pointer transition-colors ${
                    isToday 
                      ? 'bg-primary text-primary-foreground' 
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
            {Object.entries(mockMeals).map(([mealType, meal]) => (
              <div
                key={mealType}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Badge className={getMealTypeColor(mealType)}>
                    {mealType === 'breakfast' ? '🌅 Colazione' :
                     mealType === 'lunch' ? '☀️ Pranzo' :
                     mealType === 'snack' ? '🍎 Merenda' :
                     '🌙 Cena'}
                  </Badge>
                  <div>
                    <h4 className="font-medium">{meal.title}</h4>
                    <p className="text-sm text-muted-foreground">{meal.calories} calorie</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Modifica
                </Button>
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
              <p className="text-2xl font-bold text-primary">9,450</p>
              <p className="text-sm text-muted-foreground">Calorie Totali</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-food-orange">28</p>
              <p className="text-sm text-muted-foreground">Pasti Pianificati</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-food-green">15</p>
              <p className="text-sm text-muted-foreground">Ricette Diverse</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-blue-600">€85</p>
              <p className="text-sm text-muted-foreground">Budget Stimato</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Floating Action Button */}
      <div className="floating-button">
        <Calendar className="w-6 h-6" />
      </div>
    </div>
  );
};

export default CalendarPage;
