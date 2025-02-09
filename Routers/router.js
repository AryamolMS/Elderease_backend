// 1) Import required modules
const express = require('express');

// Import controllers
const userController = require('../controllers/userController');
const eventController = require('../controllers/eventController')

// Import middlewares
const jwtMiddleware = require('../middleware/jwtMiddleware');
const multerConfig = require('../middleware/multerMiddleware');

// 2) Create an Express Router instance
const router = new express.Router();

// 3) User-related routes
// a) Register a new user
router.post('/user/register', userController.register);

// b) Login a user
router.post('/user/login', userController.login);

// 4) Event-related routes (Require authentication for protected routes)
// a) Add a new event (User must be logged in)
router.post('/events', jwtMiddleware, eventController.createEvent);
//get events
router.get('/events', eventController.getAllEvents);

router.get('/admin/events', jwtMiddleware, eventController.getAllEventsForAdmin);
// ✅ Approve an event (Admin only)
router.put('/approve-event/:eventId', jwtMiddleware, eventController.approveEvent);



// 5) Export router
module.exports = router;
