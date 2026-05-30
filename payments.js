document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role') || 'student';

    const userInfoH4 = document.querySelector('.user-info h4');
    const userInfoP = document.querySelector('.user-info p');
    const teacherView = document.getElementById('teacher-payments-view');
    const studentView = document.getElementById('student-payments-view');

    if (role === 'teacher') {
        if(userInfoH4) userInfoH4.textContent = 'Teacher Account';
        if(userInfoP) userInfoP.textContent = 'Admin Access';
        teacherView.classList.remove('hidden');
    } else {
        if(userInfoH4) userInfoH4.textContent = 'Student Account';
        if(userInfoP) userInfoP.textContent = 'Standard Access';
        studentView.classList.remove('hidden');
    }

    const dashboardLink = document.querySelector('.nav-links a:nth-child(1)');
    const materialsLink = document.querySelector('.nav-links a:nth-child(2)');
    const attendanceLink = document.querySelector('.nav-links a:nth-child(3)');
    const paymentsLink = document.querySelector('.nav-links a:nth-child(4)');

    if(dashboardLink) dashboardLink.href = 'dashboard.html?role=' + role;
    if(materialsLink) materialsLink.href = 'materials.html?role=' + role;
    if(attendanceLink) attendanceLink.href = 'attendance.html?role=' + role;
    if(paymentsLink) paymentsLink.href = 'payments.html?role=' + role;

    if (role === 'teacher') {
        const remindBtns = document.querySelectorAll('.send-reminder-btn');
        remindBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tr = e.target.closest('tr');
                const countSpan = tr.querySelector('.reminder-count');
                if(countSpan) {
                    let current = parseInt(countSpan.textContent);
                    countSpan.textContent = current + 1;
                }
                btn.textContent = 'Sent!';
                btn.classList.add('sent');
                setTimeout(() => {
                    btn.textContent = 'Send Reminder';
                    btn.classList.remove('sent');
                }, 2000);
            });
        });
    }

    if (role === 'student') {
        const payBtn = document.getElementById('pay-now-btn');
        const modal = document.getElementById('checkout-modal');
        const closeBtn = document.getElementById('close-modal-btn');
        const confirmBtn = document.getElementById('confirm-payment-btn');
        const checkoutBody = document.querySelector('.checkout-body');
        const checkoutSuccess = document.getElementById('checkout-success');

        if(payBtn) {
            payBtn.addEventListener('click', () => {
                modal.classList.remove('hidden');
            });
        }

        if(closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.add('hidden');
                setTimeout(() => {
                    checkoutBody.classList.remove('hidden');
                    checkoutSuccess.classList.add('hidden');
                }, 300);
            });
        }

        if(confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                checkoutBody.classList.add('hidden');
                checkoutSuccess.classList.remove('hidden');
                
                setTimeout(() => {
                    const banner = document.querySelector('.reminder-banner');
                    if(banner) banner.style.display = 'none';
                    
                    const dueAmt = document.querySelector('.due-info h2');
                    if(dueAmt) dueAmt.textContent = '$0.00';
                    const dueDate = document.querySelector('.due-info p');
                    if(dueDate) dueDate.innerHTML = 'Fully Paid';
                    payBtn.style.display = 'none';
                }, 1000);
                
                setTimeout(() => {
                    modal.classList.add('hidden');
                }, 3000);
            });
        }
    }
});
