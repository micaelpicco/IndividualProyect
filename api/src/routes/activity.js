const { Router } = require("express");
const { Activity, Country, countries_activities } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  const actividad = req.body;
  //yo por body voy a recibir un objeto con la sig forma {name: algo, difficult: algo, duration: algo, season: algo, paisid: [1,2,3]}

  try {
    let [act, created] = await Activity.findOrCreate({
      where: {
        name: actividad.name,
        difficult: actividad.difficult,
        duration: actividad.duration,
        season: actividad.season,
      },
    });
    await act.setCountries(actividad.paisid); //piso la actividad en caso que ya haya existido porque uso el set
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
