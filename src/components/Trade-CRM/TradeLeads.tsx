import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLeads } from "@/lib/api";
import AddLeadsForm from "./AddLeadsForm";

const getStatusColor = (status: string) => {
  switch (status) {
    case "hot":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "warm":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
    case "cold":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

const TradeLeads = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const {
    data: leadsData,
    isLoading: leadsLoading,
    error: leadsErros,
    refetch: refetchLeads,
  } = useQuery({
    queryKey: ["fetchLeads"],
    queryFn: fetchLeads,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Lead Management</h2>
        <AddLeadsForm open={open} setOpen={setOpen} />
      </div>

      <div className="grid gap-4">
        {leadsData &&
          leadsData.length !== 0 &&
          leadsData.map((lead) => (
            <Card key={lead.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold">{lead.name}</h3>
                      <Badge className={getStatusColor(lead.badge)}>
                        {lead.badge}
                      </Badge>
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
                    <p className="text-xl font-bold text-primary mb-2">
                      £{lead?.value ? lead?.value : "0"}
                    </p>
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
