export default function ProjectTabs({ selected, onChange }) {
  const tabs = ['New', 'Recent', 'Favorite', 'Done'];

  return (
    <div className="flex gap-4 my-4 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2 rounded-full font-medium transition-all border ${
            selected === tab
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700 dark:bg-zinc-700 dark:text-gray-300'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
