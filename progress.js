document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role') || 'student';
    
    // Update links
    document.getElementById('nav-dashboard').href = 'dashboard.html?role=' + role;
    document.getElementById('nav-materials').href = 'materials.html?role=' + role;
    document.getElementById('nav-attendance').href = 'attendance.html?role=' + role;
    document.getElementById('nav-progress').href = 'progress.html?role=' + role;
    document.getElementById('nav-payments').href = 'payments.html?role=' + role;

    const studentView = document.getElementById('student-view');
    const teacherView = document.getElementById('teacher-view');
    const title = document.getElementById('page-title');
    const subtitle = document.getElementById('page-subtitle');
    const userInfoH4 = document.getElementById('user-role-title');
    const userInfoP = document.getElementById('user-role-desc');
    const avatar = document.getElementById('avatar-initial');

    // Chart JS Global Defaults for dark theme
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';

    if (role === 'teacher') {
        studentView.classList.add('hidden');
        teacherView.classList.remove('hidden');
        title.textContent = 'Class Analytics';
        subtitle.textContent = 'Overview of student performance';
        userInfoH4.textContent = 'Teacher Account';
        userInfoP.textContent = 'Admin Access';
        avatar.textContent = 'T';

        // Init Teacher Chart (Bar Chart)
        const ctxT = document.getElementById('teacherChart').getContext('2d');
        new Chart(ctxT, {
            type: 'bar',
            data: {
                labels: ['Maths', 'Science', 'English', 'History'],
                datasets: [{
                    label: 'Class Average %',
                    data: [82, 75, 88, 65],
                    backgroundColor: 'rgba(99, 102, 241, 0.6)',
                    borderColor: '#4f46e5',
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        });

    } else {
        studentView.classList.remove('hidden');
        teacherView.classList.add('hidden');
        
        // Init Student Chart (Line Chart)
        const ctxS = document.getElementById('studentChart').getContext('2d');
        
        // Create Gradient
        let gradient = ctxS.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.5)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

        new Chart(ctxS, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
                datasets: [{
                    label: 'Mock Test Score %',
                    data: [75, 82, 78, 88, 92],
                    borderColor: '#10b981',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#fff',
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        });
    }
});
