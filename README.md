# HRMS Lite

HRMS Lite is a lightweight Human Resource Management System that allows organizations to manage employees and track their attendance.  
The application is built using a modern full-stack architecture with **Angular for the frontend**, **FastAPI for the backend**, and **MySQL as the database**.

This project demonstrates a simple but realistic HR workflow including employee management and attendance tracking.

---

## Project Overview

HRMS Lite provides a simple interface for administrators to:

- Add and manage employees
- Mark daily attendance
- View attendance records
- Prevent duplicate attendance for the same employee on the same date

The application uses a **separated frontend and backend architecture**, making it scalable and easy to maintain.

---

## Tech Stack Used

### Frontend
- Angular 17
- Angular Material
- TypeScript
- HTML / SCSS

### Backend
- FastAPI
- Python
- SQLAlchemy ORM

### Database
- MySQL (Railway Cloud SQL)

### Deployment
- Frontend: Vercel
- Backend: Railway

---

## Application Architecture
# HRMS Lite

HRMS Lite is a lightweight Human Resource Management System that allows organizations to manage employees and track their attendance.  
The application is built using a modern full-stack architecture with **Angular for the frontend**, **FastAPI for the backend**, and **MySQL as the database**.

This project demonstrates a simple but realistic HR workflow including employee management and attendance tracking.

---

## Project Overview

HRMS Lite provides a simple interface for administrators to:

- Add and manage employees
- Mark daily attendance
- View attendance records
- Prevent duplicate attendance for the same employee on the same date

The application uses a **separated frontend and backend architecture**, making it scalable and easy to maintain.

---

## Tech Stack Used

### Frontend
- Angular 20
- Angular Material
- TypeScript
- HTML / SCSS

### Backend
- FastAPI
- Python
- SQLAlchemy ORM

### Database
- MySQL (Railway Cloud SQL)

### Deployment
- Frontend: Vercel
- Backend: Railway

## Features

### Employee Management
- Add new employees
- Store employee details such as:
  - Employee ID
  - Full Name
  - Email
  - Department

### Attendance Management
- Mark employee attendance
- Attendance status options:
  - Present
  - Absent
- Prevent duplicate attendance for the same employee and date

### UI Features
- Angular Material UI components
- Table pagination
- Search functionality
- Snackbar notifications
- Empty state handling for no records

## Steps to Run the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/mtr-prabhat-sharma/hrms-lite.git
cd hrms-lite

2. Run Backend (FastAPI)

Navigate to the backend directory:

cd backend

Create a virtual environment:

python -m venv venv

Activate the virtual environment:

Windows : venv\Scripts\activate

Mac/ : source venv/bin/activate

Install backend dependencies:

pip install -r requirements.txt

Run the FastAPI server:

uvicorn app.main:app --reload

Backend will run at:

http://localhost:8000

API documentation will be available at:

http://localhost:8000/docs

3. Run Frontend (Angular)

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Start Angular development server:

ng serve

Frontend will run at:

http://localhost:4200

## Assumptions / Limitations

- Authentication and authorization are not implemented.
- Employee ID is assumed to be unique.
- Attendance can only be recorded once per employee per date.
- Attendance status is limited to **Present** or **Absent**.
- The system is designed for demonstration and learning purposes.