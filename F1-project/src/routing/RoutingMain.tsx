import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  DriverPage,
  TeamPage,
  RacePage,
  AdminPage,
  QuizPage,
} from "../pages";
import MainNavigation from "../components/shared/MainNavigation";
import { DriverProvider } from "../context/DriverContext";
import { RaceProvider } from "../context/RaceContext";
import { TeamProvider } from "../context/TeamContext";
import { CustomDriverProvider } from "../context/CustomDriverContext";

const RoutingMain = () => {
  return (
    <BrowserRouter>
      <header className="container-fluid px-0">
        <MainNavigation></MainNavigation>
      </header>
      <main className="container">
        <TeamProvider>
          <RaceProvider>
            <DriverProvider>
              <CustomDriverProvider>
                <Routes>
                  <Route path="/" element={<HomePage />}></Route>
                  <Route path="quiz" element={<QuizPage />}></Route>
                  <Route path="drivers" element={<DriverPage />}></Route>
                  <Route path="teams" element={<TeamPage />}></Route>
                  <Route path="races" element={<RacePage />}></Route>
                  <Route path="admin" element={<AdminPage />}></Route>
                </Routes>
              </CustomDriverProvider>
            </DriverProvider>
          </RaceProvider>
        </TeamProvider>
      </main>
    </BrowserRouter>
  );
};

export default RoutingMain;
