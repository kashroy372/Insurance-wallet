# Insurance Wallet Backend

Express.js backend server for the Insurance Wallet application.

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Running the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000` (or the port specified in `.env`)

## 📡 API Endpoints

### Health Check
```
GET /health
```
Returns server status and timestamp.

### API Info
```
GET /api
```
Returns API version and welcome message.

### Insurance Types
```
GET /api/insurance-types
```
Returns list of available insurance types.

## 🔧 Configuration

Create a `.env` file in the backend directory:
```
PORT=5000
NODE_ENV=development
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── server.js          # Main server file
│   ├── routes/            # API routes
│   ├── controllers/       # Route controllers
│   └── middleware/        # Custom middleware
├── .env                   # Environment variables
├── .env.example          # Environment template
└── package.json          # Dependencies
```

## 🛠️ Tech Stack

- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📝 Adding New Routes

1. Create a new route file in `src/routes/`
2. Import and use in `src/server.js`
3. Add corresponding controller in `src/controllers/`

Example:
```javascript
// src/routes/insurance.js
import express from 'express';
const router = express.Router();

router.get('/policies', (req, res) => {
  res.json({ policies: [] });
});

export default router;
```

## 🔒 Security

- CORS is enabled for all origins in development
- Add proper CORS configuration for production
- Implement authentication middleware
- Add rate limiting for production

## 🚧 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Authentication & Authorization (JWT)
- [ ] Input validation (Joi/Zod)
- [ ] Logging (Winston/Morgan)
- [ ] Rate limiting
- [ ] API documentation (Swagger)
