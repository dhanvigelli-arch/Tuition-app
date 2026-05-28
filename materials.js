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

    // Update Sidebar Links
    const dashboardLink = document.querySelector('.nav-links a:nth-child(1)');
    const materialsLink = document.querySelector('.nav-links a:nth-child(3)');
    
    if(dashboardLink) dashboardLink.href = 'dashboard.html?role=' + role;
    if(materialsLink) materialsLink.href = 'materials.html?role=' + role;
    const attendanceLink = document.querySelector('.nav-links a:nth-child(4)');
    if(attendanceLink) attendanceLink.href = 'attendance.html?role=' + role;
});

