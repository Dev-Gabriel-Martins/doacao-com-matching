import { MapPin, Calendar, Heart, Package, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Match {
  id: string;
  institution: {
    name: string;
    cause: "crianças" | "idosos" | "moradores-de-rua";
    address: string;
    distance: string;
  };
  items: string[];
  matchedAt: string;
  status: "matched" | "confirmed" | "completed";
}

const mockMatches: Match[] = [
  {
    id: "1",
    institution: {
      name: "Casa Esperança",
      cause: "crianças",
      address: "Rua das Flores, 123",
      distance: "1.2 km"
    },
    items: ["2 camisetas infantis", "1 calça jeans P", "1 jaqueta G"],
    matchedAt: "2024-01-15",
    status: "confirmed"
  },
  {
    id: "2",
    institution: {
      name: "Centro de Acolhida Renascer", 
      cause: "moradores-de-rua",
      address: "Praça da Liberdade, 789",
      distance: "850 m"
    },
    items: ["1 casaco masculino G", "2 calças jeans", "1 par de sapatos"],
    matchedAt: "2024-01-14",
    status: "matched"
  }
];

const causeConfig = {
  "crianças": {
    label: "Crianças",
    color: "bg-secondary/20 text-secondary border-secondary/30",
    icon: "👶"
  },
  "idosos": {
    label: "Idosos",
    color: "bg-accent/20 text-accent border-accent/30", 
    icon: "👴"
  },
  "moradores-de-rua": {
    label: "Moradores de rua",
    color: "bg-primary/20 text-primary border-primary/30",
    icon: "🏠"
  }
};

const statusConfig = {
  matched: {
    label: "Novo match",
    color: "bg-primary/20 text-primary border-primary/30",
    action: "Confirmar visita"
  },
  confirmed: {
    label: "Visita confirmada", 
    color: "bg-secondary/20 text-secondary border-secondary/30",
    action: "Como chegar"
  },
  completed: {
    label: "Doação realizada",
    color: "bg-muted/20 text-muted-foreground border-border",
    action: "Ver detalhes"
  }
};

export default function Matches() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="px-6 pt-12 pb-6">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow mb-4 shadow-button">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Seus matches</h1>
          <p className="text-muted-foreground">Instituições interessadas nas suas doações</p>
        </div>
      </header>

      <div className="px-6 pb-20">
        <div className="max-w-md mx-auto">
          {mockMatches.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {mockMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MatchCard({ match }: { match: Match }) {
  const causeConfig_ = causeConfig[match.institution.cause];
  const statusConfig_ = statusConfig[match.status];
  
  return (
    <div className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-muted/50 to-muted rounded-xl flex items-center justify-center text-xl">
              {causeConfig_.icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{match.institution.name}</h3>
              <Badge className={`${causeConfig_.color} border rounded-full px-2 py-1 text-xs font-medium`}>
                {causeConfig_.label}
              </Badge>
            </div>
          </div>
          
          <Badge className={`${statusConfig_.color} border rounded-full px-3 py-1 text-xs font-medium`}>
            {statusConfig_.label}
          </Badge>
        </div>

        {/* Location */}
        <div className="flex items-center text-muted-foreground text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          {match.institution.distance} • {match.institution.address}
        </div>

        {/* Items */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Itens do match:</span>
          </div>
          <div className="space-y-1">
            {match.items.map((item, index) => (
              <div key={index} className="text-sm text-muted-foreground pl-6">
                • {item}
              </div>
            ))}
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center text-muted-foreground text-sm mb-6">
          <Calendar className="w-4 h-4 mr-1" />
          Match realizado em {new Date(match.matchedAt).toLocaleDateString('pt-BR')}
        </div>

        {/* Action Button */}
        <Button className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 shadow-button py-3 rounded-xl font-semibold">
          {match.status === 'confirmed' && <Navigation className="mr-2 w-4 h-4" />}
          {match.status === 'matched' && <Heart className="mr-2 w-4 h-4" />}
          {statusConfig_.action}
        </Button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
        <Heart className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Nenhum match ainda</h3>
      <p className="text-muted-foreground mb-6">
        Cadastre suas roupas para começar a receber matches de instituições interessadas
      </p>
      <Button className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 shadow-button px-8 py-3 rounded-xl font-semibold">
        Cadastrar roupas
      </Button>
    </div>
  );
}