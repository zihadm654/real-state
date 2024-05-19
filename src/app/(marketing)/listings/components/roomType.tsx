'use client';

import SelectionSection from './layout/SelectionSection';
import DateSection from './layout/DateSection';
import NumberSection from './layout/NumberSection';
import InputSection from './layout/InputSection';
import LinkSection from './layout/LinkSection';

type TRoomType = {
  eventType: any;
  transferService: string;
  isDiscountAvailable: boolean;
  form: any;
};

const RoomType = ({
  eventType,
  isDiscountAvailable,
  transferService,
  form,
}: TRoomType) => {
  // modal open close

  return (
    <div className='room__cat'>
      <InputSection form={form} eventType={eventType} />

      <DateSection eventType={eventType} form={form} />
      <SelectionSection
        isDiscountAvailable={isDiscountAvailable}
        transferService={transferService}
        eventType={eventType}
        form={form}
      />
      <NumberSection form={form} eventType={eventType} />
      {eventType === 'onlineEvent' && (
        <LinkSection form={form} eventType={eventType} />
      )}
    </div>
  );
};

export default RoomType;
