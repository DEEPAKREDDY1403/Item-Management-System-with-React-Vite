Features
Two-Page Interface: Clean navigation between "View Items" and "Add Items".
Add Items: A user-friendly form to add a new item with a name, type, description, a main cover image, and multiple additional images.
View Items: A beautiful, responsive gallery displaying all items with their cover image and name.
Item Details Modal: Clicking an item opens a detailed modal view with a full image carousel (using react-slick).
File Uploads: Handles single and multiple image uploads seamlessly using multer.
Email Enquiry (Bonus Feature): An "Enquire" button in the modal sends a detailed email notification to a predefined address using Nodemailer.
RESTful API: A well-structured backend API to handle CRUD operations for items.
State Management: Centralized frontend state management using React Context API.

API Endpoints
The backend exposes the following REST API endpoints:
GET /api/items: Fetches all items from the database.
POST /api/items: Adds a new item to the database. Expects multipart/form-data.
POST /api/enquire: Receives an item ID and sends an enquiry email.

![image](https://github.com/user-attachments/assets/f144c1af-920d-46ff-98f1-c01735c1871b)

![image](https://github.com/user-attachments/assets/0dc2c702-6657-4747-b32f-ee8a48c291f7)

![image](https://github.com/user-attachments/assets/107c5813-9013-4c9d-9e79-8a07900da430)

![image](https://github.com/user-attachments/assets/52db9412-7520-4905-be07-86adbf32d8f0)
