// App.js
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Eisei from "./components/Eisei";
import Ryuhou from "./components/Ryuhou";  // Ryuhouコンポーネントをインポート

const supabase = createClient(process.env.REACT_APP_URL, process.env.REACT_APP_ANON);

function App() {
  const [samurai, setSamurai] = useState([]);
  const [gogyou, setGogyou] = useState([]);//追加
  const [gogyou2, setGogyou2] = useState([]);//追加


  useEffect(() => {
    getSamurai();
    getGogyou();//追加
    getGogyou2();//追加
  }, []);

   async function getSamurai() {
    const { data } = await supabase.from("samurai").select();
    setSamurai(data);
  }

  async function getGogyou() {
    const { data } = await supabase.from("gogyou").select();
    setGogyou(data);
  }//追加

  async function getGogyou2() {
    const { data } = await supabase.from("gogyou").select();
    setGogyou2(data);
  }//追加

 return (
    <Router>
      <Routes>
        <Route path="/samurai/1" element={<Eisei />} />
        <Route path="/samurai/2" element={<Ryuhou />} />  // 新しいルートを追加
      </Routes>
    </Router>
  );
}

export default App;
