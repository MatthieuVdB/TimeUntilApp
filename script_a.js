// script.js
document.addEventListener('DOMContentLoaded', function() {
    const eventsList = document.getElementById('events-list');
    const addEventButton = document.getElementById('add-button');

    // Months and years for timeline
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const timeline = document.getElementById('timeline');

    // Function to calculate days until the event
    function daysUntil(eventDate) {
        const today = new Date();
        const timeDiff = eventDate - today;
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }

    // Function to add a new event
    function addEvent() {
        const eventName = document.getElementById('event-name').value;
        const eventDate = new Date(document.getElementById('event-date').value);
        if (eventName && eventDate) {
            const eventItem = document.createElement('div');
            eventItem.classList.add('event-item');

            // Create a random color for the event block
            const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;

            const countdownDays = document.createElement('div');
            countdownDays.classList.add('countdown-days');
            countdownDays.textContent = daysUntil(eventDate) + ' days';

            const countdownBlock = document.createElement('div');
            countdownBlock.classList.add('countdown-block');
            countdownBlock.style.width = '100%';
            countdownBlock.style.backgroundColor = randomColor;

            const eventInfo = document.createElement('span');
            eventInfo.textContent = `${eventName}`;

            const closeIcon = document.createElement('span');
            closeIcon.classList.add('close-icon');
            closeIcon.textContent = '❌';

            // Function to remove an event
            closeIcon.addEventListener('click', function() {
                eventsList.removeChild(eventItem);
            });

            eventItem.appendChild(countdownBlock);
            eventItem.appendChild(eventInfo);
            eventItem.appendChild(countdownDays);
            eventItem.appendChild(closeIcon);

            eventsList.appendChild(eventItem);

            // Clear input fields
            document.getElementById('event-name').value = '';
            document.getElementById('event-date').value = '';
        }
    }
    

    addEventButton.addEventListener('click', addEvent);

    // Dynamically create the month-year headers
    months.forEach(month => {
        const header = document.createElement('div');
        header.classList.add('timeline-header');
        header.innerHTML = `<span>${month}</span><span>${currentYear}</span>`;
        timeline.appendChild(header);

        // Update current year for the next header
        if (months.indexOf(month) === 11) {
            currentYear++;
        }
    });
});
