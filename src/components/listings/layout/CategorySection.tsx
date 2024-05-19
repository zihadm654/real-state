// import Checkbox from '@/components/Checkbox';
import MultiCheckbox from '@/components/Checkbox';
import Radio from '@/components/Radio';
import MultiInput from '@/components/inputs/multiInput';
import Input from '@/components/inputs/multiInput';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup } from '@/components/ui/radio-group';
import { FcIdea } from 'react-icons/fc';
interface TInputSection {
  eventType: string;
  category: string;
  form: any;
}
const businesses = [
  {
    id: 'seminars/workshops',
    label: 'Seminars/Workshops',
  },
  {
    id: 'planing/consultation',
    label: 'Planing/Consultation',
  },
] as const;
const experientials = [
  {
    id: 'food & beverage',
    label: 'Food & Beverage',
  },
  {
    id: 'history & heritage',
    label: 'History & Heritage',
  },
  {
    id: 'guided tours',
    label: 'Guided Tours',
  },
] as const;

const CategorySection: React.FC<TInputSection> = ({
  eventType,
  category,
  form,
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name={`${eventType}.category`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                className='category'
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <div className='content'>
                  <div className='content__heading'>
                    <Radio form={form} value='business' label='Business' />
                  </div>
                  <MultiCheckbox
                    form={form}
                    items={businesses}
                    name={`${eventType}.business`}
                    label='Business'
                  />
                </div>
                <div className='content'>
                  <div className='content__heading'>
                    <Radio
                      form={form}
                      value='experiential'
                      label='Experiential'
                    />
                  </div>
                  <MultiCheckbox
                    form={form}
                    items={experientials}
                    name={`${eventType}.experiential`}
                    label='Experiential'
                  />
                </div>
                <div className='content'>
                  <div className='content__heading'>
                    <Radio
                      form={form}
                      value='healthAndWellness'
                      label='Health and Wellness'
                    />
                  </div>
                  {category === 'healthAndWellness' && (
                    <MultiInput
                      form={form}
                      label='Provide name of health & wellness'
                      placeholder='listing headline'
                      name={`${eventType}.healthAndWellness`}
                      id={`${eventType}.healthAndWellness`}
                    />
                  )}
                  <Radio
                    form={form}
                    value='specialInterest'
                    label='Special Interest'
                  />
                  {category === 'specialInterest' && (
                    <MultiInput
                      id={`${eventType}.specialInterest`}
                      name={`${eventType}.specialInterest`}
                      label='Provide name of special interest'
                      placeholder='listing headline'
                      form={form}
                    />
                  )}
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <p className='notabene'>
        <FcIdea />
        {(eventType === 'ONSITE' &&
          'Please select the sub category for your Online Event (atleast one)') ||
          'Please select the sub category for your Online Event (atleast one)'}
      </p>
      <div className='content'>
        <div className='content__heading'>
          <h5>Host Skill level</h5>
        </div>
        <FormField
          control={form.control}
          name={`${eventType}.hostSkillLevel`}
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
                    value='BEGINNER'
                    label='Beginner - First time hosting'
                  />
                  <Radio
                    form={form}
                    value='INTERMEDIATE'
                    label='Intermediate - Informally hosted before'
                  />
                  <Radio
                    form={form}
                    value='EXPERT'
                    label='Expert - Formally hosted before'
                  />
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <p className='notabene'>
        <FcIdea />
        {(eventType === 'ONSITE' &&
          'Please select the host skill level for Online Event (atleast one)') ||
          'Please select the host skill level for your Online Event.'}
      </p>
    </>
  );
};

export default CategorySection;
