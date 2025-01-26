const router = require("express").Router();
const { validator } = require("../middlewares/validator")
const { auth_schema } = require("../schemas/auth");
const {login, register} = require("../controllers/auth.controller");

router.post("/login", [validator(auth_schema)], login);
router.post("/register", [validator(auth_schema)], register);

module.exports = router;