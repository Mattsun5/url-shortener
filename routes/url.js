const express = require('express');
const { 
    handleGenerateNewShortUrl,
    handleRedirectUrl,
    handleUrlVisits
} = require("../controllers/url");

const router = express.Router();

router.post('/', handleGenerateNewShortUrl);

router.get('/:shortId', handleRedirectUrl);
router.get('/visits/:shortId', handleUrlVisits);

module.exports = router;