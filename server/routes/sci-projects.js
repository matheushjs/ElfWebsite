var express = require("express");
var router = express.Router({strict: true});

router.get("/1-psp-project-1/",
  (req, res) => req.renderer.render(res, "sci-projects/1-psp-project-1/index")
);

module.exports = router;
