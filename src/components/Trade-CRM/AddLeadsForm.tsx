import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postLeads } from '@/lib/api';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

// Lead type for local state and form
interface Lead {
  id: number;
  name: string;
  service?: string;
  location?: string;
  value?: string;
  phone: string;
  email: string;
  lastContact?: string;
  title?: string;
  badge: 'hot' | 'warm' | 'cold';
}

type AddLeadsFormProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  leads: Lead[];
};

const initialForm: Omit<Lead, 'id'> = {
  name: '',
  phone: '',
  email: '',
  badge: 'warm',
  service: '',
  location: '',
  value: '',
};

const AddLeadsForm = ({ open, setOpen }: AddLeadsFormProps) => {
  const [form, setForm] = useState<Omit<Lead, 'id'>>(initialForm);
  const { profile, isCustomer } = useAuth();
  const queryClient = useQueryClient();

  // Pre-fill form with profile data if user is a customer
  useEffect(() => {
    if (isCustomer && profile) {
      setForm(prev => ({
        ...prev,
        name: `${profile?.first_name} ${profile?.last_name}`,
        email: profile.email || '',
        phone: profile.phone || '',
      }));
    }
  }, [isCustomer, profile]);

  const handleDialog = (value: boolean) => {
    setOpen(value);
    if (!isCustomer) {
      setForm(initialForm);
    }
  };

  const mutation = useMutation({
    mutationFn: postLeads,
    onSuccess: () => {
      queryClient.refetchQueries(['fetchLeads']);
      toast('Lead created successfully!');
      handleDialog(false);
    },
    onError: () => {
      toast('Error! Try again');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: 'hot' | 'warm' | 'cold') => {
    setForm(prev => ({ ...prev, badge: value }));
  };

  const handleAddLead = (e?: React.FormEvent) => {
    e?.preventDefault();
    console.log(form);
    mutation.mutate(form);
  };

  const isFormComplete = Boolean(form.name && form.service && form.location && form.value && form.email && form.badge);

  return (
    <Dialog open={open} onOpenChange={handleDialog}>
      <DialogContent className="max-w-3xl w-full">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-2xl font-semibold">Add New {!isCustomer ? 'Lead' : 'Job'}</DialogTitle>
          <DialogDescription className="text-lg text-muted-foreground">
            Fill out the {!isCustomer ? 'lead' : 'job'} details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddLead} className="grid gap-4 text-base font-sans">
          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div className="flex flex-col gap-2 col-span-2">
              <Label>Name</Label>
              <Input name="name" value={form.name} onChange={handleChange} required disabled={isCustomer} />
            </div>

            {/* Service */}
            <div className="flex flex-col gap-2">
              <Label>Service</Label>
              <Select onValueChange={value => setForm(prev => ({ ...prev, service: value }))} value={form.service}>
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
              </Select>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <Label>Location</Label>
              <Input name="location" value={form.location} onChange={handleChange} required />
            </div>

            {/* Value */}
            <div className="flex flex-col gap-2">
              <Label>Value</Label>
              <Input type="number" name="value" value={form.value} onChange={handleChange} placeholder="e.g. £3,200" required />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <Label>Phone</Label>
              <Input name="phone" value={form.phone} onChange={handleChange} required disabled={isCustomer} />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input name="email" value={form.email} onChange={handleChange} required disabled={isCustomer} />
            </div>

            {/* Badge */}
            <div className="flex flex-col gap-2">
              <Label>Badge</Label>
              <Select onValueChange={handleSelectChange} value={form.badge}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="hot"
                    className="hover:!bg-primary hover:!text-primary-foreground data-[state=checked]:!bg-primary data-[state=checked]:!text-primary-foreground"
                  >
                    Hot
                  </SelectItem>
                  <SelectItem
                    value="warm"
                    className="hover:!bg-primary hover:!text-primary-foreground data-[state=checked]:!bg-primary data-[state=checked]:!text-primary-foreground"
                  >
                    Warm
                  </SelectItem>
                  <SelectItem
                    value="cold"
                    className="hover:!bg-primary hover:!text-primary-foreground data-[state=checked]:!bg-primary data-[state=checked]:!text-primary-foreground"
                  >
                    Cold
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button variant="outline" onClick={() => handleDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" className="disabled:opacity-50 disabled:cursor-none" disabled={!isFormComplete}>
              Add {!isCustomer ? 'Lead' : 'Job'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLeadsForm;
