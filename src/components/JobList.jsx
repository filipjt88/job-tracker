// Job list
function JobList({ jobs, deleteJob, startEdit }) {
    if (jobs.length === 0) {
        return <p className="text-center">No jobs yet. Add one above 👆</p>;
    }

    // Table
    return (
        <div className="table-responsive">
            <table className="table table-striped align-middle">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th style={{ minWidth: "250px", maxWidth: "300px" }}>Description</th>
                        <th style={{ width: "130px" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job, index) => (
                        <tr key={index}>
                            <td>{job.title}</td>
                            <td>{job.company}</td>
                            <td>
                                <span
                                    className={`badge ${job.status === "Pending"
                                        ? "bg-warning"
                                        : job.status === "Interview"
                                            ? "bg-info"
                                            : job.status === "Offered"
                                                ? "bg-success"
                                                : "bg-danger"
                                        }`}
                                >
                                    {job.status}
                                </span>
                            </td>
                            <td
                                style={{
                                    maxHeight: "100px",
                                    overflowY: "auto",
                                    whiteSpace: "normal",
                                }}
                                title={job.description}
                            >
                                {job.description}
                            </td>
                            <td>
                                <div className="d-flex gap-2 flex-wrap">
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => startEdit(index)}
                                        title="Edit"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => deleteJob(index)}
                                        title="Delete"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default JobList;
