import { ArrowRight, Heart, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-16 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
        <div className="relative max-w-md mx-auto text-center">
          <img src={logo} alt="DoaFácil" className="w-20 h-20 mb-6 mx-auto" />
          
          <h1 className="text-3xl font-bold text-foreground mb-4 leading-tight">
            Conecte sua doação com quem mais precisa
          </h1>
          
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Encontre instituições próximas e faça a diferença na vida de pessoas que realmente precisam das suas roupas.
          </p>
          
          <Link to="/donate">
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 shadow-button text-lg py-6 rounded-2xl font-semibold group transition-all duration-300"
            >
              Começar a doar
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-12">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Como funciona</h2>
          
          <div className="space-y-6">
            <FeatureCard
              icon={<MapPin className="w-6 h-6" />}
              title="Encontre instituições próximas"
              description="Descubra organizações na sua região que precisam de doações de roupas"
              gradient="from-primary/20 to-primary-glow/20"
            />
            
            <FeatureCard
              icon={<Heart className="w-6 h-6" />}
              title="Dê match com causas"
              description="Conecte suas doações com instituições que atendem crianças, idosos ou pessoas em situação de rua"
              gradient="from-secondary/20 to-secondary-glow/20"
            />
            
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Impacto real"
              description="Veja como suas doações fazem a diferença na vida das pessoas atendidas"
              gradient="from-accent/20 to-accent/30"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon, title, description, gradient }: FeatureCardProps) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:shadow-warm transition-all duration-300">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} mb-4 text-primary`}>
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}