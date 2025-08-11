import { useState, useEffect } from "react";

// Job Form
function JobForm({ addJob, editJob, updateJob }) {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [status, setStatus] = useState("Pending");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (editJob) {
            setTitle(editJob.title);
            setCompany(editJob.company);
            setStatus(editJob.status);
            setDescription(editJob.description || "");
            setError("");
        }
    }, [editJob]);


    // HandleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !company.trim() || !description.trim()) {
            setError("All fields are required.");
            return;
        }

        const jobData = { title, company, status, description };

        if (editJob) {
            updateJob(jobData);
        } else {
            addJob(jobData);
        }

        setTitle("");
        setCompany("");
        setStatus("Pending");
        setDescription("");
        setError("");
    };

    return (
        <div className="container py-4">
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-3">
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Job Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <select
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Interview">Interview</option>
                            <option value="Offered">Offered</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <textarea
                            className="form-control"
                            placeholder="Job Description"
                            rows="1"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="col-md-12">
                        <button type="submit" className="btn btn-primary w-100">
                            {editJob ? "Update" : "Add"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default JobForm;
