import { Heart, Home, Plus, Search, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Início", path: "/" },
  { icon: Search, label: "Instituições", path: "/institutions" },
  { icon: Plus, label: "Doar", path: "/donate" },
  { icon: Heart, label: "Matches", path: "/matches" },
  { icon: User, label: "Perfil", path: "/profile" },
];

export const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
      <div className="flex items-center justify-around py-3 px-4">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300",
                "text-muted-foreground hover:text-primary",
                isActive && "text-primary bg-primary/10 scale-105"
              )
            }
          >
            <Icon size={20} />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};