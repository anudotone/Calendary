document.addEventListener('DOMContentLoaded', function () {
    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');
    const daysContainer = document.getElementById('days');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    let currentDate = new Date();
    let today = new Date();

    // 1. Populate the dropdown lists dynamically
    function initDropdowns() {
        // Populate months
        months.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = month;
            monthSelect.appendChild(option);
        });

        // Populate years (e.g., 50 years in the past up to 50 years in the future)
        const currentYear = today.getFullYear();
        for (let y = currentYear - 50; y <= currentYear + 50; y++) {
            const option = document.createElement('option');
            option.value = y;
            option.textContent = y;
            yearSelect.appendChild(option);
        }
    }

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();
        
        // selectors to show the currently viewing month and year
        monthSelect.value = month;
        yearSelect.value = year;
        
        daysContainer.innerHTML = '';
        
        // Previous month's dates
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDay; i > 0; i--) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = prevMonthLastDay - i + 1;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }
        
        // Current month's dates
        for (let i = 1; i <= lastDay; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add('today');
            }
            daysContainer.appendChild(dayDiv);
        }
        
        // Next month's dates (Always fill up to exactly 42 slots total)
        const totalSlots = 42;
        const currentSlotsUsed = firstDay + lastDay;
        const nextMonthDaysNeeded = totalSlots - currentSlotsUsed;
        for (let i = 1; i <= nextMonthDaysNeeded; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }
    }

    // 2. Add event listeners for changing dropdown options manually
    monthSelect.addEventListener('change', function () {
        currentDate.setMonth(parseInt(monthSelect.value));
        renderCalendar(currentDate);
    });

    yearSelect.addEventListener('change', function () {
        currentDate.setFullYear(parseInt(yearSelect.value));
        renderCalendar(currentDate);
    });

    // Arrow button controls
    prevButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });
    
    nextButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // Start application
    initDropdowns();
    renderCalendar(currentDate);
});
