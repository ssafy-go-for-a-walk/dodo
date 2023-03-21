import React from 'react';
import { Outlet } from 'react-router-dom';


export default function ComponentPageLayout() {
  return (
    <div><Outlet /></div>
  );
};
