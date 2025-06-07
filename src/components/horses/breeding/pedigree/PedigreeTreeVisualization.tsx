
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TreePine, Maximize2, Download, Info } from "lucide-react";

interface PedigreeNode {
  id: string;
  name: string;
  gender: 'male' | 'female';
  generation: number;
  bloodline?: string;
  achievements?: string[];
}

interface PedigreeTreeProps {
  horseId: string;
  horseName: string;
}

const PedigreeTreeVisualization = ({ horseId, horseName }: PedigreeTreeProps) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [expandedGenerations, setExpandedGenerations] = useState(3);

  // Mock pedigree data - in real app, this would come from API
  const pedigreeData: PedigreeNode[] = [
    { id: horseId, name: horseName, gender: 'female', generation: 0 },
    { id: 'sire-1', name: 'Thunder Storm', gender: 'male', generation: 1, bloodline: 'Arabian', achievements: ['Champion 2020'] },
    { id: 'dam-1', name: 'Desert Rose', gender: 'female', generation: 1, bloodline: 'Arabian', achievements: ['Best Mare 2019'] },
    { id: 'sire-2', name: 'Golden Wind', gender: 'male', generation: 2, bloodline: 'Thoroughbred' },
    { id: 'dam-2', name: 'Silver Moon', gender: 'female', generation: 2, bloodline: 'Arabian' },
    { id: 'sire-3', name: 'Night Star', gender: 'male', generation: 2, bloodline: 'Arabian' },
    { id: 'dam-3', name: 'Morning Glory', gender: 'female', generation: 2, bloodline: 'Arabian' },
  ];

  const getNodesByGeneration = (generation: number) => {
    return pedigreeData.filter(node => node.generation === generation);
  };

  const renderPedigreeNode = (node: PedigreeNode) => {
    const isSelected = selectedNode === node.id;
    const genderColor = node.gender === 'male' ? 'bg-blue-100 border-blue-300' : 'bg-pink-100 border-pink-300';
    
    return (
      <div
        key={node.id}
        className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${genderColor} ${
          isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
        }`}
        onClick={() => setSelectedNode(node.id)}
      >
        <div className="text-center space-y-1">
          <h4 className="font-semibold text-sm">{node.name}</h4>
          <Badge variant="outline" className="text-xs">
            {node.gender === 'male' ? '♂' : '♀'} {node.gender}
          </Badge>
          {node.bloodline && (
            <p className="text-xs text-muted-foreground">{node.bloodline}</p>
          )}
          {node.achievements && node.achievements.length > 0 && (
            <div className="text-xs">
              <Badge variant="secondary" className="text-xs">
                {node.achievements.length} Achievement{node.achievements.length > 1 ? 's' : ''}
              </Badge>
            </div>
          )}
        </div>
      </div>
    );
  };

  const selectedNodeData = pedigreeData.find(node => node.id === selectedNode);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TreePine className="h-6 w-6 text-green-600" />
              <div>
                <CardTitle>Pedigree Tree</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Interactive family tree for {horseName}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Maximize2 className="h-4 w-4 mr-2" />
                Fullscreen
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Pedigree Tree */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-8">
                {/* Generation Controls */}
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Family Tree</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Generations:</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setExpandedGenerations(Math.max(1, expandedGenerations - 1))}
                    >
                      -
                    </Button>
                    <span className="text-sm font-medium">{expandedGenerations}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setExpandedGenerations(Math.min(5, expandedGenerations + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Tree Visualization */}
                <div className="space-y-6">
                  {Array.from({ length: expandedGenerations }, (_, gen) => {
                    const nodes = getNodesByGeneration(gen);
                    if (nodes.length === 0) return null;

                    return (
                      <div key={gen} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            Generation {gen === 0 ? 'Current' : gen}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {gen === 0 ? 'Subject' : gen === 1 ? 'Parents' : gen === 2 ? 'Grandparents' : `Generation ${gen}`}
                          </span>
                        </div>
                        <div className={`grid gap-4 ${
                          gen === 0 ? 'grid-cols-1 justify-center' :
                          gen === 1 ? 'grid-cols-2' :
                          'grid-cols-2 md:grid-cols-4'
                        }`}>
                          {nodes.map(renderPedigreeNode)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Node Details Panel */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedNodeData ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{selectedNodeData.name}</h4>
                    <Badge variant="outline" className="mt-1">
                      {selectedNodeData.gender === 'male' ? '♂ Stallion' : '♀ Mare'}
                    </Badge>
                  </div>

                  {selectedNodeData.bloodline && (
                    <div>
                      <span className="text-sm font-medium">Bloodline:</span>
                      <p className="text-sm text-muted-foreground">{selectedNodeData.bloodline}</p>
                    </div>
                  )}

                  <div>
                    <span className="text-sm font-medium">Generation:</span>
                    <p className="text-sm text-muted-foreground">
                      {selectedNodeData.generation === 0 ? 'Current' : `Generation ${selectedNodeData.generation}`}
                    </p>
                  </div>

                  {selectedNodeData.achievements && selectedNodeData.achievements.length > 0 && (
                    <div>
                      <span className="text-sm font-medium">Achievements:</span>
                      <div className="mt-1 space-y-1">
                        {selectedNodeData.achievements.map((achievement, index) => (
                          <Badge key={index} variant="secondary" className="text-xs block w-fit">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button size="sm" className="w-full">
                    View Full Profile
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <TreePine className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Click on any horse in the tree to view details
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PedigreeTreeVisualization;
