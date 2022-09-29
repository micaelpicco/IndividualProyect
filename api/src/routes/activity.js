const { Router } = require("express");
const { Activity, Country, countries_activities } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  const { name, difficult, duration, season, paisid } = req.body;

  try {
    let [act, created] = await Activity.findOrCreate({
      where: {
        name: name,
        difficult: difficult,
        duration: duration,
        season: season,
      },
    });
    await act.addCountries(paisid);
    return res.json(act);
  } catch (error) {
    next(error);
  }
});

router.get("/get", async (req, res, next) => {
  try {
    let activitis = await Activity.findAll();
    return res.json(activitis);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
