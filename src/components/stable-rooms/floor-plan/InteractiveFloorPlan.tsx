
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize,
  Move,
  Square,
  Circle
} from "lucide-react";
import { Room } from "@/types/stableRooms";

interface InteractiveFloorPlanProps {
  rooms: Room[];
  selectedRoom: string | null;
  onRoomSelect: (roomId: string | null) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  building: string;
  floor: string;
}

interface CanvasRoom extends Room {
  x: number;
  y: number;
  width: number;
  height: number;
}

const InteractiveFloorPlan = ({ 
  rooms, 
  selectedRoom, 
  onRoomSelect, 
  zoom, 
  onZoomChange,
  building,
  floor 
}: InteractiveFloorPlanProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [tool, setTool] = useState<'select' | 'pan' | 'measure'>('select');
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  // Mock canvas rooms based on building/floor
  const canvasRooms: CanvasRoom[] = rooms.map((room, index) => ({
    ...room,
    x: 10 + (index % 4) * 70,
    y: 10 + Math.floor(index / 4) * 50,
    width: 60,
    height: 40
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#10b981';
      case 'occupied': return '#3b82f6';
      case 'maintenance': return '#f59e0b';
      case 'reserved': return '#8b5cf6';
      case 'out_of_order': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'stall': return '#e5e7eb';
      case 'paddock': return '#d1fae5';
      case 'warehouse': return '#fef3c7';
      case 'foaling': return '#fce7f3';
      case 'quarantine': return '#fee2e2';
      case 'office': return '#e0e7ff';
      default: return '#f3f4f6';
    }
  };

  const drawFloorPlan = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply zoom and pan transformations
    ctx.save();
    ctx.scale(zoom / 100, zoom / 100);
    ctx.translate(panOffset.x, panOffset.y);

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= 400; x += 10) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 300);
      ctx.stroke();
    }
    for (let y = 0; y <= 300; y += 10) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(400, y);
      ctx.stroke();
    }

    // Draw building outline
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 400, 300);

    // Draw rooms
    canvasRooms.forEach((room) => {
      const isSelected = selectedRoom === room.id;
      const isHovered = hoveredRoom === room.id;

      // Room background
      ctx.fillStyle = getTypeColor(room.type);
      ctx.fillRect(room.x, room.y, room.width, room.height);

      // Room border
      ctx.strokeStyle = isSelected ? '#000' : getStatusColor(room.status);
      ctx.lineWidth = isSelected ? 2 : 1;
      ctx.strokeRect(room.x, room.y, room.width, room.height);

      // Hover effect
      if (isHovered) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(room.x, room.y, room.width, room.height);
      }

      // Room text
      ctx.fillStyle = '#374151';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(room.number, room.x + room.width / 2, room.y + room.height / 2 - 5);
      
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#6b7280';
      ctx.fillText(room.type, room.x + room.width / 2, room.y + room.height / 2 + 8);

      // Occupancy indicator
      if (room.status === 'occupied') {
        ctx.fillStyle = getStatusColor(room.status);
        ctx.beginPath();
        ctx.arc(room.x + room.width - 8, room.y + 8, 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    });

    ctx.restore();
  };

  const getCanvasPosition = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    };
  };

  const getRoomAtPosition = (x: number, y: number) => {
    const adjustedX = (x / (zoom / 100)) - panOffset.x;
    const adjustedY = (y / (zoom / 100)) - panOffset.y;

    return canvasRooms.find(room => 
      adjustedX >= room.x && 
      adjustedX <= room.x + room.width &&
      adjustedY >= room.y && 
      adjustedY <= room.y + room.height
    );
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool !== 'select') return;

    const pos = getCanvasPosition(event);
    const room = getRoomAtPosition(pos.x, pos.y);
    
    if (room) {
      onRoomSelect(room.id === selectedRoom ? null : room.id);
    } else {
      onRoomSelect(null);
    }
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getCanvasPosition(event);
    const room = getRoomAtPosition(pos.x, pos.y);
    
    setHoveredRoom(room ? room.id : null);

    if (isDragging && tool === 'pan') {
      const deltaX = pos.x - dragStart.x;
      const deltaY = pos.y - dragStart.y;
      setPanOffset(prev => ({
        x: prev.x + deltaX / (zoom / 100),
        y: prev.y + deltaY / (zoom / 100)
      }));
      setDragStart(pos);
    }
  };

  const handleCanvasMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool === 'pan') {
      setIsDragging(true);
      setDragStart(getCanvasPosition(event));
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    drawFloorPlan();
  }, [canvasRooms, selectedRoom, hoveredRoom, zoom, panOffset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = event.deltaY > 0 ? -10 : 10;
      const newZoom = Math.max(25, Math.min(400, zoom + delta));
      onZoomChange(newZoom);
    };

    canvas.addEventListener('wheel', handleWheel);
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [zoom, onZoomChange]);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
        <div className="flex gap-1">
          <Button
            size="sm"
            variant={tool === 'select' ? 'default' : 'outline'}
            onClick={() => setTool('select')}
          >
            <Square className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={tool === 'pan' ? 'default' : 'outline'}
            onClick={() => setTool('pan')}
          >
            <Move className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={tool === 'measure' ? 'default' : 'outline'}
            onClick={() => setTool('measure')}
          >
            <Circle className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="w-px h-6 bg-border" />
        
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onZoomChange(Math.min(400, zoom + 25))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onZoomChange(Math.max(25, zoom - 25))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              onZoomChange(100);
              setPanOffset({ x: 0, y: 0 });
            }}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline">
            <Maximize className="h-4 w-4" />
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {building} - {floor} | {zoom}%
          </span>
          <Badge variant="outline">
            {tool.charAt(0).toUpperCase() + tool.slice(1)} Tool
          </Badge>
        </div>
      </div>

      {/* Canvas */}
      <Card>
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-lg">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full h-[600px] cursor-crosshair bg-gray-50"
              onClick={handleCanvasClick}
              onMouseMove={handleCanvasMouseMove}
              onMouseDown={handleCanvasMouseDown}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={() => {
                setHoveredRoom(null);
                setIsDragging(false);
              }}
            />
            
            {/* Minimap */}
            <div className="absolute bottom-4 right-4 w-32 h-24 bg-white/90 border rounded shadow-lg">
              <div className="text-xs p-1 text-center text-muted-foreground">
                Overview
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveFloorPlan;
