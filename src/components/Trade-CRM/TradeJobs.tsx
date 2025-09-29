'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { fetchJobs, postJobs, updateJobStatus } from '@/lib/api';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  useDroppable,
  DragOverlay,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';

// Utility to get badge color
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Sortable Job Card
const SortableJobCard = React.memo(({ job, user }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: job.id });
  const style = { transform: CSS?.Transform?.toString(transform), transition, willChange: 'transform' } as React.CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-3 rounded-lg border bg-white hover:bg-gray-50 ${
        isDragging ? 'shadow-lg opacity-50 cursor-grabbing' : 'border-gray-200 cursor-grab'
      }`}
      key={job.id}
    >
      <h4 className="font-medium mb-2">
        {job.trade} - {user?.first_name}
      </h4>
      <p className="text-sm text-muted-foreground mb-2">
        {user?.first_name} {user?.last_name}
      </p>
      <div className="flex items-center justify-between">
        <Badge className={getPriorityColor(job.priority)}>{job?.priority}</Badge>
        <span className="text-sm text-muted-foreground">
          {job.created_at ? new Date(job.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
        </span>
      </div>
    </div>
  );
});

// Droppable Column
const DroppableColumn = React.memo(({ column, visibleCount, onLoadMore, children, isDraggingOver }: any) => {
  const { setNodeRef } = useDroppable({ id: column.id });
  const isEmpty = !column.items || column.items.length === 0;

  return (
    <div
      ref={setNodeRef}
      className={`bg-white border rounded-xl p-4 shadow-sm ${isDraggingOver ? '!border-gray-500 border-dashed !bg-[#f9f8f6]' : ''}`}
      style={{ minHeight: '150px' }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-medium text-gray-900">{column.name}</span>
        <Badge className="bg-black">{column.items?.length || 0}</Badge>
      </div>

      <div className="space-y-3">
        {children}
        {isEmpty && <div className="py-10 text-center text-gray-400 text-sm select-none">Drop jobs here</div>}

        {visibleCount < (column.items?.length || 0) && (
          <button
            onClick={() => onLoadMore(column.id)}
            className="w-full text-xs text-gray-500 hover:text-black py-2 flex justify-center items-center gap-1"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
});

export default function TradeJobs() {
  const queryClient = useQueryClient();
  const { data: jobsData, isLoading } = useQuery({ queryKey: ['Jobs'], queryFn: fetchJobs });
  const postMutation = useMutation({
    mutationFn: postJobs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Jobs'] });
      toast('Job added successfully');
    },
    onError: () => {
      toast('Error! Try again');
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: updateJobStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['Jobs'] }),
    onError: () => toast.error('Failed to update job status'),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tradeValue, setTradeValue] = useState('');
  const [availability, setAvailability] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [priceRange, setPriceRange] = useState(0);
  const [tagsValue, setTagsValue] = useState('');
  const [tasks, setTasks] = useState<any[]>([]);
  const [priority, setPriority] = useState('Low');
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});
  const [activeID, setActiveID] = useState<string | null>(null);
  const [overID, setOverID] = useState<string | null>(null);
  const { profile: user } = useAuth();

  const columns = ['To Do', 'In Progress', 'Completed'];

  useEffect(() => {
    const colData = columns.map(name => ({
      id: name,
      name,
      items:
        jobsData?.filter((job: any) => {
          if (name === 'To Do') return job.status === 'todo';
          if (name === 'In Progress') return job.status === 'in-progress';
          return job.status === 'complete';
        }) || [],
    }));
    setTasks(colData);

    // Initialize visible counts
    const counts: Record<string, number> = {};
    colData.forEach(col => (counts[col.id] = 10));
    setVisibleCounts(counts);
  }, [jobsData]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleLoadMore = (colId: string) => {
    setVisibleCounts(prev => ({
      ...prev,
      [colId]: Math.min((prev[colId] || 10) + 10, tasks.find(t => t.id === colId)?.items.length || 0),
    }));
  };

  const handleDragStart = (event: DragStartEvent) => setActiveID(event.active.id as string);
  const handleDragOver = (event: DragOverEvent) => setOverID((event.over?.id as string) || null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveID(null);
    setOverID(null);
    if (!over) return;

    const sourceCol = tasks.find(col => col.items.some(item => item.id === active.id));
    const destCol = tasks.find(col => col.id === over.id || col.items.some(item => item.id === over.id));
    if (!sourceCol || !destCol) return;

    const activeIndex = sourceCol.items.findIndex(item => item.id === active.id);
    const movedItem = sourceCol.items[activeIndex];

    // Remove from source
    sourceCol.items.splice(activeIndex, 1);

    // Add to destination
    destCol.items.push({
      ...movedItem,
      status: destCol.id === 'To Do' ? 'todo' : destCol.id === 'In Progress' ? 'in-progress' : 'complete',
    });

    setTasks([...tasks]);

    // Update backend
    updateStatusMutation.mutate({
      jobId: movedItem.id,
      status: destCol.id === 'To Do' ? 'todo' : destCol.id === 'In Progress' ? 'in-progress' : 'complete',
    });
    toast.success(`Job moved to ${destCol.name}`);
  };

  const handleFormSubmit = () => {
    if (!tradeValue || !availability || !locationValue) return toast.error('Please fill required fields');

    const newJob = {
      trade: tradeValue,
      availability,
      location: locationValue,
      rateFrom: priceRange[0],
      rateTo: priceRange[1],
      tags: tagsValue,
      status: 'todo',
      priority,
    };

    postMutation.mutate(newJob);
    setIsModalOpen(false);
    setTradeValue('');
    setAvailability('');
    setLocationValue('');
    setPriceRange(0);
    setTagsValue('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Job Management</h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>Add New Job</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg">Add Job</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label className="text-sm ">Select Trade</Label>
                <Select onValueChange={v => setTradeValue(v)} value={tradeValue}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Trade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electrician">Electrician</SelectItem>
                    <SelectItem value="Plumber">Plumber</SelectItem>
                    <SelectItem value="Carpenter">Carpenter</SelectItem>
                    <SelectItem value="Painter">Painter</SelectItem>
                    <SelectItem value="Roofer">Roofer</SelectItem>
                    <SelectItem value="Heating Engineer">Heating Engineer</SelectItem>
                    <SelectItem value="Kitchen Fitter">Kitchen Fitter</SelectItem>
                    <SelectItem value="Bathroom Fitter">Bathroom Fitter</SelectItem>
                    <SelectItem value="Tiler">Tiler</SelectItem>
                    <SelectItem value="Plasterer">Plasterer</SelectItem>
                    <SelectItem value="Builder">Builder</SelectItem>
                    <SelectItem value="Gardener">Gardener</SelectItem>
                  </SelectContent>
                </Select>{' '}
              </div>{' '}
              <div className="space-y-2">
                <Label className="text-sm">Availability</Label>
                <Select onValueChange={v => setAvailability(v)} value={availability}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available today">Available today</SelectItem>
                    <SelectItem value="Available this week">Available this week</SelectItem>
                    <SelectItem value="Available next week">Available next week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Location</Label>
                <Input
                  placeholder="Enter location or postcode"
                  value={locationValue}
                  onChange={e => setLocationValue(e.target.value)}
                />{' '}
              </div>
              <div className="space-y-2">
                {' '}
                <Label className="text-sm">Price per hour</Label>{' '}
                <div className="px-1">
                  {' '}
                  <Input
                    type="number"
                    value={priceRange}
                    onChange={(e: number[]) => setPriceRange(e.target.value)}
                    className="w-full"
                  />{' '}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mt-2"></div>{' '}
                </div>{' '}
              </div>{' '}
              <div className="space-y-2">
                <Label className="text-sm">Priority</Label>
                <Select onValueChange={v => setPriority(v)} value={priority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Tags</Label>{' '}
                <Input placeholder="eg: emergency, rewiring" value={tagsValue} onChange={e => setTagsValue(e.target.value)} />{' '}
                <p className="text-xs text-muted-foreground mt-1">Separate tags with a comma</p>{' '}
              </div>{' '}
            </div>{' '}
            <DialogFooter>
              {' '}
              <Button onClick={handleFormSubmit}>Save</Button>{' '}
            </DialogFooter>{' '}
          </DialogContent>
        </Dialog>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tasks.map(col => (
            <DroppableColumn
              key={col.id}
              column={col}
              visibleCount={visibleCounts[col.id] || 10}
              onLoadMore={handleLoadMore}
              isDraggingOver={overID === col.id}
            >
              <SortableContext items={col.items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                {col.items.slice(0, visibleCounts[col.id]).map(job => (
                  <SortableJobCard user={user} key={job.id} job={job} />
                ))}
              </SortableContext>
            </DroppableColumn>
          ))}
        </div>

        <DragOverlay>
          {activeID ? (
            <div className={`p-3 border rounded-lg bg-white shadow-lg`}>
              <h4 className="font-medium mb-2">
                {tasks.find(col => col.items.some(item => item.id === activeID))?.items.find(item => item.id === activeID)?.trade} -{' '}
                {user?.first_name}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {user?.first_name} {user?.last_name}
              </p>
              <div className="flex items-center justify-between">
                <Badge
                  className={getPriorityColor(
                    tasks.find(col => col.items.some(item => item.id === activeID))?.items.find(item => item.id === activeID)?.priority
                  )}
                >
                  {tasks.find(col => col.items.some(item => item.id === activeID))?.items.find(item => item.id === activeID)?.priority}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {tasks.find(col => col.items.some(item => item.id === activeID))?.items.find(item => item.id === activeID)?.created_at
                    ? new Date(
                        tasks
                          .find(col => col.items.some(item => item.id === activeID))
                          ?.items.find(item => item.id === activeID)?.created_at
                      ).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : ''}
                </span>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
