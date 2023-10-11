// script.js
document.addEventListener('DOMContentLoaded', function() {

    const eventsList = document.getElementById('events-list');
    const addEventButton = document.getElementById('add-button');
    const timeLineYear = document.getElementById('timeline-year');
    const timeLineMonth = document.getElementById('timeline-month');

    
// TODAY date on timeline
    const today = new Date();
    const currentYear = new Date().getFullYear();
    const currentmonth = today.getMonth()+1;
    const currentday = today.getDate();   

// CHRISTMAS date on timeline
    const chrstmasDate = new Date(2023, 11, 25);
    const chrstmasYear = chrstmasDate.getFullYear();
 
// Months and years for timeline
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const rainbowColors = [
        '#C4E78e','#99e5a2', '#6DE195', '#54e38e', '#28C7AF', '#41d8dd',
        '#7debf2',  '#84c6dc', '#6cacff', '#557dee', '#1f4bc7', '#344c8d'
      ];
    
   
      const addDays = 0;
      
    if (localStorage.getItem('savedValues') === null){
        console.log("Item does not exist in localstoarge");
        var events = [{eventName:'Christmas', eventDay:chrstmasDate.getDate(), eventMonth:chrstmasDate.getMonth()+1, eventYear:chrstmasDate.getFullYear(), countDays:Math.ceil((chrstmasDate - today) / (1000 * 60 * 60 * 24)), eventYear:chrstmasYear}];
        const eventYear = chrstmasYear ;
        saveToDo(events);
    }else{
        console.log("Item exist in localstoarge");
        var events = JSON.parse(localStorage.getItem('savedValues'));
    }
    console.log(events);
    updateEventList();
    updateTimeline();

    // Function to add a new event
    function addEvent() {                
        
        const eventDate = new Date(document.getElementById('event-date').value);
        const eventDay = eventDate.getDate();
        const eventMonth = eventDate.getMonth()+1;
        const eventYear = eventDate.getFullYear();
        const eventName = document.getElementById('event-name').value;
        const countDays = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
        
        events.push({eventName, eventDay, eventMonth, eventYear, countDays});
        updateEventList();
        updateTimeline();
        console.log(events);
        saveToDo(events) ;
  }


    function extractValue(arr, prop) {
        // extract value from property
        let extractedValue = arr.map(item => item[prop]);    
        return extractedValue;
    
    }

    function compareByCounts(a, b)  {
        return b.countDays - a.countDays;
    };

    function updateEventList() {

        var elem = document.getElementById('innerList');
        if (isEmpty(elem) === false) {
            elem.remove();    
            const innerList = document.createElement('div');
            innerList.id='innerList';
            eventsList.appendChild(innerList);
        }
        const innerList = document.getElementById('innerList');
        const arrCounts = extractValue(events, 'countDays');
        const arrMax = Math.max(...arrCounts);
        
        events.sort(compareByCounts);

        let n=0;
        events.forEach(event => {    

        const eventItem = document.createElement('div');
        eventItem.id='eventItem';

        const eventItemBar = document.createElement('div');
        eventItemBar.id='eventItemBar';
        const eventWidth = (event.countDays*100/(arrMax+addDays)) +'%';     
        eventItemBar.style.width = eventWidth; 
        eventItemBar.style.backgroundColor = rainbowColors[n];  

        const daysItem = document.createElement('span');
        daysItem.classList.add('daysItem');
        daysItem.textContent = event.countDays;

        const barItemClose = document.createElement('span');
        barItemClose.classList.add('close-icon');
        barItemClose.textContent = 'X';
        barItemClose.addEventListener('click', function() {
            removeEvent(event);});
               
        const eventItemDAteName = document.createElement('span');
        eventItemDAteName.id='eventDate';     
        let strring = event.eventName  +  " : " +  event.eventDay + '/' + event.eventMonth;
        eventItemDAteName.textContent = strring;  

        innerList.appendChild(eventItem);
        eventItem.appendChild(eventItemBar);
        eventItemBar.appendChild(daysItem); 
        if ( (event.countDays*100/(arrMax+addDays))  < 15){
            eventItemDAteName.style.textAlign = 'left';
            eventItem.appendChild(eventItemDAteName);}
        else {eventItemBar.appendChild(eventItemDAteName);}
        eventItemBar.appendChild(barItemClose);  
        n++; 

        });

        // Clear input fields
        document.getElementById('event-name').value = '';
        document.getElementById('event-date').value = '';
    }

    function isEmpty(element) { 
        return element.innerHTML === '' 
       } 


        // Function to remove an event from the list   
    function removeEvent(event) {
        const index = events.indexOf(event);
        if (index > -1) {
            events.splice(index, 1);
            updateEventList();
            saveToDo(events) ;
        }
    }

    function updateTimeline(){
    
        var elemY = document.getElementById('innerYear');     
        if (isEmpty(elemY) === false) {
            elemY.remove();    
            const innerYear = document.createElement('div');
            innerYear.id='innerYear';
            timeLineYear.appendChild(innerYear);
        }
        const  innerYear = document.getElementById('innerYear');        
        
        var elemM = document.getElementById('innerMonth'); 
        if (isEmpty(elemM) === false) {
            elemM.remove();  
            const innerMonth = document.createElement('div');
            innerMonth.id='innerMonth';
            timeLineMonth.appendChild(innerMonth);
        }
        const  innerMonth = document.getElementById('innerMonth');

        const arrYears = extractValue(events, 'eventYear');
        const maxYear = Math.max(...arrYears);
        if (events.eventYear>currentYear){maxYear=events.eventYear};       
        const arrCounts = extractValue(events, 'countDays'); 
        const countMax = Math.max(...arrCounts);
        const countMaxIdx = arrCounts.indexOf(countMax); 
        const maxMonth = events[countMaxIdx].eventMonth; 
        const endDay = events[countMaxIdx].eventDay;    



            // Dynamically create the MONTHS headers
            let n = 0;
            let accuDays = 0;

            // if all events happen the same year
            if (maxYear === currentYear){
                
            // Dynamically create the YEAR headers
                const thisYear = document.createElement('div');
                thisYear.classList.add('timeline-thisYear');
                thisYear.textContent = currentYear;
                thisYear.style.width = '100%';
                innerYear.appendChild(thisYear);
                const M = document.createElement('div');

                for (let mth = currentmonth-1; mth < maxMonth; mth++){
                    const M = document.createElement('div');
                    M.classList.add('timeline-M');
                    M.textContent = months[mth];
/*                     M.style.backgroundColor=rainbowColors[mth];
 */                    const daysInMonth = new Date(currentYear, mth+1, 0).getDate();
                    const percWidth = daysInMonth*100/(countMax+addDays);
                    M.style.width = percWidth + '%';
                    if (mth===currentmonth-1){
                        const percWidth = (daysInMonth-currentday)*100/(countMax+addDays);
                        M.style.width=percWidth + '%'
                    }
                    innerMonth.appendChild(M);
                }
            } 



            // If EVENTS spread on 2 different years
            else if (maxYear>currentYear){
            // LOOP through MONTH of the 1st Year and get the width of each month element
                for (let mth = currentmonth-1; mth < months.length; mth++){
                    const M = document.createElement('div');
                    M.classList.add('timeline-M');
                    M.textContent = months[mth];  
                    const daysInMonth = new Date(currentYear, mth+1, 0).getDate();
                    const percWidth = daysInMonth*100/(countMax+addDays);
                    M.style.width = percWidth + '%';
                    if (mth===currentmonth-1){
                    const percWidth = (daysInMonth-currentday)*100/(countMax+addDays);
                    M.style.width = percWidth + '%'
                    }
/*                     M.style.backgroundColor=rainbowColors[mth];
 */                    innerMonth.appendChild(M);  
                    accuDays = n + daysInMonth;
                    n = accuDays;
                }

                // with the accumulated number of days in each month of current year
                // calculate the width of the YEAR element which correlates with the months                 
                const thisYear = document.createElement('div');
                thisYear.classList.add('timeline-thisYear');
                thisYear.textContent = currentYear;
                const thisYearWidth = (accuDays-currentday)*100/(countMax+addDays);
                thisYear.style.width = thisYearWidth + '%';
                const nextYear = document.createElement('div');
                nextYear.classList.add('timeline-nextYear');
                nextYear.textContent = maxYear;
                nextYear.style.width = (100-thisYearWidth) + '%';
                innerYear.appendChild(thisYear);
                innerYear.appendChild(nextYear);
  
            // LOOP through the month of the second year to display
                for (let mth = 0 ; mth < maxMonth; mth++){
                    const M = document.createElement('div');
                    M.classList.add('timeline-M');
                    M.textContent = months[mth];
                    const daysInMonth = new Date(maxYear, mth+1, 0).getDate();
                    const percWidth = daysInMonth*100/(countMax+addDays);
                    M.style.width = percWidth + '%'
                    if (mth===maxMonth-1){
                    const percWidth = endDay*100/(countMax+addDays);
                    M.style.width = percWidth + '%'
                    }
/*                     M.style.backgroundColor=rainbowColors[mth];
 */                    innerMonth.appendChild(M);
                }
            }  
    }


            function saveToDo(item) {
                localStorage.removeItem("savedValues");
                localStorage.setItem('savedValues', JSON.stringify(item))
            }

            addEventButton.addEventListener('click', addEvent);
});






