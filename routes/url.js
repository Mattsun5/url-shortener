const express = require('express');
const { 
    handleApiGenerateNewShortUrl,
    handleApiGetRequest,
    handleRedirectUrl,
    handleUrlVisits
} = require("../controllers/url");

const router = express.Router();

router.post('/', handleApiGenerateNewShortUrl);

router.get('/', handleApiGetRequest);

router.get('/:shortId', handleRedirectUrl);

router.get('/visits/:shortId', handleUrlVisits);

module.exports = router;