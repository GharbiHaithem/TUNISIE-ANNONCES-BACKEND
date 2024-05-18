const Category = require('../model/category')
async function getAllCategories() {
  const rootCategories = await Category.find({ parentID: null });
  return rootCategories;
}

// Récupérer les enfants d'une catégorie spécifique
async function getChildren(categoryId) {
  const category = await Category.findById(categoryId).populate('children');
  return category.children;
}

// Récupérer la hiérarchie complète des catégories avec leurs enfants
async function getCategoryHierarchy(category) {
  const children = await getChildren(category._id);
  const hierarchy = {
    ...category._doc,
    children: [],
  };
  for (const child of children) {
    const childHierarchy = await getCategoryHierarchy(child);
    hierarchy.children.push(childHierarchy);
  }
  return hierarchy;
}

const categoryCtrl = {
    createCategoryProduct : async(req,res)=>{
      try {
         const { title, parentID } = req.body;
        let newCategory
        if(parentID){
         const parentCategory = await Category.findById(parentID)
         if(!parentCategory){
            return res.status(400).json({message:'category parent n existepas'})
         }
         newCategory = new Category({title,parentID:parentCategory._id})
        parentCategory.children.push(newCategory._id)
         await parentCategory.save()
        }else{
         newCategory = new Category({title})
        }   
      await newCategory.save()
      res.status(201).json(newCategory)
       } catch (error) {
         res.status(400).json({ error: error.message });
       }
    },
    deleteCategoryProduct:async(req,res)=>{
      const { id } = req.params
      const isValid = mongoose.Types.ObjectId.isValid(id)
     if(!isValid)return res.json({message:'identifiant not found '})
      try
      {
       const category = await Category.findByIdAndDelete(id)
       res.json(category)  
      }catch(err){
      res.json({message:err.message})
      }
   },
   updateCategoryProduct:async(req,res)=>{
      const { id } = req.params
      const isValid = mongoose.Types.ObjectId.isValid(id)
      if(!isValid)return res.json({message:'identifiant not found '})
      try
      {
     const updateCategory = await Category.findByIdAndUpdate(id ,req.body , {new:true})
     res.json(updateCategory)
      }catch(err){
     res.json({message:err.message})
      }
   },
   getaCategoryProduct:async(req,res)=>{
     const { id } =req.params
     const isValid = mongoose.Types.ObjectId.isValid(id)
     if(!isValid)return res.json({message:'identifiant not found '})
        try{
    const category = await Category.findById(id)
    res.json(category) 
      }catch(err){
         res.json({message:err.message})
      }
   },
   getAllCategoryProduct : async(req,res)=>{
      try {
         const rootCategories = await getAllCategories();
         const populatedCategories = await Category.populate(rootCategories, {
           path: 'children',
           path:'parentID',
           populate: {
             path: 'children',
             populate: {
               path: 'children.parentID',
             },
            
           },
          
         });
       
         const categoriesWithChildren = [];
         for (const rootCategory of rootCategories) {
           const categoryHierarchy = await getCategoryHierarchy(rootCategory);
           categoriesWithChildren.push(categoryHierarchy);
         }
         res.status(200).json(categoriesWithChildren);
       } catch (error) {
         res.status(400).json({ error: error.message });
       }
   },
}
module.exports = categoryCtrl