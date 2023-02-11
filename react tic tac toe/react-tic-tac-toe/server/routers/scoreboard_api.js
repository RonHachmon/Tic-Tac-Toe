const express = require('express')
const fs = require("fs").promises;
const router = new express.Router();
const DATABASE_PATH='./database/scoreboard.json'
let g_winner=undefined


router.get('/', (req, res) => { get_score(req, res ) } )
router.post('/', (req, res) => { post_score(req, res ) } )



const get_score = (req, res)=>
{
    if(g_winner== undefined)
    {
        g_winner=boot_system()
    }
    res.status(200).json(g_winner);
}

const boot_system=async()=>
{
    g_winner= await load_from_DB(DATABASE_PATH,g_winner)
    if(!g_winner)
    {
        g_winner=[];
    }

    console.log("sucessfuly loaded array user");
    
}
const load_from_DB=async(path)=>
{

    const buffer_data= await fs.readFile(path,(e)=>{})
    if(buffer_data.length>1)
    { 
        const json_data=buffer_data.toString();
        return JSON.parse(json_data);
    } 
}


const post_score = async (req, res)=>
{
    if(req.body)
    {
        g_winner.push(req.body)
        await fs.writeFile(DATABASE_PATH,JSON.stringify(g_winner),(e)=>{
        })
        res.status(201).send("");
    }
    else
    {
        res.status(400).send("missing data object");
    }
}


module.exports = router