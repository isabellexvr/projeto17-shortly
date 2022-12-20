import { connectionDB } from "../database/db.js";

export async function tokenValidation(req,res,next){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if(!token){
        return res.status(401).send("Nenhum token foi enviado.");
    }
    try{
        const isThereAnySession = connectionDB.query(`SELECT * FROM sessions WHERE token=$1`,[token]);
        if(isThereAnySession.rows.length < 1){
            return res.status(401).send("Não existe sessão com essa token");
        }
    }catch (err) {
        res.status(500).send(err.message);
        console.log(err.message);
      }
}