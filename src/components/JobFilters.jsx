import { useState } from "react";

// Job filters
function JobFilters({ onFilterChange, onReset }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            setError("Search cannot be empty or spaces only.");
            onFilterChange({ searchTerm: "", status });
            return;
        } else {
            setError("");
        }

        onFilterChange({ searchTerm: value, status });
    };

    // Change handle status
    const handleStatusChange = (e) => {
        const value = e.target.value;
        setStatus(value);
        onFilterChange({ searchTerm, status: value });
    };

    const handleReset = () => {
        setSearchTerm("");
        setStatus("");
        setError("");
        onReset();
    };

    return (
        <div className="container mb-4">
            {error && (
                <div className="alert alert-danger py-1 mb-2 text-center">{error}</div>
            )}
            <div className="row g-3 align-items-center">
                <div className="col-md-5">
                    <input
                        type="text"
                        className={`form-control ${error ? "is-invalid" : ""}`}
                        placeholder="Search by job title or company"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <div className="invalid-feedback">{error}</div>
                </div>
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={status}
                        onChange={handleStatusChange}
                    >
                        <option value="">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Interview">Interview</option>
                        <option value="Offered">Offered</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <button
                        className="btn btn-secondary w-100"
                        onClick={handleReset}
                        type="button"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>
        </div>
    );
}

export default JobFilters;
