import { User, MapPin, Heart, Package, Settings, HelpCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="px-6 pt-12 pb-8">
        <div className="max-w-md mx-auto text-center">
          <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-primary/20">
            <AvatarImage src="/api/placeholder/80/80" />
            <AvatarFallback className="text-xl font-semibold bg-gradient-to-br from-primary to-primary-glow text-white">
              MC
            </AvatarFallback>
          </Avatar>
          
          <h1 className="text-2xl font-bold mb-1">Maria Clara</h1>
          <p className="text-muted-foreground flex items-center justify-center gap-1">
            <MapPin className="w-4 h-4" />
            São Paulo, SP
          </p>
        </div>
      </header>

      <div className="px-6 pb-20">
        <div className="max-w-md mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              icon={<Heart className="w-6 h-6" />}
              value="12"
              label="Matches realizados"
              gradient="from-primary/20 to-primary-glow/20"
              textColor="text-primary"
            />
            
            <StatCard
              icon={<Package className="w-6 h-6" />}
              value="24"
              label="Peças doadas" 
              gradient="from-secondary/20 to-secondary-glow/20"
              textColor="text-secondary"
            />
          </div>

          {/* Menu Items */}
          <div className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden">
            <MenuItem
              icon={<User className="w-5 h-5" />}
              title="Editar perfil"
              description="Nome, foto e localização"
            />
            
            <MenuItem
              icon={<MapPin className="w-5 h-5" />}
              title="Endereço"
              description="Atualizar sua localização"
              showDivider
            />
            
            <MenuItem
              icon={<Settings className="w-5 h-5" />}
              title="Configurações"
              description="Notificações e privacidade"
            />
            
            <MenuItem
              icon={<HelpCircle className="w-5 h-5" />}
              title="Ajuda e suporte"
              description="Dúvidas e contato"
              showDivider
            />
            
            <MenuItem
              icon={<LogOut className="w-5 h-5" />}
              title="Sair"
              description="Fazer logout da conta"
              variant="destructive"
            />
          </div>

          {/* Impact Message */}
          <div className="bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-2xl p-6 border border-primary/20 text-center">
            <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Obrigado por fazer a diferença!</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Suas doações já ajudaram <span className="font-semibold text-primary">24 pessoas</span> a terem roupas limpas e dignidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  gradient: string;
  textColor: string;
}

function StatCard({ icon, value, label, gradient, textColor }: StatCardProps) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 text-center">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} mb-3 ${textColor}`}>
        {icon}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  showDivider?: boolean;
  variant?: "default" | "destructive";
}

function MenuItem({ icon, title, description, showDivider, variant = "default" }: MenuItemProps) {
  return (
    <>
      <button className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${
          variant === "destructive" 
            ? "bg-destructive/10 text-destructive" 
            : "bg-muted/50 text-muted-foreground"
        }`}>
          {icon}
        </div>
        <div className="flex-1 text-left">
          <h3 className={`font-medium ${variant === "destructive" ? "text-destructive" : ""}`}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </button>
      {showDivider && <div className="border-t border-border/50 mx-4" />}
    </>
  );
}