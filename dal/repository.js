
import mongodbConnect from '../dal/mongodb';
import {AnonymousCredential} from "mongodb-stitch-browser-sdk";

const client = Stitch.initializeDefaultAppClient("canadaweeklyearnings-voxly");

const mongodb = client.getServiceClient(
    RemoteMongoClient.factory,
    "mongodb-atlas"
  );    

const authenticate = client.auth.loginWithCredential(new AnonymousCredential())
const db = mongodb.db("earnings");


//returns a promise that will be resolved with a setter; 
function _getIndustries() {

    let error;        
    let promisse = authenticate.then(user => {
  
    return db.collection("convertcsv")
                .aggregate([
                  {"$group" : {_id:"$Industry"}}
                    ]
                )
                //   .find([{}], { limit: 10 })
                .asArray()                
            
               
        }).catch((e)=> { error = e;})
 
    if(promisse){
        return promisse;
    } else {
        throw error;
    }     
       }

 function setIndustries(dispatch){

    _getIndustries().then(industries => {

        //we want to clenup the result from the response
        let i = industries.map((elm)=>{
            return elm._id.replace(/\[.*?\]/g, "");
        });

        //dispatch is to the store
        dispatch({
          type: "UPDATE",
          update : i
      }) 

})
 }      

export  {getIndustries, setIndustries};       
