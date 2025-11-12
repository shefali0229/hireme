document.getElementById('addJobBtn').addEventListener('click', function() {
    toggleFormVisibility('addJobForm');
});
document.getElementById('updateJobBtn').addEventListener('click', function() {
    toggleFormVisibility('updateJobForm');
});
document.getElementById('deleteJobBtn').addEventListener('click', function() {
    toggleFormVisibility('deleteJobForm');
});
document.getElementById('viewJobBtn').addEventListener('click', function() {
    toggleFormVisibility('viewJobForm');
    viewJobs();
});

// Function to toggle form visibility
function toggleFormVisibility(formId) {
    const forms = document.getElementsByClassName('form-container');
    for (let i = 0; i < forms.length; i++) {
        forms[i].style.display = 'none'; // Hide all forms
    }
    document.getElementById(formId).style.display = 'block'; // Show selected form
}

// Add Job Functionality
function addJob() {
    const jobId = document.getElementById('jobId').value;
    const jobName = document.getElementById('jobName').value;
    const experience = document.getElementById('experience').value;
    const contact = document.getElementById('contact').value;

    if (jobId && jobName && experience && contact) {
        let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        const newJob = { id: jobId, name: jobName, experience: experience, contact: contact };
        jobs.push(newJob);
        localStorage.setItem('jobs', JSON.stringify(jobs));

        alert('Job added successfully!');
        document.getElementById('addJobForm').reset();
    } else {
        alert('Please fill all fields.');
    }
}

// Update Job Functionality
function updateJob() {
    const jobId = document.getElementById('updateJobId').value;
    const jobName = document.getElementById('updateJobName').value;
    const experience = document.getElementById('updateJobExperience').value;
    const contact = document.getElementById('updateJobContact').value;

    if (jobId && jobName && experience && contact) {
        let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        const jobIndex = jobs.findIndex(job => job.id === jobId);

        if (jobIndex !== -1) {
            jobs[jobIndex].name = jobName;
            jobs[jobIndex].experience = experience;
            jobs[jobIndex].contact = contact;
            localStorage.setItem('jobs', JSON.stringify(jobs));

            alert('Job updated successfully!');
            document.getElementById('updateJobForm').reset();
        } else {
            alert('Job ID not found.');
        }
    } else {
        alert('Please fill all fields.');
    }
}

// Delete Job Functionality
function deleteJob() {
    const jobId = document.getElementById('deleteJobId').value;

    if (jobId) {
        let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        const updatedJobs = jobs.filter(job => job.id !== jobId);

        if (updatedJobs.length !== jobs.length) {
            localStorage.setItem('jobs', JSON.stringify(updatedJobs));
            alert('Job deleted successfully!');
            document.getElementById('deleteJobForm').reset();
        } else {
            alert('Job ID not found.');
        }
    } else {
        alert('Please enter a valid Job ID.');
    }
}

// View Jobs Functionality
function viewJobs() {
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const jobListContainer = document.getElementById('jobList');
    jobListContainer.innerHTML = '';

    if (jobs.length > 0) {
        jobs.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.innerHTML = `
                <h3>Job ID: ${job.id}</h3>
                <p><strong>Job Name:</strong> ${job.name}</p>
                <p><strong>Experience:</strong> ${job.experience}</p>
                <p><strong>Contact:</strong> ${job.contact}</p>
            `;
            jobListContainer.appendChild(jobElement);
        });
    } else {
        jobListContainer.innerHTML = '<p>No jobs available.</p>';
    }
}
