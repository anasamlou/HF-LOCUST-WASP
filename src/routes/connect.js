const { Router } = require("express");
var { PythonShell } = require("python-shell");
const router = Router();


class LocationDrone {
  constructor(heading, lon, lat, alt) {
    this.heading = heading;
    this.lon = lon;
    this.lat = lat;
    this.alt = alt;
  }
}

router.get("/", (req, res) => {
  PythonShell.run("./scripts/connect.py", null, function(err, results) {
    //if (err) throw err;
    if (err) {
      res.status(400).send({ message: "ERROR: Fallo el script connect.py" });
    }
    location = new LocationDrone(
      results[3],
      results[4],
      results[5],
      results[6]
    );

    res.status(200).send(location);
  });

});

module.exports = router;