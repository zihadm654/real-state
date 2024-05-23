"use client";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div
      className="
      overflow-hidden 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        bg-white
      "
    >
      <div
        className="
      flex flex-row items-center gap-1 p-4"
      >
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        mode="range"
        // selected={field.value}
        // onSelect={field.onChange}
        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
        initialFocus
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} onClick={onSubmit}>
          Reserve
        </Button>
      </div>
      <hr />
      <div
        className="
          flex 
          flex-row 
          items-center 
          justify-between 
          p-4
          text-lg
          font-semibold
        "
      >
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
