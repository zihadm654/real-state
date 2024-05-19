import { NumberInput } from '@/components/inputs/multiInput';

interface TInputSection {
  eventType: string;
  form: any;
}

const NumberSection: React.FC<TInputSection> = ({ form, eventType }) => {
  return (
    <>
      <h4>Guest Info</h4>
      <div className='content__info'>
        <NumberInput
          placeholder='max number of occupance'
          name={`${eventType}.maxAttendances`}
          label='Max occupance'
          form={form}
        />
        <NumberInput
          placeholder='price'
          name={`${eventType}.price`}
          label='Price'
          form={form}
        />
        <NumberInput
          placeholder='hours per day'
          name={`${eventType}.hoursPerDay`}
          label='Hours per day'
          form={form}
        />
        <NumberInput
          placeholder='number of days'
          name={`${eventType}.nbrOfDays`}
          label='Numbers of days'
          form={form}
        />
      </div>
    </>
  );
};

export default NumberSection;
