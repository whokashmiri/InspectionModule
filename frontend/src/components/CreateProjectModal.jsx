import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function CreateProjectModal({ onCreate }) {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(name); // ✅ Make sure this matches parent prop
    setName('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto">+ New Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogDescription>Enter the name of your new project.</DialogDescription>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <Input
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
