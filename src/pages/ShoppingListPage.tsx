
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from 'lucide-react';

const ShoppingListPage = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const mockShoppingList = {
    'Frutta e Verdura': [
      { id: '1', name: 'Banane', quantity: '6 pz', price: '€2.50' },
      { id: '2', name: 'Spinaci freschi', quantity: '200g', price: '€1.80' },
      { id: '3', name: 'Pomodori', quantity: '500g', price: '€2.20' },
      { id: '4', name: 'Zucchine', quantity: '400g', price: '€1.50' },
    ],
    'Proteine': [
      { id: '5', name: 'Petto di pollo', quantity: '800g', price: '€8.50' },
      { id: '6', name: 'Salmone fresco', quantity: '400g', price: '€12.00' },
      { id: '7', name: 'Uova', quantity: '12 pz', price: '€3.20' },
    ],
    'Cereali e Legumi': [
      { id: '8', name: 'Avena', quantity: '500g', price: '€2.80' },
      { id: '9', name: 'Riso integrale', quantity: '1kg', price: '€3.50' },
      { id: '10', name: 'Lenticchie rosse', quantity: '400g', price: '€2.10' },
    ],
    'Latticini': [
      { id: '11', name: 'Yogurt greco', quantity: '4 pz', price: '€4.60' },
      { id: '12', name: 'Latte di mandorla', quantity: '1L', price: '€2.90' },
    ],
    'Dispensa': [
      { id: '13', name: 'Olio EVO', quantity: '500ml', price: '€6.50' },
      { id: '14', name: 'Miele', quantity: '250g', price: '€4.20' },
    ]
  };

  const handleItemCheck = (itemId: string) => {
    setCheckedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const totalPrice = Object.values(mockShoppingList)
    .flat()
    .reduce((total, item) => total + parseFloat(item.price.replace('€', '')), 0);

  const checkedPrice = Object.values(mockShoppingList)
    .flat()
    .filter(item => checkedItems.includes(item.id))
    .reduce((total, item) => total + parseFloat(item.price.replace('€', '')), 0);

  const totalItems = Object.values(mockShoppingList).flat().length;

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lista della Spesa</h1>
          <p className="text-muted-foreground">Ingredienti per la settimana corrente</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            📱 Condividi
          </Button>
          <Button variant="outline" size="sm">
            📄 Scarica PDF
          </Button>
        </div>
      </div>

      {/* Summary */}
      <Card className="bg-gradient-to-r from-food-green-light to-food-orange-light">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">€{totalPrice.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Totale Stimato</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-food-orange">{totalItems}</p>
              <p className="text-sm text-muted-foreground">Articoli</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-food-green">{checkedItems.length}</p>
              <p className="text-sm text-muted-foreground">Completati</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {Math.round((checkedItems.length / totalItems) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">Progresso</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shopping List by Category */}
      <div className="space-y-4">
        {Object.entries(mockShoppingList).map(([category, items]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="text-lg">
                    {category === 'Frutta e Verdura' ? '🥬' :
                     category === 'Proteine' ? '🥩' :
                     category === 'Cereali e Legumi' ? '🌾' :
                     category === 'Latticini' ? '🥛' :
                     '🏪'}
                  </span>
                  {category}
                </span>
                <Badge variant="secondary">
                  {items.filter(item => checkedItems.includes(item.id)).length} / {items.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                      checkedItems.includes(item.id)
                        ? 'bg-muted/50 opacity-70'
                        : 'hover:bg-muted/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={item.id}
                        checked={checkedItems.includes(item.id)}
                        onCheckedChange={() => handleItemCheck(item.id)}
                      />
                      <div className={checkedItems.includes(item.id) ? 'line-through text-muted-foreground' : ''}>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${checkedItems.includes(item.id) ? 'line-through text-muted-foreground' : ''}`}>
                        {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Summary */}
      <Card className="sticky bottom-20 bg-white border-2 border-primary">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {checkedItems.length} di {totalItems} articoli completati
              </p>
              <p className="text-lg font-bold">
                Rimanenti: €{(totalPrice - checkedPrice).toFixed(2)}
              </p>
            </div>
            <Button className="bg-primary-gradient hover:opacity-90">
              <Calendar className="w-4 h-4 mr-2" />
              Completa Spesa
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingListPage;
