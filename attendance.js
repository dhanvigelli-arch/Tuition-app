document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role') || 'student';

    const userInfoH4 = document.querySelector('.user-info h4');
    const userInfoP = document.querySelector('.user-info p');
    const teacherView = document.getElementById('teacher-attendance-view');
    const studentView = document.getElementById('student-attendance-view');
    const headerTitle = document.getElementById('attendance-header-title');
    const headerSubtitle = document.getElementById('attendance-header-subtitle');

    if (role === 'teacher') {
        if(userInfoH4) userInfoH4.textContent = 'Teacher Account';
        if(userInfoP) userInfoP.textContent = 'Admin Access';
        headerTitle.textContent = 'Take Attendance';
        headerSubtitle.textContent = 'Mark attendance for your classes';
        teacherView.classList.remove('hidden');
    } else {
        if(userInfoH4) userInfoH4.textContent = 'Student Account';
        if(userInfoP) userInfoP.textContent = 'Standard Access';
        headerTitle.textContent = 'My Attendance';
        headerSubtitle.textContent = 'View your attendance record';
        studentView.classList.remove('hidden');
    }

    // Update Navigation Links
    const dashboardLink = document.querySelector('.nav-links a:nth-child(1)');
    const materialsLink = document.querySelector('.nav-links a:nth-child(3)');
    const attendanceLink = document.querySelector('.nav-links a:nth-child(4)');

    if(dashboardLink) dashboardLink.href = 'dashboard.html?role=' + role;
    if(materialsLink) materialsLink.href = 'materials.html?role=' + role;
    if(attendanceLink) attendanceLink.href = 'attendance.html?role=' + role;

    // Teacher View Interactive Logic
    if (role === 'teacher') {
        const rows = document.querySelectorAll('.attendance-table tbody tr');
        rows.forEach(row => {
            const btns = row.querySelectorAll('.btn-mark');
            const statusBadge = row.querySelector('.status-badge');

            btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active from all
                    btns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    // Update badge
                    statusBadge.className = 'status-badge'; // reset
                    if (btn.classList.contains('present-btn')) {
                        statusBadge.classList.add('present');
                        statusBadge.textContent = 'Present';
                    } else if (btn.classList.contains('absent-btn')) {
                        statusBadge.classList.add('absent');
                        statusBadge.textContent = 'Absent';
                    } else if (btn.classList.contains('late-btn')) {
                        statusBadge.classList.add('late');
                        statusBadge.textContent = 'Late';
                    }
                });
            });
        });

        const submitBtn = document.querySelector('.submit-attendance-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                submitBtn.textContent = 'Saved Successfully!';
                submitBtn.style.background = '#10b981';
                setTimeout(() => {
                    submitBtn.textContent = 'Save Attendance';
                    submitBtn.style.background = '';
                }, 2000);
            });
        }
    }
});
