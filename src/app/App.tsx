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
import ErrorBoundary from "./ErrorBoundary";
import { constants } from "../shared/constants";

const baseUrl = "agrilution_app";
/**
 * @description The main component of the app.
 * Renders each selected plant in a separate page: /plant/:id
 * @returns {JSX.Element}
 */
function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <Provider store={store}>
              <Header />
              <Routes>
                <Route path="/agrilution_app" element={<HomePage />} />
                <Route path="/agrilution_app/plants" element={<PlantsPage />} />
                <Route path="/agrilution_app/plants/:id" element={<SelectedPlantPage />} />
                <Route path="/agrilution_app/*" element={<NotFoundPage />} />
              </Routes>
              <Footer />
            </Provider>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;
