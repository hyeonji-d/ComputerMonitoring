import axios from 'axios';
import { CpuData } from "../Charts/Data"; // eslint-disable-line no-unused-vars
import Layout from "../Header/Layout";
import { useState, useEffect } from "react";
import { Line} from "react-chartjs-2";


function Memory() {
  const [error, setError] = useState(null); // eslint-disable-line no-unused-vars
  const [Loading, setLoading] = useState(false);
  const [MemInfo, setMemInfo] = useState();

  //---------------------------------------------------------------
  let zData = {
    labels: "",
    datasets: [
      {
        label: "Mem 사용량",
        data: "",
        backgroundColor: "#F4BACE",
        fill: true,
        borderColor: "#DD91AB",
        borderWidth: 2,
      },
    ],
  };

  const fetchMemInfo = async () => {
    try {
      setLoading(false);
      let label = [];
      let weight = [];
      const response = await axios.get('http://175.202.40.152:9999/dbmem');
      //-------------------------------------------------------------------------------
      // zData.labels = response.data.map((param) => param.date);
      // zData.datasets.data = response.data.map((param) => param.utilization);

      for await (let rows of response.data)
      {
          let time = new Date(+new Date(rows[0]) + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, "");

          label.push(time);
          weight.push(rows[1]);
      }

      zData.labels = label;
      zData.datasets[0].data = weight;
      //-------------------------------------------------------------------------------
      setMemInfo(zData); // 데이터는 response.data 안에 들어있습니다.s
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
    } catch (e) {
      setError(e);
    }

  };

  useEffect(() => {
    const timer = setInterval(() => {
      fetchMemInfo();            
  }, 1000);

  return() => clearInterval(timer); 
  }, []);


  return (
    <div className="Memory">
      <Layout activeSidebar="Memory">
        <div style={{ width: 1000, margin: 'auto' }}>
          {Loading && <Line data={MemInfo} />}
        </div>
      </Layout>
    </div>
  );
}

export default Memory;
