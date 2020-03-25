import React from 'react';

import './loader-animation-styles.scss';

export function Loader() {
  return(
    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  );
}
