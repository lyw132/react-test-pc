import Bar from "@/components/bar";
import "./home.scss";
const Home = () => {
  return (
    <div className="home">
      <Bar
        style={{ width: "500px", height: "400px" }}
        xData={["vue", "angular", "react"]}
        sData={[50, 60, 70]}
        title="三大框架满意度"
      />
    </div>
  );
};

export default Home;
