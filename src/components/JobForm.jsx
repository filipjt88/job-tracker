import { useState, useEffect } from 'react';

function JobForm({ addJob, editJob }) {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState('Pending');

    // Kada editJob promeni vrednost, popuni formu
    useEffect(() => {
        if (editJob) {
            setTitle(editJob.title);
            setCompany(editJob.company);
            setStatus(editJob.status);
        } else {
            setTitle('');
            setCompany('');
            setStatus('Pending');
        }
    }, [editJob]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !company.trim()) {
            alert('Please fill in all fields');
            return;
        }

        const newJob = { title, company, status };
        addJob(newJob);

        if (!editJob) {
            // Ako nije editovanje, resetuj formu
            setTitle('');
            setCompany('');
            setStatus('Pending');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
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
                            <div className="col-md-4">
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
                            <div className="col-md-3">
                                <button type="submit" className="btn btn-primary form-control">
                                    {editJob ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default JobForm;
