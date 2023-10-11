// script.js
document.addEventListener('DOMContentLoaded', function() {
    const eventsList = document.getElementById('events-list');
    const addEventButton = document.getElementById('add-button');

    // Months and years for timeline
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const timeline = document.getElementById('timeline');
    const today = new Date();
    const month = months[today.getMonth()];
    const day = ("0" + today.getDate()).slice(-2);

    // Function to calculate days until the event
    function daysUntil(eventDate) {
        const timeDiff = eventDate - today;
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }
    
    const currentDate = document.createElement('span');
    currentDate.classList.add('timeline-current');
    currentDate.innerHTML = `<span>${day}</span><span>${month}</span>`;
    timeline.appendChild(currentDate);


    // Function to add a new event
    function addEvent() {
        const eventName = document.getElementById('event-name').value;
        const eventDate = new Date(document.getElementById('event-date').value);
        if (eventName && eventDate) {


            const eventinfohead = document.createElement('span');
            eventinfohead.classList.add('timeline-header');
            const monthevent = months[eventDate.getMonth()];
            const dayevent = ("0" + eventDate.getDate()).slice(-2);
            eventinfohead.innerHTML = `<span>${dayevent}</span><span>${monthevent}</span>`;
            /* eventinfohead.textContent = [dayevent + monthevent]; */
            timeline.appendChild(eventinfohead);


            // Create a random color for the event block
            const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;

            const eventItem = document.createElement('div');
            eventItem.classList.add('event-item');
            const nDays = daysUntil(eventDate) + ' days';
            eventItem.innerHTML = `<span>${eventName}<span> is in <span>${nDays}<span>`;
            eventItem.style.backgroundColor = randomColor;
            eventItem.style.width = '100%';

            const closeIcon = document.createElement('span');
            closeIcon.classList.add('close-icon');
            closeIcon.textContent = 'x';

            // Function to remove an event
            closeIcon.addEventListener('click', function() {
                eventsList.removeChild(eventItem);
            });

            eventsList.appendChild(eventItem);
            eventItem.appendChild(closeIcon);

            // Clear input fields
            document.getElementById('event-name').value = '';
            document.getElementById('event-date').value = '';
        }
    }

    addEventButton.addEventListener('click', addEvent);


});
