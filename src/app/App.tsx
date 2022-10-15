import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PlantsPage } from "../pages/PlantsPage";
import { Header } from "../widgets/Header";
import { Provider } from "react-redux";
import "./index.scss";
import { store } from "../shared/store/store";
import { SelectedPlantPage } from "../pages/SelectedPlantPage";
import { Spinner } from "../shared/ui/Spinner";
import { Footer } from "../widgets/Footer";
import { constants } from "../utils/constants";

/**
 * @description This path is necessary for the deployment to github.
 */

/**
 * @description The main component of the app.
 * Renders each selected plant in a separate page: /plant/:id
 * @returns {JSX.Element}
 */
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path={`/${constants.baseUrl}`} element={<HomePage />} />
            <Route path={`/${constants.baseUrl}/plants`} element={<PlantsPage />} />
            <Route path={`/${constants.baseUrl}/plants/:id`} element={<SelectedPlantPage />} />
            <Route path={`/${constants.baseUrl}/*`} element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </Provider>
      </Suspense>
    </BrowserRouter>
    </div>
  );
}

export default App;
