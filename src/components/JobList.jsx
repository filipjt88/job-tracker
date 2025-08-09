function JobList({ jobs, deleteJob, startEditJob }) {
    if (jobs.length === 0) {
        return <p className="text-center">No jobs added yet.</p>;
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th style={{ width: '140px' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {jobs.map((job, index) => (
                    <tr key={index}>
                        <td>{job.title}</td>
                        <td>{job.company}</td>
                        <td>{job.status}</td>
                        <td>
                            <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => startEditJob(index)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteJob(index)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default JobList;
