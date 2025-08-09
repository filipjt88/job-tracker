import { useState } from "react";
import JobForm from './components/JobForm.jsx';
import JobList from './components/JobList.jsx';

function App() {
  const [jobs, setJobs] = useState([]);

  const addJob = (job) => {
    setJobs([...jobs, job]);
  };

  const deleteJob = (index) => {
    setJobs(jobs.filter((_, i) => i !== index));
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Job Tracker</h1>
      <JobForm addJob={addJob} />
      <JobList jobs={jobs} deleteJob={deleteJob} />
    </div>
  );
}

export default App;