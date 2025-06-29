import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DashboardHeader from '../components/DashboardHeader';
import ProjectTabs from '../components/ProjectTabs';
import ProjectGrid from '../components/ProjectGrid';
import CreateProjectModal from '../components/CreateProjectModal';
import { API_BASE_URL } from '@/constants/config';
import { TABS } from '@/constants/tabs';
import useProjectTabs from '@/hooks/useProjectTabs';

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [selectedTab, setSelectedTab] = useState(TABS.NEW);
  const [showModal, setShowModal] = useState(false);
  const [company, setCompany] = useState(null);
  const [role, setRole] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const selectedCompanyId = localStorage.getItem('selectedCompanyId');
  const { filteredProjects } = useProjectTabs(projects, selectedTab);

  useEffect(() => {
    if (!token) {
      toast.error('Unauthorized. Please log in.');
      navigate('/login');
      return;
    }

    if (!selectedCompanyId) {
      toast.error('Please select a company first.');
      navigate('/select-company');
      return;
    }

    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/projects/company/${selectedCompanyId}`, {
        

          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
          console.log('🔍 API response:', data);
        if (res.ok) {
          setProjects(data.projects || []);
          setCompany(data.company || '');
          setRole(data.role || '');
          console.log('🏢 Company:', data.company, '👤 Role:', data.role);

        } else {
          toast.error(data.message || 'Failed to fetch projects.');
        }
      } catch (err) {
        console.error(err);
        toast.error('Error fetching data.');
      }
    };

    fetchProjects();
  }, [navigate, selectedCompanyId, token]);

  const handleProjectCreated = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    setSelectedTab(TABS.NEW);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-4 md:p-8">
      <DashboardHeader company={company} role={role} />
      <div className="flex items-center justify-between mt-6 mb-4">
        <ProjectTabs selected={selectedTab} onChange={setSelectedTab} />
        {role === 'admin' && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            + Create Project
          </button>
        )}
      </div>

      <ProjectGrid projects={filteredProjects} onUpdate={setProjects} />

      {showModal && (
        <CreateProjectModal
          onClose={() => setShowModal(false)}
          onCreate={handleProjectCreated}
        />
      )}
    </div>
  );
}
