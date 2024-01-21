// components/SamuraiPage.js
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.REACT_APP_URL, process.env.REACT_APP_ANON);

const Eisei = () => {
    const [samuraiDetails, setSamuraiDetails] = useState(null);
    const [power, setPower] = useState(null);  // powerの状態を追加

    useEffect(() => {
        getSamuraiDetails();
    }, []);

    async function getSamuraiDetails() {
        let { data } = await supabase
            .from("samurai")
            .select("*")
            .eq("id", 1)  // Query for the samurai with id of 1
            .single();
        setSamuraiDetails(data);

        // buryokuとchiryokuを掛け合わせてpowerを計算
        if (data) {

            if(data.chara<11){
                setPower(12);
                //setPower(data.buryoku * data.chiryoku);
                
            }else{
                
                setPower(data.buryoku * data.chiryoku);
            }
        
        
        
        
        
        }
    }

    if (!samuraiDetails) return <div>Loading...</div>;

    // Render samurai details in a table
    return (
        <div>
            <h1>Samurai Details</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{samuraiDetails.name}</td>
                    </tr>
                    <tr>
                        <th>Type</th>
                        <td>{samuraiDetails.type}</td>
                    </tr>
                    <tr>
                        <th>Buryoku</th>
                        <td>{samuraiDetails.buryoku}</td>
                    </tr>
                    <tr>
                        <th>Chiryoku</th>
                        <td>{samuraiDetails.chiryoku}</td>
                    </tr>
                    <tr>
                        <th>Power</th>
                        <td>{power}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Eisei;
