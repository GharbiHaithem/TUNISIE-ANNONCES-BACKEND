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
            const annonces = await Annonce.find({}).populate('createdBy rubrique')
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
        const annonce = await Annonce.findOne({ _id: id }).populate('createdBy rubrique');

        if (!annonce) {
            return res.status(404).json({ message: "Annonce non trouvée" });
        }

        res.status(200).json(annonce);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }
}
module.exports=annonceCtrl