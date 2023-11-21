import { client } from "../dbAccess/postgresConnection";
import { addDataToTableQuery, addTableQuery, checkExistDataQuery, checkExistTableQuery } from "./queries";

const initialData = async () => {
    try{
        const checkTableExist = await client.query(checkExistTableQuery);
        if(!checkTableExist.rows[0].to_regclass){
            console.log(`Initial table...`);
            await client.query(addTableQuery);

            console.log(`Add data to table...`);
            await client.query(addDataToTableQuery);
        }else{
            const data = await client.query(checkExistDataQuery);
            if(data.rows.length){
                await client.query(addDataToTableQuery);
            }
        }
        return "Data initial successfully"
    }catch(error){
        console.log("error has accord:\n", error);
        return "error has accord during inital data";
    }
    
}

export default initialData;