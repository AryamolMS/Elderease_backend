// 1) Import required modules
const express = require('express');

// Import controllers
const userController = require('../controllers/userController');
const eventController = require('../controllers/eventController');
const contactController = require('../controllers/contactController');
const tutorialContoller = require('../controllers/tutorialContoller');
const chatController = require("../controllers/chatController");


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

// Get all events
router.get('/events', eventController.getAllEvents);

router.get('/admin/events', jwtMiddleware, eventController.getAllEventsForAdmin);

// ✅ Approve an event (Admin only)
router.put("/events/approve/:eventId", eventController.approveEvent);

// Get approved events
router.get("/events/approved", eventController.getApprovedEvents);

// Get rejected events
router.get("/events/rejected", eventController.getRejectedEvents);

// Reject an event
router.put("/events/reject/:eventId", eventController.rejectEvent);

// ✅ Get pending events
router.get("/events/pending", eventController.getPendingEvents);

// 5) Contact-related routes
router.post('/contact', contactController.createContact);

router.post('/tutorials', tutorialContoller.addTutorial);
router.get('/tutorials', tutorialContoller.getTutorials);

router.post('/send', chatController.sendMessage);
router.get('/messages/:userId?', chatController.getMessages);
router.post("/messages/reply", chatController.sendReply);



// 6) Export router
module.exports = router;
