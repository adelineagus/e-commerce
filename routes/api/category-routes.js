const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories and its associated products
  try{
    const categoryData= await Category.findAll({
      include:[{model:Product}],
    });
    res.status(200).json(categoryData);
  } catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find one category based on its id and its associated products
  try{
    const categoryData= await Category.findByPk(req.params.id,{
      include:[{model:Product}]
    });
    if (!categoryData){
      res.status(404).json({message: 'No category found with this id!'})
      return;
    }
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try{
    const newCategory=req.body;
    const categoryData= await Category.create(newCategory);
    res.status(200).json(categoryData);
  } catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try{
    const categoryData= await Category.update(req.body,{
      where: {
        id: req.params.id
      }
    })
    if(!categoryData){
      res.status(404).json({message: 'No category found with this id!'})
      return;
    }
    res.status(200).json(categoryData);
  } catch (err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try{
    const categoryData= await Category.destroy({
      where:{
        id: req.params.id
      }
    })
    if(!categoryData){
      res.status(404).json({message: 'No category found with this id!'})
      return;
    }
    res.status(200).json(categoryData);
  } catch (err){
    res.status(500).json(err);
  }

});

module.exports = router;
