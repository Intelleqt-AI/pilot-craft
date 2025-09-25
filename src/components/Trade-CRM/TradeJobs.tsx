import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const jobs = {
  'To Do': [
    { id: 1, title: 'Kitchen Installation - Thompson', client: 'Mike Thompson', dueDate: 'Mar 15', priority: 'high' },
    { id: 2, title: 'Bathroom Survey - Wilson', client: 'Jane Wilson', dueDate: 'Mar 18', priority: 'medium' },
  ],
  'In Progress': [
    { id: 3, title: 'Plumbing Repair - Johnson', client: 'Sarah Johnson', dueDate: 'Mar 12', priority: 'high' },
    { id: 4, title: 'Boiler Service - Brown', client: 'Tom Brown', dueDate: 'Mar 14', priority: 'low' },
  ],
  Completed: [
    { id: 5, title: 'Heating Installation - Smith', client: 'Lisa Smith', dueDate: 'Mar 10', priority: 'medium' },
    { id: 6, title: 'Pipe Repair - Jones', client: 'David Jones', dueDate: 'Mar 8', priority: 'low' },
  ],
};

const TradeJobs = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Job Management</h2>
        <Button>Add New Job</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(jobs).map(([status, jobList]) => (
          <Card key={status}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                {status}
                <Badge variant="secondary">{jobList.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {jobList.map(job => (
                  <div key={job.id} className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-2">{job.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{job.client}</p>
                    <div className="flex items-center justify-between">
                      <Badge className={getPriorityColor(job.priority)}>{job.priority}</Badge>
                      <span className="text-sm text-muted-foreground">{job.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TradeJobs;
