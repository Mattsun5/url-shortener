const express = require("express");
const { 
    handleGetRequest,
    handleGenerateNewShortUrl,
    handleRedirectUrl
} = require("../controllers/url")


const app = express();
const router = express.Router();

router.get('/:shortId', handleRedirectUrl);

router.post("/", handleGenerateNewShortUrl)

router.get("/", handleGetRequest)

module.exports = router;