import MultiInput from '@/components/inputs/multiInput';
import Input from '@/components/inputs/multiInput';
import SelectionBox from '@/components/SelectionBox';
interface TLinkSection {
  eventType: string;
  form: any;
}
let platforms = [
  { value: 'zoom', label: 'ZOOM' },
  { value: 'meet', label: 'GOOGLE MEET' },
];
const LinkSection = ({ eventType, form }: TLinkSection) => {
  return (
    <>
      <h4>Provide your conference link for colaboration</h4>
      <div className='platform'>
        <div className='input__info'>
          <h5>Provide a link</h5>
          <MultiInput
            label='Provide Link'
            placeholder='listing '
            name={`onlineEvent.link`}
            id={`onlineEvent.link`}
            form={form}
          />
        </div>
        <SelectionBox
          title='Provide a preferred platform'
          name={`${eventType}.platform`}
          options={platforms}
          placeholder='select platform'
          form={form}
          label='conference'
        />
      </div>
    </>
  );
};

export default LinkSection;
