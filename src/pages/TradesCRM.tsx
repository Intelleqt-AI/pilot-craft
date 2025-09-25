import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Users,
  Briefcase,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Clock,
  DollarSign,
  Settings,
  Bell,
  MessageCircle,
  HelpCircle,
  BookOpen,
  Video,
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TradeJobs from '@/components/Trade-CRM/TradeJobs';
import TradeLeads from '@/components/Trade-CRM/TradeLeads';
import { useQuery } from '@tanstack/react-query';
import { fetchJobs, fetchLeads } from '@/lib/api';

const TradesCRM = () => {
  const { isAuthenticated, loading, isTrade } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const {
    data: leadsData,
    isLoading: leadsLoading,
    error: leadsErros,
    refetch: refetchLeads,
  } = useQuery({
    queryKey: ['fetchLeads'],
    queryFn: fetchLeads,
  });

  const { data: jobsData, isLoading } = useQuery({ queryKey: ['Jobs'], queryFn: fetchJobs });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect non-trade users to customer dashboard
  if (!isTrade) {
    return <Navigate to="/dashboard" replace />;
  }

  // Mock data for the dashboard
  const stats = [
    { title: 'Active Leads', value: `${leadsData?.length ?? 0}`, icon: Users, trend: '+12%' },
    { title: 'Jobs This Month', value: `${jobsData?.length ?? 0}`, icon: Briefcase, trend: '+8%' },
    { title: 'Revenue', value: 'Coming', icon: DollarSign, trend: '+15%' },
    {
      title: 'Completion Rate',
      value: `${
        jobsData && jobsData.length > 0
          ? Math.round(((jobsData?.filter(job => job.status === 'complete').length ?? 0) / jobsData.length) * 100)
          : 0
      }%`,

      icon: TrendingUp,
      trend: '+2%',
    },
  ];

  const upcomingAppointments = [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'warm':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'cold':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Trade Pilot for Business</h1>
            <p className="text-muted-foreground mt-1">Your professional dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          {['dashboard', 'leads', 'jobs', 'calendar', 'reviews', 'support', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-1 border-b-2 transition-colors capitalize ${
                activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'reviews' ? 'Reviews & Reputation' : tab}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.trend}</p>
                      </div>
                      <stat.icon className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leadsData &&
                      leadsData.length !== 0 &&
                      leadsData.slice(0, 3).map(lead => (
                        <div key={lead.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{lead.name}</h4>
                            <p className="text-sm text-muted-foreground">{lead.service}</p>
                            <p className="text-sm text-muted-foreground">{lead.location}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(lead.badge)}>{lead.badge}</Badge>
                            <p className="text-sm font-medium mt-1">£{lead?.value ? lead?.value : '0'}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                        <div className="text-center">
                          <Clock className="h-4 w-4 text-primary mx-auto" />
                          <p className="text-sm font-medium">{appointment.time}</p>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{appointment.client}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.service}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {appointment.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'leads' && <TradeLeads />}

        {activeTab === 'jobs' && <TradeJobs />}

        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Calendar & Schedule</h2>
              <Button>Book Appointment</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar View */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                      March 2025
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Today
                        </Button>
                        <Button variant="outline" size="sm">
                          Week
                        </Button>
                        <Button variant="outline" size="sm">
                          Month
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 35 }, (_, i) => {
                        const date = i - 6; // Start from previous month
                        const isCurrentMonth = date > 0 && date <= 31;
                        const isToday = date === 12;
                        const hasAppointment = [10, 12, 15, 18, 20, 25].includes(date);

                        return (
                          <div
                            key={i}
                            className={`h-16 p-1 border rounded text-sm ${
                              isCurrentMonth ? 'bg-background' : 'bg-muted/50 text-muted-foreground'
                            } ${isToday ? 'bg-primary text-primary-foreground' : ''}
                            ${hasAppointment ? 'border-primary' : ''}`}
                          >
                            <div className="font-medium">{isCurrentMonth ? date : ''}</div>
                            {hasAppointment && isCurrentMonth && (
                              <div className="text-xs bg-secondary text-secondary-foreground rounded px-1 mt-1">
                                {date === 12 ? '3 jobs' : date === 15 ? '2 jobs' : '1 job'}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Today's Appointments */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Today's Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingAppointments.map((appointment, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-medium">{appointment.time}</span>
                          </div>
                          <h4 className="font-medium">{appointment.client}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.service}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {appointment.location}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">This Week</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Appointments</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Completed Jobs</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Revenue</span>
                        <span className="font-medium">£2,340</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Travel Time</span>
                        <span className="font-medium">6.5 hrs</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Calendar Image */}
                <Card>
                  <CardContent className="p-4">
                    <img
                      src="https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=400&h=300&fit=crop"
                      alt="Digital planning workspace"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <p className="text-sm text-muted-foreground mt-2 text-center">Smart scheduling for your trade business</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Reviews & Reputation</h2>
              <Button>Request Reviews</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Overall Rating</p>
                      <p className="text-2xl font-bold flex items-center gap-1">
                        4.8 <span className="text-yellow-500">★</span>
                      </p>
                      <p className="text-sm text-green-600">+0.2 this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Reviews</p>
                      <p className="text-2xl font-bold">127</p>
                      <p className="text-sm text-green-600">+12 this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Response Rate</p>
                      <p className="text-2xl font-bold">98%</p>
                      <p className="text-sm text-green-600">+3% this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Repeat Customers</p>
                      <p className="text-2xl font-bold">34%</p>
                      <p className="text-sm text-green-600">+8% this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Sarah Johnson</h4>
                          <p className="text-sm text-muted-foreground">Bathroom Renovation</p>
                        </div>
                        <div className="flex text-yellow-500">★★★★★</div>
                      </div>
                      <p className="text-sm">"Excellent work! Professional and on time."</p>
                      <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                    </div>
                    <div className="border-b pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Mike Thompson</h4>
                          <p className="text-sm text-muted-foreground">Emergency Plumbing</p>
                        </div>
                        <div className="flex text-yellow-500">★★★★★</div>
                      </div>
                      <p className="text-sm">"Quick response and fair pricing."</p>
                      <p className="text-xs text-muted-foreground mt-1">1 week ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Reputation Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">9.6/10</div>
                    <p className="text-muted-foreground mb-4">Excellent</p>
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between">
                        <span>Quality</span>
                        <span>9.8</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Punctuality</span>
                        <span>9.7</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Communication</span>
                        <span>9.5</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Support Centre</h2>
              <Button>Contact Support</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MessageCircle className="h-5 w-5" />
                    Live Chat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Get instant help from our support team</p>
                  <p className="text-sm text-muted-foreground mb-4">Available: 9 AM - 6 PM, Mon-Fri</p>
                  <Button className="w-full">Start Chat</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Phone className="h-5 w-5" />
                    Phone Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Call us for urgent issues</p>
                  <p className="text-sm text-muted-foreground mb-4">0800 123 4567</p>
                  <Button variant="outline" className="w-full">
                    Call Now
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Mail className="h-5 w-5" />
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Send us detailed questions</p>
                  <p className="text-sm text-muted-foreground mb-4">support@tradepilot.co.uk</p>
                  <Button variant="outline" className="w-full">
                    Send Email
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Support Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <h4 className="font-medium">Profile verification help</h4>
                        <p className="text-sm text-muted-foreground">Ticket #TP-001</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Resolved</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <h4 className="font-medium">Payment method update</h4>
                        <p className="text-sm text-muted-foreground">Ticket #TP-002</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Help</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Frequently Asked Questions
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      User Guide
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Video className="h-4 w-4 mr-2" />
                      Video Tutorials
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Account Settings</h2>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name *</label>
                    <input className="w-full p-2 border border-border rounded-md bg-background" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name *</label>
                    <input className="w-full p-2 border border-border rounded-md bg-background" defaultValue="Smith" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address *</label>
                  <input className="w-full p-2 border border-border rounded-md bg-background" defaultValue="john.smith@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number *</label>
                  <input className="w-full p-2 border border-border rounded-md bg-background" defaultValue="07123 456 789" />
                </div>
                <Button>Save Personal Details</Button>
              </CardContent>
            </Card>

            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Business Information</CardTitle>
                <CardDescription>Manage your business profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">John's Plumbing Services</h3>
                    <p className="text-muted-foreground">Professional Plumber</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Change Photo
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Business Name *</label>
                  <input className="w-full p-2 border border-border rounded-md bg-background" defaultValue="John's Plumbing Services" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Primary Trade *</label>
                    <select className="w-full p-2 border border-border rounded-md bg-background">
                      <option value="plumber">Plumber</option>
                      <option value="electrician">Electrician</option>
                      <option value="builder">Builder</option>
                      <option value="roofer">Roofer</option>
                      <option value="painter">Painter/Decorator</option>
                      <option value="kitchen">Kitchen Installer</option>
                      <option value="gas">Gas Engineer</option>
                      <option value="carpenter">Carpenter/Joiner</option>
                      <option value="tiler">Tiler</option>
                      <option value="plasterer">Plasterer</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Type *</label>
                    <select className="w-full p-2 border border-border rounded-md bg-background">
                      <option value="sole-trader">Sole Trader</option>
                      <option value="limited-company">Limited Company</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Years of Experience *</label>
                  <select className="w-full p-2 border border-border rounded-md bg-background">
                    <option value="1-2">1-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10" selected>
                      6-10 years
                    </option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Service Areas *</label>
                  <input className="w-full p-2 border border-border rounded-md bg-background" defaultValue="M1, M2, M3, Manchester" />
                  <p className="text-xs text-muted-foreground">Separate multiple areas with commas</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Business Description</label>
                  <textarea
                    className="w-full p-2 border border-border rounded-md bg-background h-24 resize-none"
                    placeholder="Describe your services, experience, and what makes you stand out..."
                    defaultValue="Professional plumbing services with over 8 years of experience. Specializing in emergency repairs, bathroom installations, and boiler maintenance. Fully insured and Gas Safe registered."
                  />
                </div>

                <Button>Save Business Details</Button>
              </CardContent>
            </Card>

            {/* Verification & Credentials */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Verification & Credentials</CardTitle>
                <CardDescription>Manage your insurance and certifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <Settings className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Public Liability Insurance</h4>
                      <p className="text-sm text-muted-foreground">Valid until: March 2025</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Verified</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <Settings className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Gas Safe Registration</h4>
                      <p className="text-sm text-muted-foreground">Registration: 123456</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Verified</Badge>
                </div>

                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    Upload New Documents
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Services & Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Services & Pricing</CardTitle>
                <CardDescription>Manage your service offerings and rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border border-border rounded-lg">
                    <h4 className="font-medium">Emergency Plumbing</h4>
                    <p className="text-sm text-muted-foreground">24/7 emergency repairs</p>
                    <p className="font-semibold text-primary">£85/hour</p>
                  </div>
                  <div className="p-3 border border-border rounded-lg">
                    <h4 className="font-medium">Bathroom Installation</h4>
                    <p className="text-sm text-muted-foreground">Complete bathroom fitting</p>
                    <p className="font-semibold text-primary">From £2,500</p>
                  </div>
                  <div className="p-3 border border-border rounded-lg">
                    <h4 className="font-medium">Boiler Service</h4>
                    <p className="text-sm text-muted-foreground">Annual service and maintenance</p>
                    <p className="font-semibold text-primary">£120</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Manage Services
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TradesCRM;
