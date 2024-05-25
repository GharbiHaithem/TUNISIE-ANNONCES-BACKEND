const Annonce = require('../model/annonce')
const mongoose = require('mongoose');
const annonceCtrl = {
    createAnnonce: async( req,res)=>{
        const{_id} = req.user
        console.log(_id)
        try {
            const newannonce =(new Annonce({...req.body , createdBy:_id}))
        await newannonce.save()
             res.status(201).json(newannonce)
        } catch (error) {
             res.status(500).json({error:error.message})
        }
    },
    getAllAnnonce : async(req,res)=>{
        try {
            const limit = req.query.limit|| 6;
            const annonces = await Annonce.find({}).populate('createdBy rubrique').populate({
                path:'rubrique',
                populate:{
                    path:'parentID',
                    model:'Category'
                }
            }).limit(limit)   
            res.status(201).json(annonces)
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    },
    getMyAllAnnonces: async(req,res)=>{
        try {
            const{_id} = req.user
            console.log(_id)
            const annonces = await Annonce.find({createdBy:_id}).populate('createdBy rubrique').populate({
                path:'rubrique',
                populate:{
                    path:'parentID',
                    model:'Category'
                }
            })   
            res.status(200).json(annonces)
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    },
    getannByid : async( req,res)=>{
        try {
        const { id } = req.params;

        // Vérifier si l'ID est au format ObjectId valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de l\'annonce invalide' });
        }

        // Maintenant, vous pouvez exécuter la requête MongoDB
        const annonce = await Annonce.findOne({ _id: id }).populate('createdBy rubrique').populate({
            path:'rubrique',
            populate:{
                path:'parentID',
                model:'Category'
            }
        }) 

        if (!annonce) {
            return res.status(404).json({ message: "Annonce non trouvée" });
        }

        res.status(200).json(annonce);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    },
    updateAnnonces: async(req,res)=>{
        try {
            const { id } = req.params;
            
            // Vérification de l'ID
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
            
            // Mise à jour de l'annonce
            const updatedAnnonce = await Annonce.findByIdAndUpdate(id, req.body, {
                new: true, 
                upsert: true,
                runValidators: true // Pour s'assurer que les nouvelles données respectent le schéma
            });
    
            if (!updatedAnnonce) {
                return res.status(404).json({ message: 'Annonce not found' });
            }
    
            res.status(200).json(updatedAnnonce);
        } catch (error) {
            console.error('Error updating annonce:', error); // Log l'erreur pour le débogage
            res.status(500).json({ message: error.message });
        }
    },
    deleteImageAnnonce: async(req,res)=>{
        try {
            const {annonceId , public_id} = req.params
           const delImgAnnonce = await Annonce.findByIdAndUpdate(annonceId,{$pull:{image_annonce:{public_id}}},{new:true}) 
        if(!delImgAnnonce){
            res.status(404).json({message:'annonce non trouvé'})
        }
        res.status(200).json(delImgAnnonce)
        } catch (error) {
            res.status(500).json({message:error.message}) 
        }
    },
    getAnnoncesByUser:async(req,res)=>{
        try {
         const {userid} = req.params
         const annonces =await Annonce.find({createdBy:userid}).populate('rubrique').populate({
            path:'rubrique',
            populate:{
                path:'parentID',
                model:'Category'
            }
        })   
         if(!annonces){
            res.status(404).json({message: "Pas d 'annonce dans  la magasin"})
         }   
         res.status(200).json(annonces)
        } catch (error) {
            res.status(500).json({message:error.message})  
        }
    }
}
module.exports=annonceCtrl