import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.REACT_APP_URL, process.env.REACT_APP_ANON);

const Eisei = () => {
    const [samuraiId, setSamuraiId] = useState(''); // 自分のサムライIDを管理する状態
    const [samuraiDetails, setSamuraiDetails] = useState(null); // 自分のサムライの詳細情報
    const [opponentDetails, setOpponentDetails] = useState(null); // 対戦相手のサムライの詳細情報
    const [power, setPower] = useState(null); // 自分のパワー
    const [opponentPower, setOpponentPower] = useState(null); // 対戦相手のパワー
    const [battleResult, setBattleResult] = useState(""); // バトルの結果

    const fetchDetailsById = async (id, isOpponent = false) => {
        const { data, error } = await supabase
            .from("samurai")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            console.error("Error fetching details:", error);
            return;
        }
        if (isOpponent) {
            setOpponentDetails(data);
            setOpponentPower(calculatePower(data));
        } else {
            setSamuraiDetails(data);
            setPower(calculatePower(data));
        }
    };

    const handleFetchSamuraiDetails = () => {
        fetchDetailsById(samuraiId);
    };

    const handleGetOpponentDetails = async () => {
        const id = await getRandomId();
        fetchDetailsById(id, true);
    };

    const calculatePower = (data) => {
        return data.chara < 11 ? 12 : Math.floor(Math.random() * 11);
    };

    const startBattle = () => {
        if (!power || !opponentPower) {
            console.log("Power values are not set.");
            return;
        }
        // 武力 (buryoku) を比較して勝者を決定
        const winnerName = samuraiDetails.buryoku > opponentDetails.buryoku ?
            samuraiDetails.name : opponentDetails.name;
        setBattleResult(`勝者: ${winnerName}`);
    };

    async function getRandomId() {
        const { data, error } = await supabase
            .from("samurai")
            .select("id");
        if (error) {
            console.error("Error fetching samurai ids:", error);
            return;
        }
        const randomIndex = Math.floor(Math.random() * data.length);
        return data[randomIndex].id;
    }

    return (
        <div>
            <h1>Samurai Details</h1>
            <input
                type="text"
                value={samuraiId}
                onChange={(e) => setSamuraiId(e.target.value)}
                placeholder="Enter Samurai ID"
            />
            <button onClick={handleFetchSamuraiDetails}>自分のSamuraiを取得</button>
            {samuraiDetails && (
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
                                    {/* <th>Power</th> */}
                                    {/* <td>{opponentPower}</td> */}
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
            )}

            <h1>Opponent Details</h1>
            <button onClick={handleGetOpponentDetails}>対戦相手を取得</button>
            {opponentDetails && (
                <table>
                    <tbody>
                        {opponentDetails && (
                            <>
                                <tr>
                                    <th>Name</th>
                                    <td>{opponentDetails.name}</td>
                                </tr>
                                <tr>
                                    <th>Type</th>
                                    <td>{opponentDetails.type}</td>
                                </tr>
                                <tr>
                                    <th>Buryoku</th>
                                    <td>{opponentDetails.buryoku}</td>
                                </tr>
                                <tr>
                                    <th>Chiryoku</th>
                                    <td>{opponentDetails.chiryoku}</td>
                                </tr>
                                <tr>
                                    {/* <th>Power</th> */}
                                    {/* <td>{power}</td> */}
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
            )}

            <button onClick={startBattle}>バトル開始</button>
            {battleResult && <p>{battleResult}</p>}
        </div>
    );
};

export default Eisei;
