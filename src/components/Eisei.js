import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.REACT_APP_URL, process.env.REACT_APP_ANON);

const Eisei = () => {
    const [samuraiDetails, setSamuraiDetails] = useState(null); // Samuraiの詳細情報の状態
    const [power, setPower] = useState(null); // Powerの状態
    const [gogyouDetails, setGogyouDetails] = useState(null); // Gogyouの詳細情報の状態
    const [gogyouOptions, setGogyouOptions] = useState([]); // Gogyouのオプションリストの状態
    const [samurai01Options, setSamurai01Options] = useState([]); // Samurai01のオプションリストの状態
    const [samurai02Options, setSamurai02Options] = useState([]); // Samurai02のオプションリストの状態
    const [random2, setRandom2] = useState(null); // Random2の状態

    useEffect(() => {
        getSamuraiDetails();
        getGogyouDetails();
        getGogyouOptions();
        getSamurai01Options();
        getSamurai02Options();
    }, []);

    async function getSamuraiDetails() {
        let { data, error } = await supabase
            .from("samurai")
            .select("*")
            .eq("id", 1)
            .single();
        if (error) {
            console.error("Error fetching samurai details:", error);
            return;
        }
        setSamuraiDetails(data);

        let calculatedPower = data ? (data.chara < 11 ? 12 : Math.floor(Math.random() * 11)) : null;
        setPower(calculatedPower);
    }

    async function getGogyouDetails() {
        let randomValue = Math.floor(Math.random() * 11);
        setRandom2(randomValue);
        let gogyouId = randomValue < 6 ? 1 : 2;
        let { data, error } = await supabase
            .from("gogyou")
            .select("*")
            .eq("gogyou_id", gogyouId)
            .single();
        if (error) {
            console.error("Error fetching Gogyou details:", error);
            return;
        }
        setGogyouDetails(data);
    }

    async function getGogyouOptions() {
        let { data, error } = await supabase
            .from("gogyou")
            .select("*");
        if (error) {
            console.error("Error fetching Gogyou options:", error);
            return;
        }
        setGogyouOptions(data);
    }

    async function getSamurai01Options() {
        let { data, error } = await supabase
            .from("samurai")
            .select("*")
            .eq("chara", 11);
        if (error) {
            console.error("Error fetching Samurai01 options:", error);
            return;
        }
        setSamurai01Options(data);
    }

    async function getSamurai02Options() {
        let { data, error } = await supabase
            .from("samurai")
            .select("*")
            .eq("chara", 21);
        if (error) {
            console.error("Error fetching Samurai02 options:", error);
            return;
        }
        setSamurai02Options(data);
    }

    if (!samuraiDetails) return <div>Loading...</div>;

    return (
        <div>
            <h1>Samurai Details</h1>
            <table>
                <tbody>
                    {samuraiDetails && (
                        <>
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
                        </>
                    )}
                    <tr>
                        <th>Random Value</th>
                        <td>{random2}</td>
                    </tr>
                    <tr>
                        <th>Gogyou Attribute</th>
                        <td>{gogyouDetails?.zokusei}</td>
                    </tr>
                </tbody>
            </table>

            <div>
                <h2>Gogyou Options</h2>
                <select>
                    {gogyouOptions.map((option, index) => (
                        <option key={index} value={option.gogyou_id}>{option.zokusei}</option>
                    ))}
                </select>
            </div>
            <div>
                <h2>Samurai 01 Options</h2>
                <select>
                    {samurai01Options.map((option, index) => (
                        <option key={index} value={option.id}>{option.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <h2>Samurai 02 Options</h2>
                <select>
                    {samurai02Options.map((option, index) => (
                        <option key={index} value={option.id}>{option.name}</option>
                    ))}
                </select>
            </div>
            <button type="button" onClick={() => console.log('Battle Start')}>バトル開始</button>
        </div>
    );
};

export default Eisei;
