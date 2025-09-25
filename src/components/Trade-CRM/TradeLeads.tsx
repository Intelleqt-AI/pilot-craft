import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone } from 'lucide-react';

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

const leads = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'Manchester',
    service: 'Bathroom Renovation',
    value: '£3,200',
    status: 'hot',
    lastContact: '2 hours ago',
    phone: '07123 456 789',
    email: 'sarah.j@email.com',
  },
  {
    id: 2,
    name: 'Mike Thompson',
    location: 'Liverpool',
    service: 'Kitchen Installation',
    value: '£5,500',
    status: 'warm',
    lastContact: '1 day ago',
    phone: '07234 567 890',
    email: 'mike.t@email.com',
  },
  {
    id: 3,
    name: 'Emma Davis',
    location: 'Birmingham',
    service: 'Plumbing Repair',
    value: '£450',
    status: 'cold',
    lastContact: '3 days ago',
    phone: '07345 678 901',
    email: 'emma.d@email.com',
  },
];

const TradeLeads = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Lead Management</h2>
        <Button>Add New Lead</Button>
      </div>

      <div className="grid gap-4">
        {leads.map(lead => (
          <Card key={lead.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold">{lead.name}</h3>
                    <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
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
                    <span>Last contact: {lead.lastContact}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary mb-2">{lead.value}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Contact
                    </Button>
                    <Button size="sm">Quote</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TradeLeads;
