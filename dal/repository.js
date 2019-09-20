
import mongodbConnect from '../dal/mongodb';
import {AnonymousCredential} from "mongodb-stitch-browser-sdk";


//returns a promise that will be resolved with a setter; 
function _getIndustries() {

        let promise;
        let error;
        const query = [{"$group" : {_id:"$Industry"}}];

        mongodbConnect("earnings", (db, client)=>{
            
            const authenticate = client.auth.loginWithCredential(new AnonymousCredential())
            
            promise = authenticate.then(user => {
      
                    let result = db
                    .collection("convertcsv")
                    .aggregate(query)
                    .asArray()                
                
                return result;

            }).catch((e)=> { error = e;})
            
        });
     
            if(promise){
                return promise;
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