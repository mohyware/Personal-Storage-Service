# Personal Storage Service
Welcome to my first fullstack application built using the PERN stack! This application functions as a storage service similar to Google Drive but is focused exclusively on image.

## Table of Contents

- [Features](#features)
- [Testing the Deployment](#testing-the-deployment)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [License](#license)

## Testing the Deployment
Registered account for lazy ones:

- **Email:** example@gmail.com
- **Password:** 1e#uyjG%4
## Features

- **Image Storage:** Upload and store images.
- **Folder Management:** Create, read, update, and delete folders for organizing images.
- **User Authentication:** Secure user access using Passport.js for authentication.
- **Cloudinary Integration:** Utilize Cloudinary as a third-party service for image storage.
- **Error Handling:** Comprehensive error handling for various scenarios.
- **Security Layers:** The application employs security layers such as Helmet for HTTP header security, CORS with a whitelist for origin control, rate limiting to prevent abuse, XSS protection using `xss-clean`,and request compression for performance enhancement.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js, Express
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Passport.js
- **Image Storage:** Cloudinary

## Installation
To get started with this project, follow these steps:
1. Clone the repository:
```bash
git clone https://github.com/mohyware/Personal-Storage-Service
cd Personal-Storage-Service
```
2. Install the dependencies for both back-end and front-end:
npm install
3. Set up your environment variables in a .env file in the server directory:
4. Run database migrations:
```bash
npx prisma migrate dev
```
## Usage
1. start back-end:
```bash
cd back-end
npm run start
```
2. start front-end:
```bash
cd front-end
npm run start
```
Once the application is running, you can access its front end at http://localhost:3000. You can create an account, log in, and start uploading images to your storage space (notice that accessing back-end directly is forbidden with cors so u have to change it).
## API Endpoints

Here are some key API endpoints available in the application:

- **Authentication:**
  - `POST /api/v1/auth/register` - Register a new user
  - `POST /api/v1/auth/login` - Log in a user
  - `GET /api/v1/auth/logout` - Log out the user

- **User Management:**
  - `PATCH /api/v1/user/:id` - Update user information
  - `DELETE /api/v1/user/:id` - Delete a user account
  - `GET /api/v1/user/:id` - Retrieve user data

- **Folder Management:**
  - `POST /api/v1/folder` - Create a new folder
  - `GET /api/v1/folder` - Retrieve all folders
  - `PUT /api/v1/folder/:id` - Update a folder
  - `DELETE /api/v1/folder/:id` - Delete a folder

- **Image Management:**
  - `POST /api/v1/file/upload` - Upload a new image to Cloudinary
  - `GET /api/v1/file/download/:id` - Download an image from Cloudinary
  - `GET /api/v1/file` - Retrieve all images
  - `PATCH /api/v1/file/:id` - Update image details
  - `GET /api/v1/file/:id` - Retrieve a specific image by ID
  - `DELETE /api/v1/file/:id` - Delete an image

## Error Handling
The application includes an error handler that captures and responds to various error scenarios, ensuring a smooth user experience and aiding in troubleshooting.
## License
This project is licensed under the MIT License. See the LICENSE file for more details.