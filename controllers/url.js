const shortid = require("shortid");
const URL = require("../models/url");
const checkURL = require('url').URL


async function getAllUrl() {
    const allShortenedUrls = await URL.find({ });
    return allShortenedUrls;
  } 

async function handleGetRequest(req, res) {
    const allShortenedUrls = await getAllUrl();
    return res.render("../views/home", { shortenedUrls: allShortenedUrls});
} 


// HANDLE POST METHOD FOR VIEW AND API
// url validator
function validateUrl(urlString) {
    try {
        new checkURL(urlString)
        return true
      } catch {
        return false
      }
}
// id generator
function generateId() {
    const shortID = shortid.generate();
    return shortID
}
// add to db and return id
async function addNewShortURl(urlString, shortID) {
    await URL.create({
        shortId: shortID,
        redirectURL: urlString,
        visitHistory: []
    })
    console.log("id added");
}

function handleApiGenerateNewShortUrl(req, res) {
    const urlString = req.body.url;
    if(!validateUrl(urlString)) {return res.status(400).json({ msg: "a valid URL is required"})}
    const shortID = generateId();
    addNewShortURl(urlString, shortID);
    return res.status(200).json({ id: shortID});
}

async function handleGenerateNewShortUrl(req, res) {
    const urlString = req.body.url;
    const allShortenedUrls = await getAllUrl();
    if(!validateUrl(urlString)) 
    {
        return res.status(400).render("home", { msg: "a valid URL is required", shortenedUrls: allShortenedUrls});
    }
    const shortID = generateId();
    addNewShortURl(urlString, shortID);

    
    return res.status(200).render("home", { id: shortID, shortenedUrls: allShortenedUrls});
}

async function handleRedirectUrl(req, res) {
    const id = req.params.shortId;
    
    const url = await URL.findOneAndUpdate(
        { shortId: id },
        { 
           $push: { visitHistory: [{ timestamp: Date.now() }]}
        }
    );

    if (!url) return res.status(400).json({msg: "an error occured"});
    res.status(200).redirect(url.redirectURL);
}
async function handleUrlVisits(req, res) {
    const id = req.params.shortId;
    
    const url = await URL.findOne(
        { shortId: id }
    );

    if (!url) return res.status(400).json({msg: "an error occured"});
    res.status(200).json({visits: url.visitHistory.length, timeHistory: url.visitHistory});
}

module.exports = {
    handleApiGenerateNewShortUrl,
    handleGenerateNewShortUrl,
    handleRedirectUrl,
    handleUrlVisits,
    handleGetRequest
}