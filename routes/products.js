const router = require('express').Router();
const Product = require('../models/product');


router.route('/products')
  .get((req, res, next) => {
    Product.find({}, (err, products) => {
      res.json({
        success: true,
        message: "Success",
        products: products
      })
    })
  })
  .post((req, res, next) => {
    let product = new Product();
    product.categoryid = req.body.categoryId;
    product.name = req.body.name;
    product.imageurl = req.body.imageurl;
    product.quantity = req.body.quantity;
    product.price = req.body.price;
    product.save();
    res.json({
      success: true,
      message: " Add the product Successfully"
    });
  });


//Find one Product
router.get('/products/:id', (req, res, next) =>{
  Product.findById(req.params.id)
  .then(product => {
      if(!product) {
          return res.status(404).send({
              message: "Product not found with id " + req.params.id
          });            
      }
      res.send(product);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Product not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving Product with id " + req.params.id
      });
  });
})


  //localhost:5050/api/products/5eb5d0674bb49e5208de2728
  //Delete one Product
  router.delete('/products/:id', (req, res, next) =>{
    Product.findByIdAndRemove(req.params.id)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });
        }
        res.send({message: "Product deleted successfully"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Product with id " + req.params.id
        });
    });
})


  //localhost:5050/api/products/5eb5d0674bb49e5208de2728
  //Update one Product
  router.put('/products/:id', (req, res, next) =>{

  if(!req.body.name) {
      return res.status(400).send({
          message: "Product name can not be empty"
      });
  }

  Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name
  }, {new: true})
  .then(product => {
      if(!product) {
          return res.status(404).send({
              message: "Product not found with id " + req.params.id
          });
      }
      res.send(product);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Product not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error updating Product with id " + req.params.id
      });
  });
})
















module.exports = router;
