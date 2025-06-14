import { useState } from "react";

function CPUBox({ stats }) {
  return (
    <>
      <div className="CPU-box">
        <div className="CPU-usage-percent">{stats.cpu.percent_used}</div>
        <div className="CPU-cores">CORES: {stats.cpu.number_of_cores}</div>
        <label className="box-label"> CPU </label>
      </div>
    </>
  );
}

function MemoryBox({ stats }) {
  return (
    <>
      <div className="memory-box">
        <div className="memory-usage-percent">{stats.memory.percent_used}</div>
        <div className="memory-data">
          <label> TOTAL: {stats.memory.total} MB </label>
          <label> Available: {stats.memory.available} MB</label>
        </div>
        <label className="box-label"> Memory </label>
      </div>
    </>
  );
}

function MainContainer() {
  const [currentState, setCurrentState] = useState({
    cpu: {
      number_of_cores: "0",
      percent_used: "0",
    },
    memory: {
      total: "0",
      available: "0",
      percent_used: "0",
    },
  });
  const handleClick = async () => {
    const responses = await fetch(`http://127.0.0.1:5000/get_stats`);
    const data = await responses.json();
    setCurrentState({
      cpu: {
        number_of_cores: data.cpu.number,
        percent_used: data.cpu.percent_used,
      },
      memory: {
        total: data.memory.total,
        available: data.memory.available,
        percent_used: data.memory.percent_used,
      },
    });
  };
  return (
    <div className="main-container">
      <div className="stats-row">
        <CPUBox stats={currentState} />
        <MemoryBox stats={currentState} />
      </div>
      <button className="refresh-button" onClick={handleClick}>Refresh Stats</button>
    </div>
  );
}

export default function Main() {
  return <MainContainer />;
}
