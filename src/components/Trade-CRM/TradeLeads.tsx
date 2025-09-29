import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchLeads, updateLead } from '@/lib/api';
import AddLeadsForm from './AddLeadsForm';
import { useAuth } from '@/hooks/useAuth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
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

const TradeLeads = () => {
  const [open, setOpen] = useState(false);
  const [openQuote, setOpenQuote] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [proposedValue, setProposedValue] = useState('');
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: leadsData,
    isLoading: leadsLoading,
    error: leadsErros,
    refetch,
  } = useQuery({
    queryKey: ['fetchLeads'],
    queryFn: fetchLeads,
  });

  const quoteMutation = useMutation({
    mutationFn: ({ id, value }: { id: number; value: number }) => updateLead(id, { proposedValue: value, bid_By: profile?.id }),
    onSuccess: () => {
      refetch();
      toast.success('Quote submitted successfully');
      setOpenQuote(false);
      setProposedValue('');
    },
    onError: () => {
      toast.error('Failed to submit quote');
    },
  });

  const handleQuoteOpen = (lead: any) => {
    setSelectedLead(lead);
    setOpenQuote(true);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposedValue || isNaN(Number(proposedValue))) {
      toast.error('Please enter a valid number');
      return;
    }
    quoteMutation.mutate({ id: selectedLead.id, value: Number(proposedValue) });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Lead Management</h2>
        <Button onClick={() => setOpen(true)}>Add New Lead</Button>
        <AddLeadsForm open={open} setOpen={setOpen} />
      </div>

      <div className="grid gap-4">
        {leadsData &&
          leadsData.length !== 0 &&
          leadsData.map(lead => (
            <Card key={lead.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg capitalize font-semibold">{lead.name}</h3>
                      <Badge className={getStatusColor(lead.badge)}>{lead?.badge}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">
                      {lead.service} - {lead.location}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {lead.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </span>
                      <span>Last contact: 2 hours ago</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary mb-2">£{lead?.value ? lead?.value : '0'}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                      <Button size="sm" onClick={() => handleQuoteOpen(lead)}>
                        Quote
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Quote Dialog */}
      <Dialog open={openQuote} onOpenChange={setOpenQuote}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Quote</DialogTitle>
            <DialogDescription>
              Propose your bid for <strong>{selectedLead?.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleQuoteSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Proposed Value (£)</label>
              <Input type="number" value={proposedValue} onChange={e => setProposedValue(e.target.value)} required />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenQuote(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={quoteMutation.isLoading}>
                {quoteMutation.isLoading ? 'Submitting...' : 'Submit Quote'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TradeLeads;
