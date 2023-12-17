import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.REACT_APP_URL, process.env.REACT_APP_ANON);

function App() {
  const [samurai, setSamurai] = useState([]);

  useEffect(() => {
    getSamurai();
  }, []);

  async function getSamurai() {
    const { data } = await supabase.from("samurai").select();
    setSamurai(data);
  }

  return (
    <ul>
      {samurai.map((samurai) => (
        <li key={samurai.name}>{samurai.name}</li>
      ))}
    </ul>
  );
}

export default App;