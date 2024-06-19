const router = require("express").Router();

Register
router.post("/register", async (req,res)=> {

    const newUser = new User({
        username: req.body.username,
        email: req.body.username,
        password: req.body.username,
    });

    try {
        const  savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
