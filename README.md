**Task Overview**: The "Estimate" module was implemented based on the provided JSON structure and mockup image. Each section is displayed as a separate table, where each section contains items that are editable inline. Here’s a breakdown of how I structured the solution:
**Data Fetching**:

Using NodeJS and ExpressJS l, I dynamically loaded the JSON data and Create API response, which ensures scalability and mimics real-world data handling practices.


**Frontend Structure**:


**HTML Table Setup**: Each section and its items are displayed in separate tables. I carefully followed the mockup to ensure visual consistency.
**Inline Editing**: Quantity and unit cost for each item are editable directly within the table cells, improving usability and allowing immediate feedback on changes.
Real-Time Calculations: Whenever quantity or unit cost changes, it triggers recalculation of both section and grand totals. To display accurate numbers, I divided the unit cost and total values by 100, as specified in the instructions.


**Dynamic Totals Calculation**:
Each time the quantity or unit cost is updated, the total for the respective section and the grand total (shown at the top) updates instantly on the front end. This feature provides a seamless and interactive experience.


**MERN Stack Implementation**: For better clarity and to follow modern web development practices, I utilized MERN concepts:
**Backend (Node.js, Express.js)**: I created a simple server to serve the static frontend and manage the API-like endpoint for data fetching.
**Frontend (React.js)**: Using React.js allowed me to handle data and state changes efficiently, especially for the live inline updates and total recalculations.
**Live Demo**: Additionally I deployed code to Live environment For better access Here is a link to access Live Demo :- https://assignment-j6t1.vercel.app
