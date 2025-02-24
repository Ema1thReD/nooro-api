# nooro-api
The application is build for nooro backend task


Backend application built with **Express.js**, **Prisma**, **MySQL**, **TypeScript**.

---

## **Getting Started**

### **Prerequisites**
Make sure you have the following installed:
- [Node.js (LTS)](https://nodejs.org/)(Version used 22.7.0)
- [MySQL](https://www.mysql.com/)(Version 8.0.39)

---

## **Backend Setup (Express.js + Prisma + MySQL)**

### **1. Clone the Repository**
```sh
git clone https://github.com/Ema1thReD/nooro-api.git
cd nooro-api
```

### **2. Install Backend Dependencies**
```sh
npm install
```

### **3. Configure Environment Variables**
Create a `.env` file inside the `nooro-api` folder and add the following:
```
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/nooro_todo"
PORT=5000
```
Replace:
- `USER` → Your MySQL username  
- `PASSWORD` → Your MySQL password  
- `nooro_todo` → Your database name  

### **4. Run Database Migrations (Prisma)**
```sh
npx prisma migrate dev --name init
```

### **5. Start the Backend Server**
```sh
npm run start
```
Backend should now be running on `http://localhost:5000`

---

## **API Endpoints**
### **Tasks**
| Method | Endpoint        | Description               |
|--------|----------------|---------------------------|
| GET    | `/tasks`       | Get all tasks            |
| GET    | `/tasks/:id`   | Get a task by ID         |
| POST   | `/tasks`       | Create a new task        |
| PUT    | `/tasks/:id`   | Update an existing task  |
| DELETE | `/tasks/:id`   | Delete a task            |

---

## **Project Structure**
```
/backend
  ├── prisma/               # Prisma schema & migrations
  │   ├── migrations/       # Applied migrations
  │   ├── schema.prisma     # Task Table Schema
  ├── routes/           # API routes
  ├── server.ts          # Server entry point
  ├── package.json

```
