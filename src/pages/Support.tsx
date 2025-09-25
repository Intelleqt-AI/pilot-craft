import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  FileText,
  HelpCircle,
  BookOpen,
  Video,
  Search,
  Users,
  Zap
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Support = () => {
  const supportStats = [
    { title: "Average Response", value: "< 2 hrs", icon: Clock },
    { title: "Satisfaction Rate", value: "98%", icon: Users },
    { title: "Tickets Resolved", value: "1,247", icon: FileText },
    { title: "Active Users", value: "3,421", icon: Zap },
  ];

  const faqItems = [
    {
      category: "Getting Started",
      questions: [
        { q: "How do I create my tradesperson profile?", a: "Navigate to 'Join Free' and complete the signup process. You'll need to verify your business details and qualifications." },
        { q: "What documents do I need to verify my business?", a: "You'll need business registration, insurance certificates, and relevant trade qualifications or certifications." },
        { q: "How long does verification take?", a: "Most applications are reviewed within 24-48 hours during business days." }
      ]
    },
    {
      category: "Managing Jobs & Leads",
      questions: [
        { q: "How do I respond to customer inquiries?", a: "You'll receive notifications via email and in your dashboard. Click on any lead to view details and send a quote." },
        { q: "What's the best way to write a quote?", a: "Be detailed, professional, and include all costs upfront. Use our quote template for best results." },
        { q: "Can I track my job completion rate?", a: "Yes, your dashboard shows detailed analytics including completion rates, response times, and customer satisfaction." }
      ]
    },
    {
      category: "Billing & Payments",
      questions: [
        { q: "How does pricing work for leads?", a: "We use a credit system. You only pay when you choose to contact a customer. Premium plans offer discounted rates." },
        { q: "When am I charged for a lead?", a: "You're charged when you send a quote or contact details to a customer, not when you view the lead." },
        { q: "Can I get a refund for poor quality leads?", a: "Yes, we have a quality guarantee. Report any issues within 24 hours for a full credit refund." }
      ]
    }
  ];

  const supportChannels = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "9 AM - 6 PM, Mon-Fri",
      icon: MessageCircle,
      action: "Start Chat",
      featured: true
    },
    {
      title: "Phone Support",
      description: "Call us for urgent issues",
      availability: "0800 123 4567",
      icon: Phone,
      action: "Call Now",
      featured: false
    },
    {
      title: "Email Support",
      description: "Send us detailed questions",
      availability: "support@tradepilot.co.uk",
      icon: Mail,
      action: "Send Email",
      featured: false
    },
    {
      title: "Video Tutorials",
      description: "Learn with step-by-step guides",
      availability: "Available 24/7",
      icon: Video,
      action: "Watch Now",
      featured: false
    }
  ];

  const recentTickets = [
    {
      id: "TP-2024-001",
      subject: "Issue with lead notifications",
      status: "Resolved",
      date: "2 days ago",
      priority: "Medium"
    },
    {
      id: "TP-2024-002",
      subject: "Profile verification questions",
      status: "In Progress",
      date: "1 day ago",
      priority: "High"
    },
    {
      id: "TP-2024-003",
      subject: "Payment method update",
      status: "Resolved",
      date: "3 days ago",
      priority: "Low"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-yellow-100 text-yellow-800";
      case "Open": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Support Centre</h1>
          <p className="text-muted-foreground mb-6">Get help when you need it. We're here to support your success.</p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Support Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {supportStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {supportChannels.map((channel, index) => (
            <Card key={index} className={channel.featured ? "border-primary shadow-lg" : ""}>
              <CardContent className="p-6 text-center">
                <channel.icon className={`h-12 w-12 mx-auto mb-4 ${
                  channel.featured ? "text-primary" : "text-muted-foreground"
                }`} />
                <h3 className="font-semibold mb-2">{channel.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{channel.description}</p>
                <p className="text-xs text-muted-foreground mb-4">{channel.availability}</p>
                <Button 
                  variant={channel.featured ? "default" : "outline"} 
                  size="sm" 
                  className="w-full"
                >
                  {channel.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {faqItems.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      <h3 className="font-semibold text-lg mb-4 text-primary">{category.category}</h3>
                      <div className="space-y-4">
                        {category.questions.map((item, itemIndex) => (
                          <div key={itemIndex} className="border-l-4 border-primary/20 pl-4">
                            <h4 className="font-medium text-foreground mb-2">{item.q}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Support Tickets */}
            <Card>
              <CardHeader>
                <CardTitle>Your Recent Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTickets.map((ticket) => (
                    <div key={ticket.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{ticket.id}</span>
                        <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                      </div>
                      <h4 className="font-medium text-sm mb-1">{ticket.subject}</h4>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{ticket.date}</span>
                        <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Tickets
                </Button>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    User Guide
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Video className="h-4 w-4 mr-2" />
                    Video Tutorials
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Terms & Conditions
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800">Emergency Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-700 mb-4">
                  For urgent technical issues affecting your business
                </p>
                <Button variant="destructive" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Line
                </Button>
                <p className="text-xs text-red-600 mt-2 text-center">
                  Available 24/7 for critical issues
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Support;