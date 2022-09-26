const { Router } = require("express");
const { Country, Activity, countries_activities } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const router = Router();

router.get("/", async (req, res, next) => {
  const removeCharacters = function (str) {
    return str.normalize("NFD").replace(/[\u0300-\u036fÅ]/g, "");
  }; //saca Å y tildes

  try {
    let full = await Country.findAll();
    if (!full.length) {
      const arr = await axios.get("https://restcountries.com/v3/all");
      const allCountries = arr.data.map((el) => {
        return {
          id: el.cca3,
          name: removeCharacters(el.name.common),
          flags: el.flags[1],
          continents: el.region,
          capital: el.capital ? el.capital[0] : "The capital does not exist",
          subregion: el.subregion,
          area: el.area,
          population: el.population,
        };
      });
      await Country.bulkCreate(allCountries);
      return res.json(allCountries);
    }
  } catch (error) {
    next(error);
  }

  //al poner ilike ignora min y mayus
  if (req.query.name && req.query.filter2 && req.query.filter) {
    try {
      let country = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `${req.query.name}%`,
          },
          continents: req.query.filter,
        },
        order: [[req.query.order1, req.query.order2]],
        include: { model: Activity },
      });
      return res.json(country);
    } catch (error) {
      next(error);
    }
  } else if (req.query.name && req.query.filter) {
    try {
      let country = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `${req.query.name}%`,
          },
          continents: req.query.filter,
        },
        limit: 10,
        offset: req.query.page, //desde que campo quiero que empieze a buscar, si offset es 5 entonces cuenta del 5 al 15
        order: [[req.query.order1, req.query.order2]], //asc o dsc
        include: { model: Activity }, //se relaciona con la tabla intermedia
      });
      return res.json(country);
    } catch (error) {
      next(error);
    }
  } else if (req.query.name && req.query.filter2) {
    try {
      let country = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `${req.query.name}%`,
          },
        },
        order: [[req.query.order1, req.query.order2]],
        include: { model: Activity },
      });
      return res.json(country);
    } catch (error) {
      next(error);
    }
  } else if (req.query.filter2 && req.query.filter) {
    try {
      let country = await Country.findAll({
        where: {
          continents: req.query.filter,
        },
        order: [[req.query.order1, req.query.order2]],
        include: { model: Activity },
      });
      return res.json(country);
    } catch (error) {
      next(error);
    }
  } else if (req.query.name) {
    try {
      let country = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `${req.query.name}%`,
          },
        },
        limit: 10,
        offset: req.query.page,
        order: [[req.query.order1, req.query.order2]],
        include: { model: Activity },
      });
      return res.json(country);
    } catch (error) {
      next(error);
    }
  } else if (req.query.filter) {
    try {
      let country = await Country.findAll({
        where: {
          continents: req.query.filter,
        },
        limit: 10,
        offset: req.query.page,
        order: [[req.query.order1, req.query.order2]],
        include: { model: Activity },
      });
      return res.json(country);
    } catch (error) {
      next(error);
    }
  } else if (req.query.filter2) {
    try {
      let country = await Country.findAll({
        order: [[req.query.order1, req.query.order2]],
        include: { model: Activity },
      });
      return res.json(country);
    } catch (error) {
      next(error);
    }
  } else if (req.query.nameAct) {
    try {
      let country = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `${req.query.nameAct}%`,
          },
        },
        include: { model: Activity },
      });
      return res.json(country);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      let country = await Country.findAll({
        limit: 10,
        offset: req.query.page,
        order: [[req.query.order1, req.query.order2]],
        include: { model: Activity },
      });
      return res.json(country);
    } catch (error) {
      next(error);
    }
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    let country = await Country.findByPk(id, {
      include: [{ model: Activity }],
    });
    return res.json(country);
  } catch (error) {
    next(error);
  }
});

//------------

router.put("/:id", async (req, res, next) => {
  const id = req.params.id; //id del personaje a modificar
  const pais = req.body; //objeto que me llega con lo que tengo que modificar
  try {
    let country = await Country.update(pais, {
      where: {
        id: id,
      },
    }); //con esto le digo que, el personaje que mache con el id que me llega por parametro (que es el personaje que quiero modificar), modificalo segun lo que venga en el objeto pais que me llega por body
    return res.json({ cambiado: true });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    let country = await Country.destroy({
      where: {
        id: id,
      },
    });
    return res.json({ borrado: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
