import {Stitch, RemoteMongoClient} from "mongodb-stitch-browser-sdk";

  //this abstracts away the connection to the db. We're going to call this db actions using the callback function
  
  function mongodbConnect(dbname, callback){
    const client = Stitch.initializeDefaultAppClient("<YOUR KEY>");

    const mongodb = client.getServiceClient(
        RemoteMongoClient.factory,
        "mongodb-atlas"
      );    

      const db = mongodb.db(dbname);

      //callback is where the queries happen
      callback(db, client); 
  }

  export default mongodbConnect;