const router = require("express").Router();
const { validator } = require("../middlewares/validator");
const { auth } = require("../middlewares/auth");
const {
    createStatus,
    deleteStatus,
} = require("../controllers/status.controller");

router.post("/", createStatus);
router.delete("/:status_id", auth, deleteStatus);

module.exports = router;