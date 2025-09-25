import { useState, useEffect } from "react";
import { Search, MapPin, Star, Phone, Mail, Clock, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const tradeTypes = [
  "Electrician", "Plumber", "Carpenter", "Painter", "Roofer", "Heating Engineer",
  "Kitchen Fitter", "Bathroom Fitter", "Tiler", "Plasterer", "Builder", "Gardener"
];

const mockTradespeople = [
  {
    id: 1,
    name: "John Mason",
    trade: "Electrician",
    rating: 4.9,
    reviewCount: 127,
    distance: "2.3 miles",
    availability: "Available today",
    avatar: "JM",
    verified: true,
    responseTime: "Usually responds within 2 hours",
    priceRange: "£45-65/hour",
    location: "Birmingham",
    specialties: ["Rewiring", "Smart home", "Emergency repairs"]
  },
  {
    id: 2,
    name: "Sarah Parker",
    trade: "Plumber",
    rating: 4.8,
    reviewCount: 93,
    distance: "1.8 miles",
    availability: "Available this week",
    avatar: "SP",
    verified: true,
    responseTime: "Usually responds within 1 hour",
    priceRange: "£50-70/hour",
    location: "Birmingham",
    specialties: ["Boiler repair", "Bathroom installation", "Leak repairs"]
  },
  {
    id: 3,
    name: "Mike Thompson",
    trade: "Carpenter",
    rating: 4.9,
    reviewCount: 156,
    distance: "3.1 miles",
    availability: "Available next week",
    avatar: "MT",
    verified: true,
    responseTime: "Usually responds within 4 hours",
    priceRange: "£40-55/hour",
    location: "Solihull",
    specialties: ["Custom furniture", "Kitchen fitting", "Decking"]
  },
  {
    id: 4,
    name: "Emma Wilson",
    trade: "Painter",
    rating: 4.7,
    reviewCount: 84,
    distance: "4.2 miles",
    availability: "Available this week",
    avatar: "EW",
    verified: true,
    responseTime: "Usually responds within 3 hours",
    priceRange: "£25-40/hour",
    location: "Kings Heath",
    specialties: ["Interior painting", "Wallpapering", "Exterior painting"]
  },
  {
    id: 5,
    name: "David Brown",
    trade: "Roofer",
    rating: 4.8,
    reviewCount: 112,
    distance: "5.1 miles",
    availability: "Available today",
    avatar: "DB",
    verified: true,
    responseTime: "Usually responds within 1 hour",
    priceRange: "£55-75/hour",
    location: "Edgbaston",
    specialties: ["Roof repairs", "Gutter cleaning", "Tile replacement"]
  },
  {
    id: 6,
    name: "Lisa Taylor",
    trade: "Kitchen Fitter",
    rating: 4.9,
    reviewCount: 67,
    distance: "3.8 miles",
    availability: "Available next week",
    avatar: "LT",
    verified: true,
    responseTime: "Usually responds within 2 hours",
    priceRange: "£60-80/hour",
    location: "Harborne",
    specialties: ["Kitchen design", "Worktop installation", "Unit fitting"]
  }
];

const FindTradespeople = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrade, setSelectedTrade] = useState("");
  const [postcode, setPostcode] = useState("");
  const [distance, setDistance] = useState([10]);
  const [minRating, setMinRating] = useState([4]);
  const [availabilityFilter, setAvailabilityFilter] = useState({
    today: false,
    thisWeek: false,
    nextWeek: false
  });
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [filteredResults, setFilteredResults] = useState(mockTradespeople);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 6;

  const applyFilters = () => {
    let filtered = mockTradespeople.filter(tradesperson => {
      const matchesTrade = !selectedTrade || selectedTrade === "all" || tradesperson.trade === selectedTrade;
      const matchesRating = tradesperson.rating >= minRating[0];
      const matchesVerified = !showVerifiedOnly || tradesperson.verified;
      const matchesDistance = parseFloat(tradesperson.distance) <= distance[0];
      
      let matchesAvailability = true;
      if (availabilityFilter.today || availabilityFilter.thisWeek || availabilityFilter.nextWeek) {
        matchesAvailability = 
          (availabilityFilter.today && tradesperson.availability.includes("today")) ||
          (availabilityFilter.thisWeek && tradesperson.availability.includes("this week")) ||
          (availabilityFilter.nextWeek && tradesperson.availability.includes("next week"));
      }

      return matchesTrade && matchesRating && matchesVerified && matchesDistance && matchesAvailability;
    });

    setFilteredResults(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedTrade, minRating, showVerifiedOnly, distance, availabilityFilter]);

  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const currentResults = filteredResults.slice(startIndex, startIndex + resultsPerPage);

  const FilterSidebar = ({ isMobile = false }) => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Distance</h3>
        <div className="px-2">
          <Slider
            value={distance}
            onValueChange={setDistance}
            max={25}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>1 mile</span>
            <span>{distance[0]} miles</span>
            <span>25 miles</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Minimum Rating</h3>
        <div className="px-2">
          <Slider
            value={minRating}
            onValueChange={setMinRating}
            max={5}
            min={1}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>1 star</span>
            <span>{minRating[0].toFixed(1)}+ stars</span>
            <span>5 stars</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Availability</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="today"
              checked={availabilityFilter.today}
              onCheckedChange={(checked) => 
                setAvailabilityFilter(prev => ({ ...prev, today: checked as boolean }))
              }
            />
            <label htmlFor="today" className="text-sm">Available today</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="thisWeek"
              checked={availabilityFilter.thisWeek}
              onCheckedChange={(checked) => 
                setAvailabilityFilter(prev => ({ ...prev, thisWeek: checked as boolean }))
              }
            />
            <label htmlFor="thisWeek" className="text-sm">Available this week</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="nextWeek"
              checked={availabilityFilter.nextWeek}
              onCheckedChange={(checked) => 
                setAvailabilityFilter(prev => ({ ...prev, nextWeek: checked as boolean }))
              }
            />
            <label htmlFor="nextWeek" className="text-sm">Available next week</label>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="verified"
            checked={showVerifiedOnly}
            onCheckedChange={(checked) => setShowVerifiedOnly(checked as boolean)}
          />
          <label htmlFor="verified" className="text-sm">Verified trades only</label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Search Header - Sticky */}
      <div className="sticky top-0 z-40 bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter postcode or area"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedTrade} onValueChange={setSelectedTrade}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select trade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All trades</SelectItem>
                  {tradeTypes.map((trade) => (
                    <SelectItem key={trade} value={trade}>{trade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button>
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar isMobile={true} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="trade-card sticky top-32">
              <h2 className="font-medium mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </h2>
              <FilterSidebar />
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold mb-2">Find trusted tradespeople</h1>
                <p className="text-muted-foreground">
                  {filteredResults.length} trades found{postcode && ` near ${postcode}`}
                </p>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {currentResults.map((tradesperson) => (
                <Card key={tradesperson.id} className="trade-card hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-secondary-foreground font-semibold text-lg">
                          {tradesperson.avatar}
                        </span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                              {tradesperson.name}
                              {tradesperson.verified && (
                                <Badge variant="secondary" className="text-xs">Verified</Badge>
                              )}
                            </h3>
                            <p className="text-muted-foreground">{tradesperson.trade}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(tradesperson.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">{tradesperson.rating}</span>
                          <span className="text-sm text-muted-foreground">
                            ({tradesperson.reviewCount} reviews)
                          </span>
                        </div>

                        <div className="space-y-1 mb-4">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" />
                            {tradesperson.distance} away • {tradesperson.location}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            {tradesperson.availability}
                          </div>
                          <p className="text-sm text-muted-foreground">{tradesperson.responseTime}</p>
                          <p className="text-sm font-medium">{tradesperson.priceRange}</p>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {tradesperson.specialties.slice(0, 3).map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1">
                            View Profile
                          </Button>
                          <Button variant="outline" size="icon">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => setCurrentPage(i + 1)}
                    className="w-10"
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}

            {filteredResults.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No tradespeople found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <Button variant="outline" onClick={() => {
                  setSelectedTrade("all");
                  setMinRating([4]);
                  setShowVerifiedOnly(false);
                  setDistance([10]);
                  setAvailabilityFilter({ today: false, thisWeek: false, nextWeek: false });
                }}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FindTradespeople;