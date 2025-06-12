
const MarketplaceEmptyState = () => {
  return (
    <div className="text-center py-8">
      <div className="text-4xl mb-4">🔍</div>
      <p className="text-muted-foreground mb-2">No items found matching your criteria.</p>
      <p className="text-sm text-muted-foreground">
        Try adjusting your search or category filter.
      </p>
    </div>
  );
};

export default MarketplaceEmptyState;
