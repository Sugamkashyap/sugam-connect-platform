import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Client {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  workflows: number;
  lastActive: string;
}

const clients: Client[] = [
  {
    id: '1',
    name: 'Dr. Sarah Smith',
    email: 'sarah.smith@example.com',
    status: 'active',
    workflows: 5,
    lastActive: '2024-01-15'
  },
  {
    id: '2',
    name: 'Dr. John Davis',
    email: 'john.davis@example.com',
    status: 'active',
    workflows: 3,
    lastActive: '2024-01-14'
  },
  {
    id: '3',
    name: 'Dr. Emily Chen',
    email: 'emily.chen@example.com',
    status: 'pending',
    workflows: 0,
    lastActive: '2024-01-13'
  },
  {
    id: '4',
    name: 'Dr. Michael Brown',
    email: 'michael.brown@example.com',
    status: 'inactive',
    workflows: 2,
    lastActive: '2024-01-10'
  },
  {
    id: '5',
    name: 'Dr. Lisa Wilson',
    email: 'lisa.wilson@example.com',
    status: 'active',
    workflows: 4,
    lastActive: '2024-01-15'
  }
];

const ClientTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Client>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Client) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredClients = clients
    .filter(client =>
      (client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       client.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || client.status === statusFilter)
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clients</CardTitle>
        <div className="flex items-center gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('name')}>
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('email')}>
                  Email
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('status')}>
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('workflows')}>
                  Workflows
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('lastActive')}>
                  Last Active
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${{
                      active: 'bg-green-100 text-green-800',
                      inactive: 'bg-gray-100 text-gray-800',
                      pending: 'bg-yellow-100 text-yellow-800'
                    }[client.status]}`}
                  >
                    {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{client.workflows}</TableCell>
                <TableCell>{new Date(client.lastActive).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ClientTable;