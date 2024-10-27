import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes } from "./privateRoutes";
import { publicRoutes } from "./publicRoutes";
import ProtectedRoute from "./ProtectedRoute";
const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {publicRoutes.map(({ key, path, component: Component }) => (
          <Route key={key} path={path} element={Component} /> )
        )}
        
        {privateRoutes.map(
          ({ key, path, component: Component, allowedRoles }) => (
            <Route
              key={key}
              path={path}
              element={
                <ProtectedRoute allowedRoles={allowedRoles}>
                  <Component />
                </ProtectedRoute> }/>
                ) ) }
      </Routes>
    </Router>
  );
};

export default AppRoutes;
