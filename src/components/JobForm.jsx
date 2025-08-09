import { useState } from "react";

function JobForm({ addJob }) {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState('Pending');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !company.trim()) {
            alert('Please fill in all fields');
            return;
        }

        const newJob = { title, company, status };
        addJob(newJob);

        // Reset form
        setTitle('');
        setCompany('');
        setStatus('Pending');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="row g-3">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Job Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
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
                <div className="col-md-1">
                    <button type="submit" className="btn btn-primary w-100">Add</button>
                </div>
            </div>
        </form>
    );
}

export default JobForm;