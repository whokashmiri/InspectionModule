import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '@/constants/config';

export default function CreateFolderModal({ projectId, onCreated }) {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/folders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, projectId }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Folder created');
        onCreated(data); // optional: trigger re-fetch
        setOpen(false);
        setName('');
      } else {
        toast.error(data.message || 'Failed to create folder');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">+ Add Folder</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleCreate} className="space-y-4">
          <h2 className="text-lg font-semibold">Add Folder</h2>
          <Input
            placeholder="Folder name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">Create Folder</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
