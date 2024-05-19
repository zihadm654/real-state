import MultiInput from '@/components/inputs/multiInput';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
interface TInputSection {
  eventType: string;
  form: any;
}
const InputSection: React.FC<TInputSection> = ({ eventType, form }) => {
  return (
    <div className='room__info'>
      <div className='input__info'>
        <h5>Listing title</h5>
        <MultiInput
          label='Your listing title should highlight what makes your place special'
          placeholder='listing headline'
          name={`${eventType}.name`}
          id={`${eventType}.name`}
          form={form}
        />
      </div>
      <div className='input__info'>
        <h5>Listing Description</h5>
        <FormField
          control={form.control}
          name={`${eventType}.highlight`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Give guests a sense of what its like to stay at your place,
                including why theyll love staying there.
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell us a little bit about Listing Highlight'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default InputSection;
