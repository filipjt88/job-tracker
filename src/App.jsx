import { useState, useEffect } from 'react';
import JobForm from './components/JobForm.jsx';
import JobList from './components/JobList.jsx';

function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Novi state za editovanje
  const [editIndex, setEditIndex] = useState(null);
  const [editJob, setEditJob] = useState(null);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    if (editIndex !== null) {
      // Ako je u toku edit, zamenjujemo posao na poziciji editIndex
      const updatedJobs = [...jobs];
      updatedJobs[editIndex] = job;
      setJobs(updatedJobs);
      setEditIndex(null);
      setEditJob(null);
    } else {
      setJobs([...jobs, job]);
    }
  };

  const deleteJob = (index) => {
    setJobs(jobs.filter((_, i) => i !== index));
    // Ako brišemo posao koji je u editovanju, resetuj edit stanje
    if (index === editIndex) {
      setEditIndex(null);
      setEditJob(null);
    }
  };

  const startEditJob = (index) => {
    setEditIndex(index);
    setEditJob(jobs[index]);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container py-5 mt-5">
      <h1 className="text-center mb-4">Job Tracker</h1>

      <div className="row mb-4">
        <div className="col-md-8 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by job title or company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Interview">Interview</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <JobForm addJob={addJob} editJob={editJob} />
      <JobList jobs={filteredJobs} deleteJob={deleteJob} startEditJob={startEditJob} />
    </div>
  );
}

export default App;
