import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  ThumbsUp, 
  MessageSquare, 
  TrendingUp, 
  Award,
  Users,
  Calendar,
  CheckCircle
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ReviewsReputation = () => {
  // Mock data for reviews and reputation
  const overallStats = [
    { title: "Overall Rating", value: "4.8", icon: Star, trend: "+0.2 this month" },
    { title: "Total Reviews", value: "127", icon: MessageSquare, trend: "+12 this month" },
    { title: "Response Rate", value: "98%", icon: ThumbsUp, trend: "+3% this month" },
    { title: "Repeat Customers", value: "34%", icon: Users, trend: "+8% this month" },
  ];

  const recentReviews = [
    {
      id: 1,
      customerName: "Sarah Johnson",
      rating: 5,
      service: "Bathroom Renovation",
      date: "2 days ago",
      comment: "Absolutely brilliant work! John was professional, punctual, and the quality of work exceeded my expectations. The new bathroom looks amazing and everything was completed on time and within budget.",
      location: "Manchester",
      verified: true
    },
    {
      id: 2,
      customerName: "Mike Thompson",
      rating: 5,
      service: "Emergency Plumbing",
      date: "1 week ago",
      comment: "Called John for an emergency leak and he arrived within an hour. Fixed the problem quickly and efficiently. Very fair pricing and excellent service. Highly recommended!",
      location: "Liverpool",
      verified: true
    },
    {
      id: 3,
      customerName: "Emma Davis",
      rating: 4,
      service: "Boiler Service",
      date: "2 weeks ago",
      comment: "Good service and very knowledgeable. Explained everything clearly and gave helpful maintenance tips. Would use again.",
      location: "Birmingham",
      verified: true
    },
    {
      id: 4,
      customerName: "Tom Wilson",
      rating: 5,
      service: "Kitchen Tap Installation",
      date: "3 weeks ago",
      comment: "Perfect job! Clean, professional, and great attention to detail. The new tap works perfectly and John cleaned up after himself. Couldn't ask for better service.",
      location: "Manchester",
      verified: true
    }
  ];

  const badges = [
    { name: "Top Rated Pro", description: "Maintains 4.5+ star rating", earned: true },
    { name: "Quick Responder", description: "Responds to inquiries within 1 hour", earned: true },
    { name: "Reliability Champion", description: "100% job completion rate", earned: true },
    { name: "Customer Favorite", description: "50+ five-star reviews", earned: true },
    { name: "Elite Professional", description: "Top 5% of local tradespeople", earned: false },
    { name: "Green Pro", description: "Eco-friendly practices certified", earned: false }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating 
            ? "fill-yellow-400 text-yellow-400" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Reviews & Reputation</h1>
          <p className="text-muted-foreground">Manage your professional reputation and customer feedback</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overallStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold flex items-center gap-1">
                      {stat.value}
                      {stat.title === "Overall Rating" && <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
                    </p>
                    <p className="text-sm text-green-600">{stat.trend}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Reviews */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Reviews</CardTitle>
                  <Button variant="outline">View All Reviews</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{review.customerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{review.customerName}</h4>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{review.location} • {review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-primary mb-2">{review.service}</p>
                      <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Reputation Score */}
            <Card>
              <CardHeader>
                <CardTitle>Reputation Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">9.6/10</div>
                  <p className="text-muted-foreground mb-4">Excellent</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Quality</span>
                      <span>9.8</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Punctuality</span>
                      <span>9.7</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Communication</span>
                      <span>9.5</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Value</span>
                      <span>9.4</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges & Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Badges & Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {badges.map((badge, index) => (
                    <div key={index} className={`flex items-center gap-3 p-3 rounded-lg border ${
                      badge.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                    }`}>
                      <Award className={`h-5 w-5 ${
                        badge.earned ? "text-green-600" : "text-gray-400"
                      }`} />
                      <div className="flex-1">
                        <h4 className={`font-medium text-sm ${
                          badge.earned ? "text-green-800" : "text-gray-600"
                        }`}>
                          {badge.name}
                        </h4>
                        <p className={`text-xs ${
                          badge.earned ? "text-green-600" : "text-gray-500"
                        }`}>
                          {badge.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full" variant="outline">
                    Request Reviews
                  </Button>
                  <Button className="w-full" variant="outline">
                    Respond to Review
                  </Button>
                  <Button className="w-full" variant="outline">
                    Share Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReviewsReputation;