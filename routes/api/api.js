const router = require("express").Router();
const Workout = require("../../models/workout");

router.get("/workouts", (req, res) => {
  Workout.aggregate([
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
  Workout.findOneAndUpdate(
    {_id: req.params.id},
    {$push: {exercises: req.body}},
    {new: true},
  ).then(dbExercise => {
    res.status(200).json(dbExercise);
  }).catch(err => {
    res.status(400).json(err);
  })
});

router.post("/workouts", (req, res) => {
  Workout.create(req.body)
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/workouts/range", (req, res) => {
  Workout.aggregate([
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
