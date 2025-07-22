import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Monitor,
  Smartphone,
  Laptop,
  CreditCard,
  Search,
  Filter,
} from "lucide-react";

const Equipamentos = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Dados simulados de equipamentos
  const equipamentos = [
    {
      id: 1,
      tipo: "Celular",
      modelo: "Motorola G54 5G",
      imei: "123456789012345",
      responsavel: "João Silva",
      valor: "R$ 2.540,00",
      status: "Ativo",
      icon: Smartphone,
    },
    {
      id: 2,
      tipo: "Notebook",
      modelo: "Dell Inspiron 15",
      tag: "NB001",
      responsavel: "Maria Santos",
      valor: "R$ 3.200,00",
      status: "Ativo",
      icon: Laptop,
    },
    {
      id: 3,
      tipo: "Monitor",
      modelo: "Samsung 24'",
      patrimonio: "MON001",
      responsavel: "Carlos Lima",
      valor: "R$ 800,00",
      status: "Ativo",
      icon: Monitor,
    },
    {
      id: 4,
      tipo: "Chip",
      numero: "11999887766",
      responsavel: "Ana Costa",
      valor: "R$ 50,00",
      status: "Ativo",
      icon: CreditCard,
    },
  ];

  const filteredEquipamentos = equipamentos.filter(
    (equip) =>
      (equip.modelo?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (equip.responsavel?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (equip.tipo?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-light">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Equipamentos
          </h1>
          <p className="text-lg text-muted-foreground">
            Visualize e gerencie todos os equipamentos do sistema
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Buscar equipamentos</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="search"
                    placeholder="Buscar por modelo, responsável ou tipo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="outline" size="icon">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipamentos.map((equip) => {
            const Icon = equip.icon;
            return (
              <Card
                key={equip.id}
                className="hover:shadow-medium transition-shadow"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon className="w-5 h-5 text-primary" />
                    {equip.tipo}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold text-foreground">
                      {equip.modelo}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {equip.imei && `IMEI: ${equip.imei}`}
                      {equip.tag && `TAG: ${equip.tag}`}
                      {equip.patrimonio && `Patrimônio: ${equip.patrimonio}`}
                      {equip.numero && `Número: ${equip.numero}`}
                    </p>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-sm">
                      <span className="font-medium">Responsável:</span>{" "}
                      {equip.responsavel}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Valor:</span> {equip.valor}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Status:</span>
                      <span className="ml-1 inline-block w-2 h-2 bg-success rounded-full"></span>
                      <span className="ml-1 text-success">{equip.status}</span>
                    </p>
                  </div>

                  <div className="flex gap-2 pt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredEquipamentos.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Monitor className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Nenhum equipamento encontrado
              </h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou adicionar novos equipamentos.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Equipamentos;
