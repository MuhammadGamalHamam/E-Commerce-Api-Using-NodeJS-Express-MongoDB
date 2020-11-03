const router = require('express').Router();
const Category = require('../models/category');

//localhost:5050/api/categories
// Find all categories
router.route('/categories')
  .get((req, res, next) => {
    Category.find({}, (err, categories) => {
      res.json({
        success: true,
        message: "Success",
        categories: categories
      })
    })
  })
  //localhost:5050/api/categories
  //insert category
  .post((req, res, next) => {
    let category = new Category();
    category.name = req.body.name;
    category.save();
    res.json({
      success: true,
      message: "Category inserted successfully"
    });
  })


//localhost:5050/api/categories/5eb5a7d64ccc5a3fb04ee68f
router.get('/categories/:id', (req, res, next) =>{
  Category.findById(req.params.id)
  .then(category => {
      if(!category) {
          return res.status(404).send({
              message: "Category not found with id " + req.params.id
          });            
      }
      res.send(category);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Category not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving Category with id " + req.params.id
      });
  });
})


  //localhost:5050/api/categories/5eb5a9f64a0d393ad4c3fc0a
  router.delete('/categories/:id', (req, res, next) =>{
    Category.findByIdAndRemove(req.params.id)
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.id
            });
        }
        res.send({message: "Category deleted successfully"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete category with id " + req.params.id
        });
    });
})


//localhost:5050/api/categories/5eb58b9e5ab9013fa8ab9a63
router.put('/categories/:id', (req, res, next) =>{

  if(!req.body.name) {
      return res.status(400).send({
          message: "Category name can not be empty"
      });
  }

  Category.findByIdAndUpdate(req.params.id, {
      name: req.body.name
  }, {new: true})
  .then(category => {
      if(!category) {
          return res.status(404).send({
              message: "Category not found with id " + req.params.id
          });
      }
      res.send(category);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Category not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error updating category with id " + req.params.id
      });
  });
})




module.exports = router;
