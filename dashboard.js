document.addEventListener('DOMContentLoaded', () => {
    // Select all subject cards
    const cards = document.querySelectorAll('.subject-card');

    cards.forEach(card => {
        const editBtn = card.querySelector('.edit-btn');
        const saveBtn = card.querySelector('.save-btn');
        const timeDisplay = card.querySelector('.time-display');
        const timeEditMode = card.querySelector('.time-edit-mode');
        const startTimeInput = card.querySelector('.start-time');
        const endTimeInput = card.querySelector('.end-time');

        // Handle Edit button click
        editBtn.addEventListener('click', () => {
            // Hide display, show edit inputs
            timeDisplay.classList.add('hidden');
            timeEditMode.classList.remove('hidden');
            
            // Toggle buttons
            editBtn.classList.add('hidden');
            saveBtn.classList.remove('hidden');
        });

        // Handle Save button click
        saveBtn.addEventListener('click', () => {
            // Get values from inputs
            const startVal = startTimeInput.value;
            const endVal = endTimeInput.value;

            // Format times to 12-hour AM/PM format
            const formattedStart = formatTime(startVal);
            const formattedEnd = formatTime(endVal);

            // Update display text
            timeDisplay.textContent = `${formattedStart} - ${formattedEnd}`;

            // Show display, hide edit inputs
            timeDisplay.classList.remove('hidden');
            timeEditMode.classList.add('hidden');

            // Toggle buttons
            saveBtn.classList.add('hidden');
            editBtn.classList.remove('hidden');

            // Optional: Here you would typically make an API call to save the timing to the database.
            console.log(`Saved new timing for ${card.dataset.subject}: ${formattedStart} to ${formattedEnd}`);
        });
    });

    // Helper function to format 24h time to 12h AM/PM format
    function formatTime(timeStr) {
        if (!timeStr) return "Invalid Time";
        let [hours, minutes] = timeStr.split(':');
        hours = parseInt(hours, 10);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const paddedHours = hours < 10 ? '0' + hours : hours;
        return `${paddedHours}:${minutes} ${ampm}`;
    }
});

// Function to handle joining a class
window.joinClass = function(btn, defaultLink) {
    // In a real application, you would check if the current time is within the scheduled time.
    // For this demonstration, we will just open the meeting link in a new tab.
    
    // Optional UI feedback
    const originalText = btn.innerHTML;
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Joining...`;
    
    setTimeout(() => {
        window.open(defaultLink, '_blank');
        btn.innerHTML = originalText;
    }, 800);
};

// Chat Widget Functionality
document.addEventListener('DOMContentLoaded', () => {
    const chatToggleBtn = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatCloseBtn = document.getElementById('chat-close');
    const chatSendBtn = document.getElementById('chat-send');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    // Toggle chat window
    if(chatToggleBtn) {
        chatToggleBtn.addEventListener('click', () => {
            chatWindow.classList.toggle('hidden');
            if (!chatWindow.classList.contains('hidden')) {
                chatInput.focus();
            }
        });
    }

    // Close chat window
    if(chatCloseBtn) {
        chatCloseBtn.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
        });
    }

    // Send message function
    const sendMessage = () => {
        const text = chatInput.value.trim();
        if (text === '') return;

        // Create user message element
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageEl = document.createElement('div');
        messageEl.className = 'message sent';
        messageEl.innerHTML = `
            <p>${text}</p>
            <span class="timestamp">${timeString}</span>
        `;
        
        chatMessages.appendChild(messageEl);
        chatInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate teacher reply after a short delay
        setTimeout(() => {
            const replyEl = document.createElement('div');
            replyEl.className = 'message received';
            replyEl.innerHTML = `
                <p>Thanks for your question! A teacher will respond shortly.</p>
                <span class="timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            `;
            chatMessages.appendChild(replyEl);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1500);
    };

    // Send on button click
    if(chatSendBtn) {
        chatSendBtn.addEventListener('click', sendMessage);
    }

    // Send on Enter key
    if(chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});


    // Role-based UI updates
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role') || 'student'; // default to student

    const userInfoH4 = document.querySelector('.user-info h4');
    const userInfoP = document.querySelector('.user-info p');
    if (role === 'teacher') {
        if(userInfoH4) userInfoH4.textContent = 'Teacher Account';
        if(userInfoP) userInfoP.textContent = 'Admin Access';
    } else {
        if(userInfoH4) userInfoH4.textContent = 'Student Account';
        if(userInfoP) userInfoP.textContent = 'Standard Access';
        
        // Hide all edit buttons
        const editBtns = document.querySelectorAll('.edit-btn');
        editBtns.forEach(btn => btn.style.display = 'none');
    }

    // Update Sidebar Links
    const dashboardLink = document.querySelector('.nav-links a:nth-child(1)');
    const materialsLink = document.querySelector('.nav-links a:nth-child(3)');
    
    if(dashboardLink) dashboardLink.href = 'dashboard.html?role=' + role;
    if(materialsLink) materialsLink.href = 'materials.html?role=' + role;
    const attendanceLink = document.querySelector('.nav-links a:nth-child(4)');
    if(attendanceLink) attendanceLink.href = 'attendance.html?role=' + role;

