import axios from 'axios';
import Layout from "../Header/Layout";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function HDD() {
    const [error, setError] = useState(null); // eslint-disable-line no-unused-vars
    const [Loading, setLoading] = useState(false);
    const [HddInfo, setHddInfo] = useState();


    let zData = {
        labels: "",
        datasets: [
            {
                label: "HDD 사용량",
                data: "",
                backgroundColor: "#B9D5F7",
                fill: true,
                borderColor: "#879CB6",
                borderWidth: 2,
            },
        ],
    };

    const fetchHddInfo = async () => {
        try {
            setLoading(false);
            let label = [];
            let weight = [];
            //setHddInfo(null);

            const response = await axios.get('http://175.202.40.152:9999/dbdisk');
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
            setHddInfo(zData); // 데이터는 response.data 안에 들어있습니다.s
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);
        } catch (e) {
            setError(e);
        }

    };

    useEffect(() => {
        const timer = setInterval(() => {
            fetchHddInfo();            
        }, 1000);

        return() => clearInterval(timer);  
    }, []);

    return (
        <div className="HDD">
            <Layout activeSidebar="HDD">
                <div style={{ width: 1000, margin: 'auto' }}>
                    {Loading && <Line data={HddInfo} />}
                </div>
            </Layout>
        </div>
    );
}

export default HDD;
