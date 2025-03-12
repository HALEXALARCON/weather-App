import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "./SkeletonWeather.css"; 

const SkeletonWeather = () => {
  return (
    <div className="skeleton-weather-card">
      <SkeletonTheme baseColor="#ffffff" highlightColor="#f0f0f0">
        <div className="skeleton-title">
          <Skeleton width="80%" height={30} />
        </div>
        <div className="skeleton-location">
          <Skeleton width="60%" height={20} />
        </div>
        <div className="skeleton-icon">
          <Skeleton circle={true} height={100} width={100} />
        </div>
        <div className="skeleton-description">
          <Skeleton width="70%" height={25} />
        </div>
        <div className="skeleton-details">
          <Skeleton width="90%" height={16} count={4} style={{ marginBottom: '0.5rem' }}/>
        </div>
        <div className="skeleton-temp">
          <Skeleton width="50%" height={40} />
        </div>
        <div className="skeleton-button">
          <Skeleton width="100%" height={35} />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default SkeletonWeather;
