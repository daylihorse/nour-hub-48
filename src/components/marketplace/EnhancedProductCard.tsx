
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Package, Wrench, Shield, Heart } from "lucide-react";
import { MarketplaceProduct, MarketplaceService } from "@/services/publicMarketplaceService";

interface EnhancedProductCardProps {
  item: MarketplaceProduct | MarketplaceService;
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
}

const EnhancedProductCard = ({ 
  item, 
  onAddToCart, 
  onToggleFavorite, 
  isFavorite = false 
}: EnhancedProductCardProps) => {
  const isProduct = 'stock' in item;
  const vendor = isProduct ? (item as MarketplaceProduct).vendor : (item as MarketplaceService).provider;
  const inStock = isProduct ? (item as MarketplaceProduct).stock > 0 : true;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
      {item.featured && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            Featured
          </Badge>
        </div>
      )}
      
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleFavorite}
          className="h-8 w-8 p-0 hover:bg-white/80"
        >
          <Heart 
            className={`h-4 w-4 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`} 
          />
        </Button>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {isProduct ? (
              <Package className="h-5 w-5 text-blue-600" />
            ) : (
              <Wrench className="h-5 w-5 text-purple-600" />
            )}
            <Badge variant={inStock ? "default" : "secondary"} className="text-xs">
              {inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
        </div>

        <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
          {item.name}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {item.description}
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {/* Rating and Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {renderStars(item.rating)}
            </div>
            <span className="text-sm font-medium">{item.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({item.reviewCount} reviews)
            </span>
          </div>

          {/* Vendor Info */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">by</span>
            <span className="text-sm font-medium">{vendor.name}</span>
            {vendor.verified && (
              <Shield className="h-4 w-4 text-green-500" />
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Stock info for products */}
          {isProduct && (
            <div className="text-sm text-muted-foreground">
              Stock: {(item as MarketplaceProduct).stock} units
            </div>
          )}

          {/* Duration for services */}
          {!isProduct && (item as MarketplaceService).duration && (
            <div className="text-sm text-muted-foreground">
              Duration: {(item as MarketplaceService).duration} minutes
            </div>
          )}

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-2xl font-bold text-green-600">
                ${item.price.toFixed(2)}
              </span>
              {isProduct && (
                <span className="text-sm text-muted-foreground ml-1">
                  per unit
                </span>
              )}
            </div>
            
            <Button 
              size="sm" 
              disabled={!inStock}
              onClick={onAddToCart}
              className="gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              {inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedProductCard;
