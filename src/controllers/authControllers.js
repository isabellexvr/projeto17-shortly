import { connectionDB } from "../database/db.js";

export async function registration(req, res) {
    const {name, email, password} = req.body;
    try{
        await connectionDB.query("INSERT INTO users (name, email, password) VALUES ($1,$2,$3)", [name, email, password])
        res.status(201).send("Usuário registrado com sucesso!")
    }catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

export async function login(req, res) {
    
}