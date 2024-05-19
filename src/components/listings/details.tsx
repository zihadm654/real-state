import InputSection from './layout/InputSection';
import SelectionSection from './layout/SelectionSection';
import DateSection from './layout/DateSection';
import NumberSection from './layout/NumberSection';
import Dropzone from '@/components/Dropezone';
import CountrySelect from '@/components/inputs/CountrySelect';
import SubCategory from './subCategory';
import Business from './business';

interface TDetails {
  eventType: string;
  selectPosition: any;
  setPosition: any;
  isDiscountAvailable: boolean;
  transferService: string;
  category: any;
  businessNature: string;
  offerType: string;
  form: any;
}
const Details = ({
  eventType,
  selectPosition,
  setPosition,
  isDiscountAvailable,
  transferService,
  category,
  businessNature,
  offerType,
  form,
}: TDetails) => {
  return (
    <div className='details'>
      {/* <Location onChange={onChange} location={location} /> */}
      <CountrySelect
        position={selectPosition}
        setPosition={setPosition}
        form={form}
      />
      <Business
        form={form}
        businessNature={businessNature}
        offerType={offerType}
      />
      <InputSection form={form} eventType={eventType} />
      <SelectionSection
        isDiscountAvailable={isDiscountAvailable}
        transferService={transferService}
        eventType={eventType}
        form={form}
      />
      <DateSection form={form} eventType={eventType} />

      <h4>Person and price information</h4>
      <SubCategory category={category} eventType={eventType} form={form} />
      <NumberSection eventType={eventType} form={form} />
      <div className='upload__img'>
        <h5>Please select relevent photos</h5>
        <Dropzone
          className='dropzone'
          name='photos'
          register={form.register}
          form={form}
        />
      </div>
    </div>
  );
};

export default Details;
