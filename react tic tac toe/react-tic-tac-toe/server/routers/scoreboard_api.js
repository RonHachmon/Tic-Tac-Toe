const { v4: uuidv4 } = require('uuid');
const express = require('express')

const fs = require("fs").promises;
const router = new express.Router();
const DATABASE_PATH='./database/scoreboard.json'
let g_winner=undefined


router.get('/', (req, res) => { get_score(req, res ) } )
router.post('/', (req, res) => { post_score(req, res ) } )
router.get('/:id', (req, res) => { getByUUID(req, res )  })

const getByUUID = async (req, res)=>
{
    let id = req.params.id;
    if(g_winner== undefined)
    {
        await boot_system()
    }

    const foundWinner = g_winner.find(winner => winner.uuid === id);
    if (foundWinner) {
    res.status(200).json(foundWinner);
    }
    else
    {
        res.status(400).send("no object with such id")
    }

}

const get_score =async (req, res)=>
{
    if(g_winner== undefined)
    {
        await boot_system()
    }

    if (Object.keys(req.query).length != 0)
    {
        const filteredResult=filterResultByQuery(req.query)
        res.status(200).json(filteredResult);
    }
    else
    {

        res.status(200).json(g_winner);
    }
}

//query example:
// http://localhost:4000/score?startDate=02-12-2023&endDate=02-10-2023&winner=X
// startDate : "02-12-2023"
// endDate : "04-12-2023"
// winner : X
const filterResultByQuery=(query)=>
{
    let startDate=undefined
    let endDate=undefined
    let winner=undefined
    if(query.startDate)
    {
        date=query.startDate.split("-")
        startDate = new Date( parseInt(date[2]),  parseInt(date[1]), parseInt(date[0]));
    }

    if(query.startDate)
    {
        date=query.endDate.split("-")
        endDate = new Date( parseInt(date[2]),  parseInt(date[1]), parseInt(date[0]));
    }
    if(query.winner)
    {
        winner=query.winner
    }

    const res=filterResult(g_winner,startDate,endDate,winner)


}

const filterResult = (winnersArray, startDate = undefined, endDate = undefined, winner = undefined) => {
    const res = winnersArray.filter((singleWinner) => {
      const currentDate = new Date(singleWinner.stringDate);
      return isWithinDateRange(currentDate, startDate, endDate) && isMatchingWinner(singleWinner.winner, winner);
    });
  
    return res;
  };
  
  const isWithinDateRange = (currentDate, startDate, endDate) => {
    return isStartDateBeforeCurrentDate(currentDate, startDate) && isEndDateAfterCurrentDate(currentDate, endDate);
  };
  
  const isStartDateBeforeCurrentDate = (currentDate, startDate) => {
    return startDate ? currentDate >= startDate : true;
  };
  
  const isEndDateAfterCurrentDate = (currentDate, endDate) => {
    return endDate ? currentDate <= endDate : true;
  };
  
  const isMatchingWinner = (currentWinner, winner) => {
    return winner ? currentWinner === winner : true;
  };
  


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
    if(g_winner== undefined)
    {
        await boot_system()
    }

    if(req.body)
    {
        req.body.uuid=uuidv4();
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


