'use client';
import Radio from '@/components/Radio';
// import { Time } from '@/components/time-picker/TimePicker';
import { DatePickerForm } from '@/components/inputs/Calender';
import { TimePicker } from '@/components/time-picker/TimePicker';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup } from '@/components/ui/radio-group';
import { useFieldArray } from 'react-hook-form';

interface TSection {
  eventType: string;
  form: any;
}

const DateSection: React.FC<TSection> = ({ eventType, form }) => {
  const { fields, append, remove } = useFieldArray({
    name: `${eventType}.dateRanges`,
    control: form.control,
  });
  return (
    <>
      <h5>Provide your start & end time</h5>
      <FormField
        control={form.control}
        name={`${eventType}.dateType`}
        render={({ field }) => (
          <FormItem className='space-y-3 py-2'>
            {/* <FormLabel>Notify me about...</FormLabel> */}
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className='flex flex-col space-y-1'
              >
                <Radio form={form} value='SINGLE' label='Single' />
                <Radio form={form} value='MULTIPLE' label='Multiple' />
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {fields?.map((field, index) => (
        <div key={field.id} className='date__wrapper'>
          <DatePickerForm
            label='Select your preferred date'
            form={form}
            name={`${eventType}.dateRanges.${index}.date`}
          />
          <TimePicker
            index={index}
            number={1}
            label='Start Time'
            form={form}
            name={`${eventType}.dateRanges.${index}.startTime`}
          />
          <TimePicker
            number={2}
            label='End Time'
            form={form}
            name={`${eventType}.dateRanges.${index}.endTime`}
          />
          {index > 0 && (
            <Button type='button' onClick={() => remove(index)}>
              remove
            </Button>
          )}
        </div>
      ))}
      <Button type='button' onClick={() => append({})}>
        Add new
      </Button>
    </>
  );
};

export default DateSection;
