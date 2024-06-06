import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import TrainStatus from "../pages/TrainStatus";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trainStatus" element={<TrainStatus />} />
      </Routes>
    </BrowserRouter>
  );
}