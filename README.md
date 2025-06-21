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
