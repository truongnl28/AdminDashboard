import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import RadiusConfigs from "./pages/RadiusConfigs";
import NotificationPreference from "./pages/NotificationPreference";
import PointsConfigs from "./pages/PointsConfigs";
import ManageProductCategories from "./pages/ManageProductCategories";
import UserManagement from "./pages/UserManagement";
import DetailsInformationUser from "./pages/DetailsInformation";
import RequireAuth from "./hooks/RequireAuth";
import PersistLogin from "./context/PersistLogin";
import RankList from './pages/Rank';
import TransactionList from './pages/TransactionItem';
import ItemsList from "./pages/ListOfItems";
import ReviewList from "./pages/ReviewList";
import DetailProduct from "./pages/DetailProduct";
import DetailedInformationReceived from "./pages/DetailedInformationReceived";
import PointExchange from "./pages/PointExchangeOrder";
import DetailPointExchange from "./pages/DetailPointExchange";

const ROLES = {
  Admin: "Admin",
};
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginPage />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
            <Route path="/" element={<RadiusConfigs />} />
            <Route
              path="/notificationPreference"
              element={<NotificationPreference />}
            />
            <Route path="/pointsConfigs" element={<PointsConfigs />} />
            <Route
              path="/manageProductCategories"
              element={<ManageProductCategories />}
            />
            <Route path="/userManagement" element={<UserManagement />} />
            <Route exact path="/rank" element={<RankList />} />
            <Route exact path="/transactionListItem" element={<TransactionList />} />
            <Route exact path="/listOfItems" element={<ItemsList />} />
            <Route exact path="/reviewList" element={<ReviewList />} />
            <Route exact path="/detailOfProduct" element={<DetailProduct />} />
            <Route exact path="/detailedInformationReceived" element={<DetailedInformationReceived />} />
            <Route exact path="/pointExchange" element={<PointExchange />} />
            <Route exact path="/detailPointExchange" element={<DetailPointExchange />} />
            <Route
              path="/:userId"
              element={<DetailsInformationUser />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
