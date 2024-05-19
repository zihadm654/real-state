import Radio from '@/components/Radio';
import SelectionBox from '@/components/SelectionBox';
import { NumberInput } from '@/components/inputs/multiInput';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup } from '@/components/ui/radio-group';
interface TSection {
  eventType: string;
  transferService: string;
  isDiscountAvailable: boolean;
  form: any;
}

let options = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'Hindi' },
];
let currencyOptions = [
  { value: 'dollar', label: 'USD' },
  { value: 'euro', label: 'EURO' },
];

const SelectionSection: React.FC<TSection> = ({
  eventType,
  transferService,
  isDiscountAvailable,
  form,
}) => {
  return (
    <>
      <div className='selection'>
        <SelectionBox
          title='Provide a local currency'
          placeholder='select a currency'
          name={`currency`}
          label='Currency'
          options={currencyOptions}
          form={form}
        />

        <SelectionBox
          placeholder='select a language '
          title='Provide a language'
          name={`${eventType}.language`}
          options={options}
          form={form}
          label='Language'
        />
      </div>
      <div className='radio__selection'>
        {eventType === 'onsiteEvent' && (
          <div className='content'>
            <div className='content__heading'>
              <h5>Transfer services</h5>
            </div>
            <FormField
              control={form.control}
              name={`${eventType}.transferService`}
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  {/* <FormLabel>Notify me about...</FormLabel> */}
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <Radio
                        form={form}
                        value='NOT_INCLUDED'
                        label='Not Included'
                      />
                      <Radio form={form} value='INCLUDED' label='Included' />
                      <Radio
                        form={form}
                        value='EXTRA_COST'
                        label='Extra Cost'
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {transferService === 'EXTRA_COST' && (
              <NumberInput
                name={`${eventType}.extraAmount`}
                placeholder='extra amount'
                label='Extra'
                form={form}
              />
            )}
          </div>
        )}
        <div className='content'>
          <div className='content__heading'>
            <h5>Discount Avaiable</h5>
          </div>
          <FormField
            control={form.control}
            name={`${eventType}.isDiscountAvailable`}
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className='ml-2 font-normal'>
                  {field.value ? 'Enable Discount' : 'Disable Discount'}
                </FormLabel>
              </FormItem>
            )}
          />

          {isDiscountAvailable === true && (
            <NumberInput
              form={form}
              placeholder='discount'
              name={`${eventType}.discount`}
              label='Discount'
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SelectionSection;
