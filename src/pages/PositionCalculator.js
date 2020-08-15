import React from "react";
import DashboardContainer from "../components/PositionsDashboard/DashboardContainer";
import SettingsSideBar from "../components/PositionsDashboard/SettingsSideBar";

const PositionCalculator = () => {
  return (
    <SettingsSideBar>
      <DashboardContainer classNames={["main--positionSizing"]} />
    </SettingsSideBar>
  );
};

export default PositionCalculator;
