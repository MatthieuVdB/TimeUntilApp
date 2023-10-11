
  const eventsList = document.getElementById('events-list');
  const timeLineYear = document.getElementById('timeline-year');
  const timeLineMonth = document.getElementById('timeline-month');
  const timeLineDays = document.getElementById('timeline-days');
  const addEventButton = document.getElementById('add-button');


// TODAY date on timeline
  const timeline = document.getElementById('timeline');
  const today = new Date();
  const currentYear = new Date().getFullYear();
  const month = today.getMonth()+1;
  const day = today.getDate();
 
  const currentDate = document.createElement('span');
  currentDate.classList.add('timeline-current');
  const currentDispDate = day + "/" + month + "/" + (currentYear-2000);
  currentDate.textContent = currentDispDate;
  timeline.appendChild(currentDate); 

// Set the LAST date of the timeline
  function generateRandomDate(from, to) {
      return new Date(
        from.getTime() +
          Math.random() * (to.getTime() - from.getTime()),
      );
    }
  const endDate =  generateRandomDate(new Date(2024, 10, 15), new Date(2024, 12, 5));
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth()+1;
  const endday = endDate.getDate();

  const lastDate = document.createElement('span');
  lastDate.classList.add('timeline-last');
  const lastDispDate = endday + "/" + endMonth + "/" + (endYear-2000);
  lastDate.textContent = lastDispDate;
  timeline.appendChild(lastDate);          
  

// create event DATE on timeline
  function generateRandomDate(from, to) {
      return new Date(
        from.getTime() + Math.random() * (to.getTime() - from.getTime()),);
    }

  const eventName = "Christmas";
  //const eventDate =  generateRandomDate(new Date(2023, 12, 25), new Date(2023, 12, 25));//
  const eventDate =  new Date(2023, 11, 31);
  const eventYear = eventDate.getFullYear();
  console.log(eventDate);
  const monthevent = eventDate.getMonth()+1;
  const dayevent = ("" + eventDate.getDate()).slice(-2);


  // Function to calculate days until the event
  function daysUntil(eventDate) {
    const timeDiff = eventDate - today;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

const countMax = daysUntil(endDate);

// Create a random color for the event block
const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;  
/* const rainbowColors = [
  '#FF0000', // Red
  '#FF7F00', // Orange
  '#FFFF00', // Yellow
  '#00FF00', // Green
  '#0000FF', // Blue
  '#4B0082', // Indigo
  '#8B00FF', // Violet
  '#9400D3', // DarkViolet
  '#800080', // Purple
  '#7B68EE', // MediumSlateBlue
  '#00CED1', // DarkTurquoise
  '#00FA9A'  // MediumSpringGreen
]; */
const rainbowColors = [
  '#C4E78e','#99e5a2', '#6DE195', '#54e38e', '#28C7AF', '#41d8dd',
  '#7debf2',  '#84c6dc', '#6cacff', '#557dee', '#1f4bc7', '#344c8d'
];




// Timeline with month and year
const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

   // Dynamically create the YEAR headers

   const thisYear = document.createElement('div');
   thisYear.classList.add('timeline-thisYear');
   thisYear.textContent = currentYear;
   timeLineYear.appendChild(thisYear);

   // Dynamically create the MONTHS headers
   let n = 0;
   let accuDays = 0;
  // if all events happen the same year
   if (endYear === currentYear){
      for (let mth = month-1; mth < endMonth; mth++){
        const M = document.createElement('div');
        M.classList.add('timeline-M');
        M.textContent = months[mth];
        if (mth===month-1){M.style.width=percMthCurr + '%'}
        if (mth===endMonth-1){M.style.width=percMthEnd + '%'}
        timeLineMonth.appendChild(M);
      }
    } 
    // If EVENTS spread on 2 different years
    else if (endYear === currentYear+1){
      // LOOP through MONTH of the 1st Year and get the width of each month element
        for (let mth = month-1; mth < months.length; mth++){
          const M = document.createElement('div');
          M.classList.add('timeline-M');
          M.textContent = months[mth];  
          const daysInMonth = new Date(currentYear, mth+1, 0).getDate();
          const percWidth = daysInMonth*100/countMax;
          M.style.width = percWidth + '%';
          if (mth===month-1){
            const percWidth = (daysInMonth-day)*100/countMax;
            M.style.width = percWidth + '%'
          }
          M.style.backgroundColor=rainbowColors[mth];
          timeLineMonth.appendChild(M);  
          accuDays = n + daysInMonth;
          n = accuDays;
        }
        // with the accumulated number of days in each month of current year
        // calculate the width of the YEAR element which correlates with the months 
        const nextYear = document.createElement('div');
        nextYear.classList.add('timeline-nextYear');
        nextYear.textContent = endYear;
        const thisYearWidth = (accuDays-day)*100/countMax;
        thisYear.style.width = thisYearWidth + '%';
        nextYear.style.width = (100-thisYearWidth) + '%';
        timeLineYear.appendChild(thisYear);
        timeLineYear.appendChild(nextYear);

        // LOOP through the month of the second year to display
        for (let mth = 0 ; mth < endMonth; mth++){
          const M = document.createElement('div');
          M.classList.add('timeline-M');
          M.textContent = months[mth];
          const daysInMonth = new Date(endYear, mth+1, 0).getDate();
          const percWidth = daysInMonth*100/countMax;
          M.style.width = percWidth + '%'
          if (mth===endMonth-1){
            const percWidth = endday*100/countMax;
            M.style.width = percWidth + '%'
          }
          M.style.backgroundColor=rainbowColors[mth];
          timeLineMonth.appendChild(M);
        }
    } 


    




          const countDays = daysUntil(eventDate);
          const eventWidth = (countDays*100/countMax) +'%';
          const eventinfohead = document.createElement('span');
          eventinfohead.classList.add('timeline-header');
          const eventDispDate = dayevent + "/" + monthevent + "/" + (eventYear-2000);
          eventinfohead.textContent = eventDispDate;
          eventinfohead.style.left = eventWidth;
          eventinfohead.style.transform = 'translateX(-Number(eventWidth))'; 
          timeline.appendChild(eventinfohead);

          // Create a random color for the event block
          const eventItem = document.createElement('div');
          eventItem.classList.add('event-item');
          const strring = countDays + " days til " + eventName;     
          const nameItem = document.createElement('span');
          nameItem.classList.add('nameItem');
          nameItem.textContent = strring;
          nameItem.style.backgroundColor = randomColor;
          nameItem.style.width = eventWidth;

          const closeIcon = document.createElement('span');
          closeIcon.classList.add('close-icon');
          closeIcon.textContent = 'X';

          // Function to remove an event
          closeIcon.addEventListener('click', function() {
              eventsList.removeChild(eventItem);
          });

          eventsList.appendChild(eventItem);
          eventItem.appendChild(nameItem);
          eventItem.appendChild(closeIcon);

          // Clear input fields
          document.getElementById('event-name').value = '';
          document.getElementById('event-date').value = '';




/* 
      months.forEach(month => {
        const M = document.createElement('div');
        M.classList.add('timeline-M');
        M.textContent = month;
        timeLineMonth.appendChild(M);
       
      })  */
       

 