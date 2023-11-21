const express = require('express');
const router = express.Router();
const profilesCtrl = require('../../controllers/api/profiles');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/profiles
router.get('/all', ensureLoggedIn, profilesCtrl.getAll);

// GET /api/profiles/:id -- Get a friend's profile
router.get('/:id', ensureLoggedIn, profilesCtrl.getProfile);

// GET /api/profiles -- Get your profile using user._id
router.get('/', ensureLoggedIn, profilesCtrl.getMyProfile);

// POST /api/profiles/:id
router.post('/:id', ensureLoggedIn, profilesCtrl.createProfile);

// PUT /api/profiles/:id
router.put('/:id', ensureLoggedIn, profilesCtrl.update);

// DELETE /api/profiles/:id
router.delete('/:id', ensureLoggedIn, profilesCtrl.deleteProfile);


// Route for adding a friend
// router.post('/', ensureLoggedIn, profilesCtrl.addFriend);

module.exports = router;