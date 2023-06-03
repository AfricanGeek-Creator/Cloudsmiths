import { LightningElement } from 'lwc';

export default class Calender extends LightningElement {
    async function fetchHolidays(year) {
        const apiKey = '24c5e86734eb44dc4a962826324a5546e74dc42f'; // Replace with your Calendarific API key
        const country = 'ZA'; // South Africa country code
        const year=2023;
      
        const apiUrl = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}`;
      
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
      
          if (response.ok) {
            const holidays = data.response.holidays;
            return holidays;
          } else {
            throw new Error('Failed to fetch holidays');
          }
        } catch (error) {
          console.error('Error retrieving holidays:', error);
          return [];
        }
      }
      
      // Function to display the list of holidays on the page
      function displayHolidays(holidays) {
        const holidaysContainer = document.getElementById('holidays-container');
      
        if (holidays.length > 0) {
          const holidaysList = document.createElement('ul');
          holidaysList.classList.add('holiday-list');
      
          holidays.forEach((holiday) => {
            const holidayItem = document.createElement('li');
            holidayItem.innerText = holiday.name;
      
            holidaysList.appendChild(holidayItem);
          });
      
          holidaysContainer.appendChild(holidaysList);
        } else {
          const noHolidaysMessage = document.createElement('p');
          noHolidaysMessage.innerText = 'No holidays found for the given year.';
          holidaysContainer.appendChild(noHolidaysMessage);
        }
      }
      
      // Example usage
      const idNumber = 'Your ID number'; // Replace with the actual ID number
      const yearFromIDNumber = idNumber.substring(0, 2); // Extract the year from the ID number
      
      fetchHolidays(yearFromIDNumber)
        .then((holidays) => {
          displayHolidays(holidays);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
}