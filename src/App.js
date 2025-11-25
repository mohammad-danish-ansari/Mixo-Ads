import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "./utils/alerts";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
const DashboardLayoutBasic = lazy(() =>
  import("./pages/DashboardLayout/DashboardLayout")
);
const DashboardContent = lazy(() =>
  import("./pages/DashboardContent/DashboardContent")
);
const Campaigns = lazy(() => import("./pages/Campaigns/Campaigns"));
const SingleCampaigns = lazy(() =>
  import("./components/SingleCampaigns/SingleCampaigns")
);
const Insights = lazy(() => import("./pages/Insights/Insights"));
const CampaignInsights = lazy(() =>
  import("./pages/Insights/CampaignInsights")
);
const InsightStream = lazy(() => import("./pages/Insights/InsightStream"));

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<DashboardLayoutBasic />}>
              <Route index element={<DashboardContent />} />
              <Route path="Campaigns" element={<Campaigns />} />
              <Route path="/campaigns/:id" element={<SingleCampaigns />} />
              <Route
                path="/campaigns/:id/insights"
                element={<CampaignInsights />}
              />
              <Route path="/insights" element={<Insights />} />
              <Route path="/campaigns/:id/stream" element={<InsightStream />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
