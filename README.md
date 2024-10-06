# Personal Storage Service

A personal storage service built with Express and Prisma, featuring session-based authentication, folder and file management, and cloud storage integration. This project is part of The Odin Project curriculum. 

## Features

- **Authentication**: Session-based authentication using `Passport.js`, with sessions stored in the database via `Prisma session store`.
- **File Uploads**: Authenticated users can upload files, which are initially saved to the filesystem. Cloud storage is later integrated (e.g., Cloudinary or Supabase).
- **Folder Management**: Users can create, read, update, and delete folders, and organize files within them.
- **File Details and Download**: View file details (name, size, upload time) with the ability to download files.
- **Cloud Storage**: Files are uploaded to a cloud storage service, with file URLs stored in the database.
- **Share Folder**: Share folders with a generated link that grants access for a specified duration (e.g., 1 day, 10 days).

## Extra Features

- **Shared Link Duration**: Users can set the duration for shared folder links, which allow unauthenticated users to access the contents.
