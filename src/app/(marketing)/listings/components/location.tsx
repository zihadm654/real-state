'use client';
import CountrySelect from '@/components/inputs/CountrySelect';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
type TLocation = {
  selectPosition: any;
  setPosition: any;
  form: any;
};

const Location = ({ selectPosition, setPosition, form }: TLocation) => {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/Map'), {
        ssr: false,
      }),
    [location]
  );

  return (
    <div className='location'>
      <CountrySelect
        form={form}
        setPosition={setPosition}
        position={selectPosition}
      />
      <div className='map__content'>
        <Map center={selectPosition} />
      </div>
    </div>
  );
};

export default Location;
