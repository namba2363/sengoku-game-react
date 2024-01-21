// components/Ryuhou.js
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.REACT_APP_URL, process.env.REACT_APP_ANON);

const Ryuhou = () => {
    const [samuraiDetails, setSamuraiDetails] = useState(null);
    const [power, setPower] = useState(null);  // powerの状態を追加

    useEffect(() => {getSamuraiDetails();}, []);

    async function getSamuraiDetails() {
        let { data } = await supabase
            .from("samurai")
            .select("*")
            .eq("id", 2)  // Query for the samurai with id of 1
            .single();
        setSamuraiDetails(data);

        if (data) {
            setPower(data.buryoku * data.chiryoku);
        }
    }

    if (!samuraiDetails) return <div>Loading...</div>;

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

export default Ryuhou;
