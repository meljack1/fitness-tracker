const router = require("express").Router();
const Exercise = require("../../models/exercise");

router.get("/workouts", (req, res) => {
  Exercise.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
        totalWeight: { $sum: "$exercises.weight" },
      }
    }
  ]).then(dbExercise => {
    res.status(200).json(dbExercise);
  }).catch(err => {
    res.status(400).json(err);
  });
});

router.put("/workouts:id", (req, res) => {
  Exercise.findOneAndUpdate(
    {_id: req.params.id},
    {$push: {exercises: req.body}},
    {new: true},
  ).then(dbExercise => {
    res.status(200).json(dbExercise);
  }).catch(err => {
    res.status(400).json(err);
  })
});

router.post("/workouts", ({ body }, res) => {
  Exercise.create(body)
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/workouts/range", (req, res) => {
  Exercise.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration"},
        totalWeight: {$sum: "$exercises.weight"},
      },
    }
  ])
  .sort({"day": -1 })
  .limit(7)
  .then(dbExercise => {
    res.json(dbExercise);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

module.exports = router;
