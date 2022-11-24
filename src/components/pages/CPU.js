import axios from 'axios';
import Layout from "../Header/Layout";
import { CpuData } from "../Charts/Data"; // eslint-disable-line no-unused-vars
import { useState, useEffect } from "react";
import LineChart from "../Charts/LineChart";

function CPU() {
    const [error, setError] = useState(null); // eslint-disable-line no-unused-vars
    const [isLoading, setLoading] = useState(false);
    const [CpuInfo, setCpuInfo] = useState();

    //---------------------------------------------------------------
    let zData = {
        labels: "",
        datasets: [
            {
                label: "CPU 사용량",
                data: "",
                fill: true,
                backgroundColor: "#E9DEF4",
                borderColor: "#766489",
                borderWidth: 2,
            },
        ],
    };

    const fetchCpuInfo = async () => {
        try {
            setLoading(false);
            let label = [];
            let weight = [];
            console.log("fetchCpuInfo : ");
            //setCpuInfo(null);

            const response = await axios.get('http://175.202.40.152:9999/dbcpu');

            for await (let rows of response.data)
            {
                let time = new Date(+new Date(rows[0]) + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, "");
      
                label.push(time);
                weight.push(rows[1]);
            }

            zData.labels = label;
            zData.datasets[0].data = weight;

            //-------------------------------------------------------------------------------
            setCpuInfo(zData); // 데이터는 response.data 안에 들어있습니다.s
            console.log("zData : ", zData);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);
        } catch (e) {
            setError(e);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            console.log("fetchCpuInfo : ");
            fetchCpuInfo();            
        }, 1000);

        return() => clearInterval(timer);  
        
    }, []);

    return (
        <div className="CPU">
            <Layout activeSidebar="CPU">
                <div style={{ width: 1000, margin: 'auto', marginTop : 50}}>
                    {isLoading && <LineChart chartData={CpuInfo} />}
                </div>
            </Layout>
        </div>
    );
}

export default CPU;
