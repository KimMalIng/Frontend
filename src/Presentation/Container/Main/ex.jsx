import { useEffect } from 'react';
import dummyJson from './dummyJson.json';

function TaskView() {
    function convertTimeToMinutes(timeString) {
        const [hours, minutes] = timeString.split(":");
        return parseInt(hours) * 60 + parseInt(minutes);
    }
    useEffect(()=>{},[dummyJson])
    function generateScheduleItem(subject) {
        return `<li>${subject.start} - ${subject.end}: ${subject.name}</li>`;
    }

    function displaySchedule(data, targetDivId) {
        const targetDiv = document.getElementById(targetDivId);
        let scheduleList = ""; // String to hold list items

        data.sort((a, b) => {
            dummyJson.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                if (dateA < dateB) return -1;
                if (dateA > dateB) return 1;

                // If dates are equal, sort by start time
                return convertTimeToMinutes(a.subject[0].start) - convertTimeToMinutes(b.subject[0].start);
            });
        });

        data.forEach((day) => {
            scheduleList += `<h3>--- ${day.date} ---</h3>`;
            scheduleList += `<ul>`;
            day.subject.forEach((subject) => {
                scheduleList += generateScheduleItem(subject);
            });
            scheduleList += `</ul>`;
        });

        targetDiv.innerHTML = scheduleList;
    }

    displaySchedule(dummyJson, "schedule-container");

    return (
        <>
            <div id="schedule-container"></div>
        </>
    )
}
export default TaskView;