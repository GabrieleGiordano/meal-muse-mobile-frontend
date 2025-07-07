
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from 'lucide-react';

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface Meal {
  id: string;
  title: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: Ingredient[];
  instructions: string[];
  videoUrl?: string;
  mealType: 'breakfast' | 'lunch' | 'snack' | 'dinner';
}

interface MealCardProps {
  meal: Meal;
}

const mealTypeLabels = {
  breakfast: '🌅 Colazione',
  lunch: '☀️ Pranzo',
  snack: '🍎 Merenda',
  dinner: '🌙 Cena'
};

const mealTypeColors = {
  breakfast: 'bg-yellow-100 text-yellow-800',
  lunch: 'bg-orange-100 text-orange-800',
  snack: 'bg-green-100 text-green-800',
  dinner: 'bg-blue-100 text-blue-800'
};

export const MealCard = ({ meal }: MealCardProps) => {
  const handleVideoClick = () => {
    if (meal.videoUrl) {
      window.open(meal.videoUrl, '_blank');
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={mealTypeColors[meal.mealType]}>
                {mealTypeLabels[meal.mealType]}
              </Badge>
            </div>
            <CardTitle className="text-xl mb-1">{meal.title}</CardTitle>
            <CardDescription>{meal.description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Nutritional Info */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
          <div className="text-center">
            <p className="text-lg font-bold text-primary">{meal.calories}</p>
            <p className="text-xs text-muted-foreground">Calorie</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-food-orange">{meal.protein}g</p>
            <p className="text-xs text-muted-foreground">Proteine</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-food-green">{meal.carbs}g</p>
            <p className="text-xs text-muted-foreground">Carboidrati</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-food-red">{meal.fat}g</p>
            <p className="text-xs text-muted-foreground">Grassi</p>
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <span>🥗</span> Ingredienti
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {meal.ingredients.map((ingredient, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                <span>{ingredient.name}</span>
                <span className="font-medium text-muted-foreground">
                  {ingredient.amount} {ingredient.unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Instructions */}
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <span>👨‍🍳</span> Preparazione
          </h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            {meal.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {meal.videoUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleVideoClick}
              className="flex-1"
            >
              📹 Video Ricetta
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Calendar className="w-4 h-4 mr-1" />
            Riprogramma
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
