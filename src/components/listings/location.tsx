"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";

type TLocation = {
  selectPosition: any;
  setPosition: any;
  form: any;
};

const Location = ({ selectPosition, setPosition, form }: TLocation) => {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        ssr: false,
      }),
    [location],
  );

  return (
    <div className="location">
      <div className="map__content">
        <Map center={selectPosition} />
      </div>
    </div>
  );
};

export default Location;
