// components/Ryuhou.js
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.REACT_APP_URL, process.env.REACT_APP_ANON);

const Eisei = () => {
    const [samuraiDetails, setSamuraiDetails] = useState([]);
    const [power, setPower] = useState(null);  // powerの状態を追加
    const [gogyouDetails, setGogyouDetails] = useState([]);//追加
    const [gogyou2Details, setGogyou2Details] = useState([]);//追加
    const [gogyouOptions, setGogyouOptions] = useState([]);
    const [random2, setRandom2] = useState(null);  //追加

    useEffect(() => {
        getSamuraiDetails();
        getGogyouDetails();
        getGogyou2Details();
        getGogyouOptions();
    }, []);

    async function getSamuraiDetails() {
        let { data } = await supabase
            .from("samurai")
            .select("*")
            .eq("id", 1)  // Query for the samurai with id of 1
            .single();
        setSamuraiDetails(data);


        if (data) {

            if (data.chara < 11) {
                setPower(12);
                //setPower(data.buryoku * data.chiryoku);

            } else {
                var random = Math.floor(Math.random() * 11);
                //console.log(random);
                setPower(random);
                //setPower(data.buryoku * data.chiryoku);
                //setPower(20);

            }
        }
    }

    async function getGogyouDetails() {
        var random2 = Math.floor(Math.random() * 11);
        setRandom2(random2);
        let gogyouId = random2 < 6 ? 1 : 2;
        let { data, error } = await supabase
            .from("gogyou")
            .select("*")
            .eq("gogyou_id", gogyouId)
            .single();
        if (error) {
            console.error(error);
        } else {
            setGogyouDetails(data);
        }
    }

    async function getGogyou2Details() {
        let gogyou2Data = [];
        for (var i = 1; i <= 5; i++) {
            let { data, error } = await supabase
                .from("gogyou")
                .select("*")
                .eq("gogyou_id", i)
                .single();
            if (error) {
                console.error(error);
            } else {
                gogyou2Data.push(data);
            }
        }
        setGogyou2Details(gogyou2Data);
    }


    async function getGogyouOptions() {
        let { data } = await supabase
            .from("gogyou")
            .select("*")
        setGogyouOptions(data);
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
                        <th>Random試作</th>
                        <td>{power}</td>
                    </tr>

                    <tr>
                        <th>５以下は火、６以上は木</th>
                        <td>{random2}</td>
                    </tr>
                    <tr>
                        <th>５以下は火、６以上は木</th>
                        <td>{gogyouDetails.zokusei}</td>
                    </tr>

                    <ul class="menu">
                        <li><a href="#">メニュー１</a></li>
                        <li class="dropdown">
                            <a href="#">メニュー２</a>
                            <ul class="submenu">
                                <li><a href="#">サブメニュー１</a></li>
                                <li><a href="#">サブメニュー２</a></li>
                                <li><a href="#">サブメニュー３</a></li>
                            </ul>
                        </li>
                    </ul>

                    <select>
                        {gogyouOptions.map((gogyou, index) => (
                            <option key={index}>{gogyou.zokusei}</option>
                        ))}
                        {gogyouDetails && <option>{gogyouDetails.zokusei}</option>}
                    </select>
                </tbody>
            </table>
        </div>
    );

};

export default Eisei;