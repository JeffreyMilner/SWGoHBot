module.exports = clientMongo => {

    const mongo = clientMongo;

    return {
        put:put,
        get:get
    };


    async function put( database, collection, matchCondition, saveObject, autoUpdate=true ) {
        if ( !database ) { throw new Error("No database specified to put"); }
        if ( !collection ) { throw new Error("No collection specified to put"); }
        if ( !saveObject ) { throw new Error("No object provided to put"); }

        const dbo = await mongo.db( database );

        if (!saveObject.updated && autoUpdate) {
            //set updated time to now
            saveObject.updated = new Date();
            saveObject.updated = saveObject.updated.getTime();
        }

        //Try update or insert
        matchCondition = matchCondition || {};
        await dbo.collection(collection).updateOne(matchCondition,
            { $set: saveObject },
            { upsert:true }
        );

        return saveObject;
    }

    async function get( database, collection, matchCondition, projection ) {
        if ( !database ) { throw new Error("No database specified to get"); }
        if ( !collection ) { throw new Error("No collection specified to get"); }

        const dbo = await mongo.db( database );

        matchCondition = matchCondition || {};
        projection = projection || {};
        return await dbo.collection(collection).find(matchCondition).project(projection).toArray();
    }
};
