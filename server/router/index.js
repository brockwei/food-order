module.exports = (express) => {
    const router = express.Router();
    // Experimental route
    router.get('/hehehoho', (req, res) => {
        console.log("working");
        res.json({ data: 'true' });
    });

    return router;
}