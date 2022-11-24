import Layout from "../Header/Layout";
import styles from "../Header/Layout.module.css";
import axios from "axios";
import { useState, useEffect, React } from "react";
import LineChart from "../Charts/LineChart";

function Home() {
  const [error, setError] = useState(null); // eslint-disable-line no-unused-vars
  const [isLoading, setLoading] = useState(false);
  const [AllInfo, setAllInfo] = useState();

  let zData = {
    labels: "",
    datasets: [
      {
        label: "CPU",
        data: "",
        backgroundColor: "#E9DEF4",
        borderColor: "#766489",
        borderWidth: 2,
      },
      {
        label: "Memory",
        data: "",
        backgroundColor: "#F4BACE",
        borderColor: "#DD91AB",
        borderWidth: 2,
      },
      {
        label: "HDD",
        data: "",
        backgroundColor: "#B9D5F7",
        borderColor: "#879CB6",
        borderWidth: 2,
      },
    ],
  };

  const fetchAllInfo = async () => {
    try {
      setLoading(false);
      let datas = [[], [], []];
      let label = [];
      //setCpuInfo(null);

      const getCpu = await axios.get("http://175.202.40.152:9999/dbcpu");
      const getMem = await axios.get("http://175.202.40.152:9999/dbmem");
      const getDisk = await axios.get("http://175.202.40.152:9999/dbdisk");

      for await (let rows of getCpu.data) {
        let time = new Date(+new Date(rows[0]) + 3240 * 10000)
          .toISOString()
          .replace("T", " ")
          .replace(/\..*/, "");

        label.push(time);
        datas[0].push(rows[1]);
      }
      for await (let rows of getMem.data) datas[1].push(rows[1]);
      for await (let rows of getDisk.data) datas[2].push(rows[1]);

      zData.labels = label;

      for (let index in datas) {
        zData.datasets[index].data = datas[index];
      }

      //-------------------------------------------------------------------------------
      setAllInfo(zData); // 데이터는 response.data 안에 들어있습니다.s
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      fetchAllInfo();            
  }, 3000);

  return() => clearInterval(timer);  
  }, []);

  return (
    <Layout activeSidebar="Home">
      <div style={{ width: 1000, margin: "auto" }}>
        {isLoading && <LineChart chartData={AllInfo} />}
      </div>
    </Layout>
  );
}

export default Home;
