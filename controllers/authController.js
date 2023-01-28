const createError = require('http-errors');
const User = require('../database/models/User');
const errorResponse = require('../helpers/errorResponse');
const generateJWT = require('../helpers/generateJWT');
const generateTokenRandom = require('../helpers/generateTokenRandom');

module.exports = {
    register : async (req,res) => {
        try {

            const {name,email,password} = req.body;

            if([name,email,password].includes("")){
                throw createError(400,"Todos los campos son obligatorios");
            };

            let user = await User.findOne({
                email
            });

            if(user){
                throw createError(400,"El email ya se encuentra registrado");
            }

            user = new User(req.body);
            user.token = generateTokenRandom();

            const userStore = await user.save();

            //TODO: enviar el email de confirmación con el TOKEN

            return res.status(201).json({
                ok : true,
                msg :'Usuario Registrado',
                data : userStore
            })

        } catch (error) {
            return errorResponse(res,error, "REGISTER")
        }
       
    },
    login : async (req,res) => {

        const {email,password} = req.body;
        
        try {

            if([email,password].includes("")){
                throw createError(400,"Todos los campos son obligatorios");
            };

            let user = await User.findOne({
                email
            });

            if(!user){
                throw createError(403,"Credenciales inválidas | EMAIL");
            };

            if(!user.checked){
                throw createError(403,"Tu cuenta no ha sido confirmada");
            };

            if(!await user.checkedPassword(password)){
                throw createError(403,"Credenciales inválidas | PASSWORD");
            }

            return res.status(200).json({
                ok : true,
                msg :'Usuario Logueado',
                user : {
                    nombre : user.name,
                    email : user.email,
                    token : generateJWT({
                        id: user._id
                    })
                }
            })
        } catch (error) {
            return errorResponse(res,error, "LOGIN")
        }
    },
    checked : async (req,res) => {

        const {token} = req.query; 
        try {

            if(!token){
                throw createError(400,"Token inexistente");
            };

            const user = await User.findOne({
                token
            });

            if(!user){
                throw createError(400,"Token inválido");
            };

            user.checked = true;
            user.token = "";

            await user.save()

            return res.status(201).json({
                ok : true,
                msg :'Registro completado exitosamente'
            })
        } catch (error) {
            return errorResponse(res,error, "CHECKED")

        }
    },
    sendToken : async (req,res) => {

        const {email} = req.body;

        try {

            let user = await User.findOne({
                email
            });

            if(!user) throw createError(400,"Email incorrecto");

            user.token = generateTokenRandom();
            await user.save();

            //TODO: Enviar email para reestablecer la contraseña

            return res.status(200).json({
                ok : true,
                msg :'Se ha enviado un email con las intrucciones'
            })
        } catch (error) {
            return errorResponse(res,error, "SEND-TOKEN")
        }
    },
    verifyToken : async (req,res) => {
        try {
            return res.status(200).json({
                ok : true,
                msg :'Token verificado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'Upss, hubo un error en VERIFY-TOKEN'
            })
        }
    },
    changePassword : async (req,res) => {
        try {
            return res.status(200).json({
                ok : true,
                msg :'Password actualizado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'Upss, hubo un error en CHANGE-PASSWORD'
            })
        }
    },
}