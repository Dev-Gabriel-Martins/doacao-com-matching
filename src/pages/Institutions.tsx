import { useState } from "react";
import { Heart, MapPin, Users, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Institution {
  id: string;
  name: string;
  cause: "crianças" | "idosos" | "moradores-de-rua";
  distance: string;
  address: string;
  description: string;
  needs: string[];
  image: string;
}

const mockInstitutions: Institution[] = [
  {
    id: "1",
    name: "Casa Esperança",
    cause: "crianças",
    distance: "1.2 km",
    address: "Rua das Flores, 123",
    description: "Acolhemos crianças de 2 a 12 anos em situação de vulnerabilidade social, oferecendo alimentação, educação e carinho.",
    needs: ["roupas infantis", "calçados", "agasalhos"],
    image: "/api/placeholder/300/200"
  },
  {
    id: "2", 
    name: "Lar dos Idosos São José",
    cause: "idosos",
    distance: "2.1 km",
    address: "Avenida Central, 456",
    description: "Cuidamos de idosos com amor e dignidade, proporcionando um lar acolhedor e assistência médica.",
    needs: ["roupas GG", "calçados confortáveis", "pijamas"],
    image: "/api/placeholder/300/200"
  },
  {
    id: "3",
    name: "Centro de Acolhida Renascer",
    cause: "moradores-de-rua",
    distance: "850 m",
    address: "Praça da Liberdade, 789",
    description: "Oferecemos abrigo temporário, alimentação e apoio para pessoas em situação de rua recomeçarem suas vidas.",
    needs: ["roupas masculinas", "casacos", "sapatos"],
    image: "/api/placeholder/300/200"
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

export default function Institutions() {
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);

  if (selectedInstitution) {
    return (
      <InstitutionDetail
        institution={selectedInstitution}
        onBack={() => setSelectedInstitution(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="px-6 pt-12 pb-6">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-2">Instituições próximas</h1>
          <p className="text-muted-foreground">Escolha uma causa para apoiar</p>
        </div>
      </header>

      <div className="px-6 pb-20">
        <div className="max-w-md mx-auto space-y-4">
          {mockInstitutions.map((institution) => (
            <InstitutionCard
              key={institution.id}
              institution={institution}
              onClick={() => setSelectedInstitution(institution)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function InstitutionCard({ institution, onClick }: { institution: Institution; onClick: () => void }) {
  const config = causeConfig[institution.cause];
  
  return (
    <div
      onClick={onClick}
      className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden cursor-pointer hover:shadow-warm transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="h-32 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center text-4xl">
        {config.icon}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg flex-1">{institution.name}</h3>
          <Badge className={`${config.color} border rounded-full px-3 py-1 text-xs font-medium`}>
            {config.label}
          </Badge>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          {institution.distance} • {institution.address}
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
          {institution.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {institution.needs.slice(0, 2).map((need) => (
            <Badge key={need} variant="secondary" className="text-xs">
              {need}
            </Badge>
          ))}
          {institution.needs.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{institution.needs.length - 2} mais
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

function InstitutionDetail({ institution, onBack }: { institution: Institution; onBack: () => void }) {
  const config = causeConfig[institution.cause];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="px-6 pt-12 pb-6">
        <div className="max-w-md mx-auto">
          <Button variant="ghost" onClick={onBack} className="mb-4 p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-muted/50 to-muted rounded-2xl flex items-center justify-center text-4xl mb-4 mx-auto">
              {config.icon}
            </div>
            <h1 className="text-2xl font-bold mb-2">{institution.name}</h1>
            <Badge className={`${config.color} border rounded-full px-4 py-2 font-medium`}>
              {config.label}
            </Badge>
          </div>
        </div>
      </header>

      <div className="px-6 pb-20">
        <div className="max-w-md mx-auto space-y-6">
          {/* Info */}
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{institution.distance} • {institution.address}</span>
            </div>
            
            <p className="text-foreground leading-relaxed">
              {institution.description}
            </p>
          </div>

          {/* Needs */}
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary" />
              Necessidades atuais
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {institution.needs.map((need) => (
                <Badge key={need} variant="secondary" className="px-3 py-2">
                  {need}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action */}
          <div className="bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-2xl p-6 border border-primary/20">
            <div className="text-center mb-4">
              <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-lg">Interesse mútuo!</h3>
              <p className="text-muted-foreground text-sm">
                Esta instituição demonstrou interesse nas suas doações
              </p>
            </div>
            
            <Link to="/matches">
              <Button className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 shadow-button py-6 rounded-2xl text-lg font-semibold">
                <Heart className="mr-2 w-5 h-5" />
                Confirmar match
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}