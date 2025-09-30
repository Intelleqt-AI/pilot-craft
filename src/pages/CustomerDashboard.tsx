import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Briefcase, Calendar, ChevronRight, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchLeads, postJobs, updateLead } from '@/lib/api';
import AddLeadsForm from '@/components/Trade-CRM/AddLeadsForm';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'hot':
      return 'bg-red-100 capitalize text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'warm':
      return 'bg-orange-100 capitalize text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case 'cold':
      return 'bg-blue-100 capitalize text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    default:
      return 'bg-gray-100 capitalize text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

const CustomerDashboard = () => {
  const { isAuthenticated, loading, profile } = useAuth();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [currentItem, setCurrentItem] = useState(null);

  const {
    data: leadsData,
    isLoading: leadsLoading,
    error: leadsErros,
    refetch: refetchLeads,
  } = useQuery({
    queryKey: ['fetchLeads'],
    queryFn: fetchLeads,
  });

  const quoteMutation = useMutation({
    mutationFn: ({ id }: { id: number; value: number }) => updateLead(id, { isApproved: true }),
    onSuccess: () => {
      refetchLeads();
      toast.success('Proposal accepted successfully');
      const newJob = {
        trade: currentItem?.service,
        location: currentItem?.location,
        rate: currentItem?.proposedValue,
        status: 'todo',
        priority: 'Medium',
        leads_id: currentItem?.id,
        trader_id: currentItem?.bid_By,
      };
      postMutation.mutate(newJob);
    },
    onError: () => {
      toast.error('Failed to accept');
    },
  });

  const postMutation = useMutation({
    mutationFn: postJobs,
    onSuccess: () => {
      setCurrentItem(null);
    },
    onError: () => {
      toast('Error! Try again');
    },
  });

  const handleAccept = lead => {
    setCurrentItem(lead);
    quoteMutation.mutate({ id: lead?.id });
  };

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-6xl pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">Welcome back, {profile?.first_name || 'there'}!</h1>
          <p className="text-muted-foreground">Manage your jobs and find trusted tradespeople for your projects.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card
            onClick={() => setOpen(true)}
            className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors cursor-pointer group"
          >
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Post a New Job</CardTitle>
              <CardDescription>Tell us what you need and get matched with qualified tradespeople</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button className="w-full" size="lg">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle className="text-xl">View My Jobs</CardTitle>
              <CardDescription>Check the status of your current and past projects</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button variant="outline" className="w-full" size="lg">
                View Jobs
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest job postings and updates</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <div className="text-center py-12">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No jobs yet</h3>
              <p className="text-muted-foreground mb-6">Post your first job to get started with finding trusted tradespeople.</p>
              <Button onClick={() => setOpen(true)}>
                Post Your First Job
                <Plus className="ml-2 h-4 w-4" />
              </Button>
            </div> */}

            <div className="grid gap-4">
              {leadsData &&
                leadsData.length !== 0 &&
                leadsData.map(lead => (
                  <Card key={lead.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <h3 className="text-lg capitalize font-semibold">
                              {lead.service} - {lead.location}
                            </h3>
                            <Badge className={getStatusColor(lead.badge)}>{lead?.badge}</Badge>
                          </div>
                          <p className="text-sm my-2">
                            Original Ask : <span className="text-primary font-semibold">£{lead?.value}</span>
                          </p>
                          {lead?.bidder && <h3 className="text-sm mb-2">Proposal By : </h3>}
                          {!lead?.bidder && <h3 className="text-sm mb-2">No Proposal Yet.</h3>}
                          {lead?.bidder && (
                            <>
                              <p className="text-muted-foreground ">
                                {lead?.bidder?.first_name} {lead?.bidder?.last_name}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                {lead.phone && (
                                  <span className="flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    {lead?.bidder?.phone}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {lead?.bidder?.email}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="text-right pl-6">
                          {lead?.bidder && (
                            <p className="text-xl font-bold text-primary mb-2">
                              £{lead?.bidder && `${Number(lead?.proposedValue ? lead?.proposedValue : '0').toLocaleString('en-GB')}`}
                            </p>
                          )}
                          {lead?.bidder && !lead?.isApproved ? (
                            <Button onClick={() => handleAccept(lead)} className="flex-shrink-0" size="sm">
                              Accept
                            </Button>
                          ) : lead?.isApproved ? (
                            <Button variant="secondary" className="flex-shrink-0 bg-green-100 text-green-950" size="sm">
                              Accepted
                            </Button>
                          ) : (
                            <Button variant="secondary" className="flex-shrink-0 " size="sm">
                              Pending
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <AddLeadsForm open={open} setOpen={setOpen} />

      <Footer />
    </div>
  );
};

export default CustomerDashboard;
