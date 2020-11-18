const Database = require("./database/db");
const saveOrphanage = require("./database/saveOrphanage");

module.exports = {
  index(req, res) {
    location = "Contagem";
    return res.render("index", { location });
  },

  async orphanages(req, res) {
    try {
      //colocar os orphanages pelo banco de dados
      const db = await Database;
      const orphanages = await db.all("SELECT * FROM orphanages");
      return res.render("orphanages", { orphanages });
    } catch (error) {
      console.log(error);
      return res.send("Error: Banco de dados não esta funcionando!");
    }
  },

  async orphanage(req, res) {
    const id = req.query.id;
    try {
      const db = await Database;
      const orphanage = await db.all(
        `SELECT * FROM orphanages WHERE id = ${id}`
      );

      orphanage[0].images = orphanage[0].images.split(",");
      orphanage[0].firstImage = orphanage[0].images[0];

      orphanage[0].open_on_weekends =
        orphanage[0].open_on_weekends == "1" ? true : false;

      return res.render("orphanage", { orphanage: orphanage[0] });
    } catch (error) {
      console.log(error);
      return res.send("Error: Banco de dados não esta funcionando!");
    }
  },

  createOrphanage(req, res) {
    return res.render("create-orphanage");
  },

  async saveOrphanage(req, res) {
    const fields = req.body;

    //salvar os orfanato
    try {
      const db = await Database;

      await saveOrphanage(db, {
        lat: fields.lat,
        lng: fields.lng,
        name: fields.name,
        about: fields.about,
        whatsapp: fields.whatsapp,
        images: fields.images.toString(),
        instructions: fields.instructions,
        opening_hours: fields.opening_hours,
        open_on_weekends: fields.open_on_weekends,
      });

      //redirecionamento
      return res.redirect("/orphanages");
    } catch (error) {
      console.log(error);
      res.send("Error: Banco de dados");
    }
  },
};
