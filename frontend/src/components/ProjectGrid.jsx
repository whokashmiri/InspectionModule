import React from 'react';
import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects, onFavorite, onDone, onDelete }) {
  if (!projects.length) {
    return <p className="text-center text-gray-500 dark:text-gray-400">No projects to show.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          onFavorite={onFavorite}
          onDone={onDone}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}