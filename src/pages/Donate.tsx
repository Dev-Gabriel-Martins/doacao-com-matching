import { useState, useRef } from "react";
import { Camera, Plus, X, Package, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

interface ClothingItem {
  id: string;
  type: string;
  size: string;
  condition: string;
  description: string;
  image?: string;
}

export default function Donate() {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<ClothingItem>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleAddItem = () => {
    if (currentItem.type && currentItem.size && currentItem.condition) {
      const newItem: ClothingItem = {
        id: Date.now().toString(),
        type: currentItem.type!,
        size: currentItem.size!,
        condition: currentItem.condition!,
        description: currentItem.description || "",
      };
      setItems([...items, newItem]);
      setCurrentItem({});
      setShowForm(false);
    }
  };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCurrentItem({...currentItem, image: result});
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="px-6 pt-12 pb-6">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-secondary-glow mb-4 shadow-button">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Cadastre suas roupas</h1>
          <p className="text-muted-foreground">Adicione as peças que deseja doar</p>
        </div>
      </header>

      <div className="px-6 pb-20">
        <div className="max-w-md mx-auto">
          {/* Add Item Button */}
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="w-full mb-6 bg-gradient-to-r from-secondary to-secondary-glow hover:from-secondary/90 hover:to-secondary-glow/90 shadow-button py-6 rounded-2xl text-lg font-semibold group"
            >
              <Plus className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Adicionar peça de roupa
            </Button>
          )}

          {/* Add Item Form */}
          {/* Add Item Form */}
          {showForm && (
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 mb-6">
              {/* ...existing header... */}

              <div className="space-y-4">
                {/* Camera/Upload Area */}
                <div className="space-y-2">
                  <Label>Foto da peça</Label>
                  <div 
                    className="relative bg-muted/50 rounded-xl h-48 flex items-center justify-center border-2 border-dashed border-border overflow-hidden cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={triggerFileUpload}
                  >
                    {currentItem.image ? (
                      <>
                        <img 
                          src={currentItem.image}
                          alt="Peça de roupa"
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="text-white text-center">
                            <Camera className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-sm">Alterar foto</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <div className="flex items-center justify-center space-x-4 mb-2">
                          <Camera className="w-8 h-8" />
                          <Upload className="w-8 h-8" />
                        </div>
                        <p className="text-sm font-medium">Adicionar foto</p>
                        <p className="text-xs">Toque para tirar foto ou enviar da galeria</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    capture="environment" // Para abrir a câmera traseira no mobile
                  />
                </div>

                {/* Form Fields */}
                <div>
                  <Label htmlFor="type">Tipo de roupa</Label>
                  <Select value={currentItem.type} onValueChange={(value) => setCurrentItem({...currentItem, type: value})}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="camiseta">Camiseta</SelectItem>
                      <SelectItem value="calca">Calça</SelectItem>
                      <SelectItem value="jaqueta">Jaqueta</SelectItem>
                      <SelectItem value="vestido">Vestido</SelectItem>
                      <SelectItem value="sapato">Sapato</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="size">Tamanho</Label>
                  <Select value={currentItem.size} onValueChange={(value) => setCurrentItem({...currentItem, size: value})}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Selecione o tamanho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PP">PP</SelectItem>
                      <SelectItem value="P">P</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="G">G</SelectItem>
                      <SelectItem value="GG">GG</SelectItem>
                      <SelectItem value="infantil">Infantil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="condition">Estado da peça</Label>
                  <Select value={currentItem.condition} onValueChange={(value) => setCurrentItem({...currentItem, condition: value})}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Como está a peça?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nova">Nova com etiqueta</SelectItem>
                      <SelectItem value="otimo">Ótimo estado</SelectItem>
                      <SelectItem value="bom">Bom estado</SelectItem>
                      <SelectItem value="usado">Usado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Descrição (opcional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Cor, marca, detalhes especiais..."
                    value={currentItem.description}
                    onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
                    className="rounded-xl resize-none"
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleAddItem}
                  className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 shadow-button py-3 rounded-xl font-semibold"
                  disabled={!currentItem.type || !currentItem.size || !currentItem.condition}
                >
                  Adicionar peça
                </Button>
              </div>
            </div>
          )}

          {/* Items List */}
          {items.length > 0 && (
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold">Suas doações ({items.length})</h3>
              {items.map((item) => (
                <ClothingItemCard key={item.id} item={item} onRemove={removeItem} />
              ))}
            </div>
          )}

          {/* Next Step Button */}
          {items.length > 0 && (
            <Link to="/institutions">
              <Button className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 shadow-button py-6 rounded-2xl text-lg font-semibold">
                Buscar instituições ({items.length} peças)
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function ClothingItemCard({ item, onRemove }: { item: ClothingItem; onRemove: (id: string) => void }) {
  return (
    <div className="bg-card rounded-xl p-4 shadow-card border border-border/50 flex items-center gap-4">
      <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center">
       {item.image ? (
          <img 
            src={item.image} 
            alt={item.type}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <Package className="w-6 h-6 text-muted-foreground" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium capitalize">{item.type}</h4>
        <p className="text-sm text-muted-foreground">
          Tamanho {item.size} • {item.condition}
        </p>
        {item.description && (
          <p className="text-sm text-muted-foreground truncate">{item.description}</p>
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(item.id)}
        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}