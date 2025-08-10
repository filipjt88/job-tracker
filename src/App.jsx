import { useState, useEffect } from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import JobFilters from "./components/JobFilters";

function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [filters, setFilters] = useState({ searchTerm: "", status: "" });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    setJobs([...jobs, job]);
  };

  const deleteJob = (index) => {
    setJobs(jobs.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
  };

  const updateJob = (updatedJob) => {
    const newJobs = jobs.map((job, i) => (i === editIndex ? updatedJob : job));
    setJobs(newJobs);
    setEditIndex(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({ searchTerm: "", status: "" });
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      filters.searchTerm.trim() === "" ||
      job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.searchTerm.toLowerCase());

    const matchesStatus =
      filters.status === "" || job.status === filters.status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Job Tracker</h1>
      <JobFilters
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />
      <JobForm
        addJob={addJob}
        editJob={editIndex !== null ? jobs[editIndex] : null}
        updateJob={updateJob}
      />
      <JobList jobs={filteredJobs} deleteJob={deleteJob} startEdit={startEdit} />
    </div>
  );
}

export default App;
