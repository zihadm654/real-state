import Radio from '@/components/Radio';
import MultiInput from '@/components/inputs/multiInput';
import Input from '@/components/inputs/multiInput';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group';

type TBusiness = {
  form: any;
  businessNature: string;
  offerType: string;
};

const Business = ({ form, businessNature, offerType }: TBusiness) => {
  return (
    <div className='business'>
      <h5>Are you an Individual or an incorporated business</h5>
      <div className='individual'>
        <FormField
          control={form.control}
          name='businessNature'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              {/* <FormLabel>Notify me about...</FormLabel> */}
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'
                >
                  <Radio form={form} value='INDIVIDUAL' label='Individual' />
                  <Radio form={form} value='BUSINESS' label='Incorporated' />
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {businessNature === 'INDIVIDUAL' && (
          <div className='extra__inputs'>
            <MultiInput
              id='individualNbr'
              name='individualNbr'
              label='Identification'
              placeholder='My identification number id'
              form={form}
            />
            <MultiInput
              id='individualTaxIdNbr'
              name='individualTaxIdNbr'
              label='Tax Identification'
              placeholder='My individual Tax identification'
              form={form}
            />
          </div>
        )}
        {businessNature === 'BUSINESS' && (
          <div className='extra__inputs'>
            <MultiInput
              id='businessRegistrationNbr'
              name='businessRegistrationNbr'
              label='Business Identification'
              placeholder='Business identification number id'
              form={form}
            />
            <Input
              id='businessTaxIdNbr'
              name='businessTaxIdNbr'
              label='Tax Identification'
              placeholder='My individual Tax identification'
              form={form}
            />
          </div>
        )}
      </div>
      <h5>I am offering a</h5>
      <div className='offerings'>
        <div className='accomodation'>
          <FormField
            control={form.control}
            name='listingType'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                {/* <FormLabel>Notify me about...</FormLabel> */}
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-col space-y-1'
                  >
                    <Radio form={form} value='STAY' label='Stays' />
                    <Radio form={form} value='EVENT' label='Events' />
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {offerType === 'EVENT' && (
            <FormField
              control={form.control}
              name='eventType'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  {/* <FormLabel>Notify me about...</FormLabel> */}
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <Radio form={form} value='ONLINE' label='Online Event' />
                      <Radio form={form} value='ONSITE' label='Onsite Event' />
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Business;
