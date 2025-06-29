import React from 'react';
import { Button } from '@/components/ui/button';
import { MoreVertical, Star } from 'lucide-react';

export default function ProjectCard({ project, isAdmin, onFavorite, onDone, onRename }) {
  const assetCount = project.assetsCount || 0; // Ensure you populate this from backend or count manually in frontend

  return (
    <div className="border rounded-2xl p-4 shadow-md bg-white dark:bg-zinc-800 relative">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-bold text-lg text-zinc-800 dark:text-white">{project.name}</h2>
          {isAdmin && project.createdBy?.fullName && (
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
              Created by: {project.createdBy.fullName}
            </p>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Assets: {assetCount}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onFavorite(project._id)}
            className="text-yellow-500 hover:text-yellow-600 transition"
            title={project.isFavorite ? 'Unfavorite' : 'Mark as Favorite'}
          >
            {project.isFavorite ? <Star fill="currentColor" /> : <Star className='fill-gray-500'/>}
          </button>

          <button
            onClick={() => onRename(project)}
            className="text-gray-500 hover:text-gray-700 transition"
            title="Rename Project"
          >
            <MoreVertical />
          </button>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <Button
          variant="outline"
          onClick={() => onDone(project._id)}
          className="text-sm"
        >
          {project.isDone ? 'Undo Done' : 'Mark Done'}
        </Button>
      </div>
    </div>
  );
}
