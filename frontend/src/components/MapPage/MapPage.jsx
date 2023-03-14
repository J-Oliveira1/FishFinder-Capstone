import React from 'react';
import FishingHoleForm from '../FishingHoleForm/FishingHoleForm';
import FishingHoleList from '../FishingHoleList/FishingHoleList';

const MapPage = () => {
  return (
    <div>
      <h1>List of Fishing Holes</h1>
      <FishingHoleList />
      <FishingHoleForm/>
    </div>
  );
};

export default MapPage;
