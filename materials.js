document.addEventListener('DOMContentLoaded', () => {
    // Role-based UI updates
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role') || 'student'; // default to student

    const userInfoH4 = document.querySelector('.user-info h4');
    const userInfoP = document.querySelector('.user-info p');
    const uploadBtn = document.getElementById('upload-material-btn');

    if (role === 'teacher') {
        if(userInfoH4) userInfoH4.textContent = 'Teacher Account';
        if(userInfoP) userInfoP.textContent = 'Admin Access';
        if(uploadBtn) uploadBtn.classList.remove('hidden');
    } else {
        if(userInfoH4) userInfoH4.textContent = 'Student Account';
        if(userInfoP) userInfoP.textContent = 'Standard Access';
    }

        // Update all nav links dynamically based on role
    const allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(link => {
        if(link.textContent.includes('Dashboard')) link.href = 'dashboard.html?role=' + role;
        if(link.textContent.includes('Materials') || link.textContent.includes('Students')) link.href = 'materials.html?role=' + role;
        if(link.textContent.includes('Attendance')) link.href = 'attendance.html?role=' + role;
        if(link.textContent.includes('Progress')) link.href = 'progress.html?role=' + role;
        if(link.textContent.includes('Payments')) link.href = 'payments.html?role=' + role;
    });
