
import { NavLink, useLocation } from 'react-router-dom';
import { Calendar, Settings } from 'lucide-react';

const navItems = [
  { path: '/', icon: Calendar, label: 'Home' },
  { path: '/calendar', icon: Calendar, label: 'Calendario' },
  { path: '/shopping', icon: Calendar, label: 'Spesa' },
  { path: '/settings', icon: Settings, label: 'Impostazioni' },
];

export const BottomNavigation = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-40">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
