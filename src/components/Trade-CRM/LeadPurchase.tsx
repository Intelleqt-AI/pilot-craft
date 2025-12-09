import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Map, MapPin, Phone } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addBids, addPurchase, fetchLeads } from '@/lib/api';
import AddLeadsForm from './AddLeadsForm';
import { useAuth } from '@/hooks/useAuth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'high':
      return 'bg-red-100 capitalize text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'medium':
      return 'bg-orange-100 capitalize text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case 'low':
      return 'bg-blue-100 capitalize text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    default:
      return 'bg-gray-100 capitalize text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

const LeadPurchase = () => {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [filteredLeads, setFilteredLeads] = useState<any[]>([]);

  const {
    data: leadsData,
    isLoading: leadsLoading,
    error: leadsErros,
    refetch,
  } = useQuery({
    queryKey: ['fetchLeads'],
    queryFn: fetchLeads,
  });

  const mutation = useMutation({
    mutationFn: addPurchase,
    onSuccess: () => {
      //   queryClient.refetchQueries(['fetchLeads']);
      toast('Lead purchased successfully!');
    },
    onError: () => {
      toast('Error! Try again');
    },
  });

  useEffect(() => {
    if (leadsLoading) return;
    setFilteredLeads(leadsData.filter(item => item.location == profile?.postcode));
  }, [leadsLoading, leadsData, profile]);

  const handlePurchase = id => {
    mutation.mutate({ lead: id, userID: profile?.id });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Leads to purchase</h2>
        {/* <Button onClick={() => setOpen(true)}>Add New Lead</Button> */}
        {/* <AddLeadsForm open={open} setOpen={setOpen} /> */}
      </div>

      <div className="grid gap-4">
        {!leadsLoading &&
          filteredLeads.length !== 0 &&
          filteredLeads.map(lead => {
            const userBid = lead.bids?.find((bid: any) => bid.bid_by === profile?.id);
            return (
              <Card key={lead.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-lg capitalize font-semibold">{lead.service}</h3>
                        <Badge className={getStatusColor(lead.priority)}>{lead?.priority}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-2">
                        <Button disabled={profile?.leads?.includes(lead.id)} size="sm" onClick={() => handlePurchase(lead.id)}>
                          {profile?.leads?.includes(lead.id) ? 'Accepted' : 'Accept'}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <p className="flex text-sm items-center gap-2">
                    <MapPin size={18} /> {lead?.location}
                  </p>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default LeadPurchase;
