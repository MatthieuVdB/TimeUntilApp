// script.js
document.addEventListener('DOMContentLoaded', function() {
    
    const eventsList = document.getElementById('events-list');
    const addEventButton = document.getElementById('add-button');

// TODAY date on timeline
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const timeline = document.getElementById('timeline');
    const today = new Date();
    const month = months[today.getMonth()];
    const day = ("0" + today.getDate()).slice(-2);
   
    const currentDate = document.createElement('span');
    currentDate.classList.add('timeline-current');
    currentDate.innerHTML = `<span>${currentYear}</span><span>${month}</span><span>${day}</span>`;
    timeline.appendChild(currentDate);  

// Set the LAST date of the timeline
    function generateRandomDate(from, to) {
        return new Date(
          from.getTime() +
            Math.random() * (to.getTime() - from.getTime()),
        );
      }
    const endDate =  generateRandomDate(new Date(2024, 07, 1), new Date(2024, 07, 1));
    const endYear = endDate.getFullYear();
    const endMonth = months[endDate.getMonth()];
    const endday = ("0" + endDate.getDate()).slice(-2);

    const lastDate = document.createElement('span');
    lastDate.classList.add('timeline-current');
    lastDate.innerHTML = `<span>${endYear}</span><span>${endMonth}</span><span>${endday}</span>`;
    timeline.appendChild(lastDate);

// create event DATE on timeline
    function addEvent() {
    function generateRandomDate(from, to) {
        return new Date(
          from.getTime() +
            Math.random() * (to.getTime() - from.getTime()),
        );
      }
    const eventName = "Christmnas";
    const eventDate =  generateRandomDate(new Date(2023, 10, 1), new Date(2024, 06, 1));
    const eventYear = eventDate.getFullYear();
    console.log(eventDate);
    const monthevent = months[eventDate.getMonth()];
    const dayevent = ("0" + eventDate.getDate()).slice(-2);
 
    // Function to calculate days until the event
    function daysUntil(eventDate) {
        const timeDiff = eventDate - today;
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }

    const countDays = daysUntil(eventDate);
    const countMax = daysUntil(endDate);
    function blockWidth (countDays){
        return Math.ceil(countDays*100/countMax)
    }
    const eventWidth = blockWidth (countDays) +'%';

        if (eventName && eventDate) {


            const eventinfohead = document.createElement('span');
            eventinfohead.classList.add('timeline-header');
            eventinfohead.innerHTML = `<span>${eventYear}</span><span>${monthevent}</span><span>${dayevent}</span>`;
            timeline.appendChild(eventinfohead);


            // Create a random color for the event block
            const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
            const eventItem = document.createElement('div');
            eventItem.classList.add('event-item');
            const nDays = countDays + ' days';
            eventItem.innerHTML = eventName + " is in " + nDays;
            eventItem.style.backgroundColor = randomColor;
            eventItem.style.width = eventWidth;
            const closeIcon = document.createElement('div');
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
