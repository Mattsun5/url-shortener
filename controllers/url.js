const shortid = require("shortid");
const URL = require("../models/url")

async function handleGenerateNewShortUrl(req, res) {
    
    const shortID = shortid.generate();
    const body = req.body;
    if (!body) return res.status(400).json({ msg: "URL is required"});
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    })
    return res.status(200).json({ id: shortID});
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
    handleGenerateNewShortUrl,
    handleRedirectUrl,
    handleUrlVisits
}