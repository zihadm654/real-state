'use client';

import CategorySection from './layout/CategorySection';

type TSubCat = {
  eventType: any;
  category: any;
  form: any;
};
const SubCategory: React.FC<TSubCat> = ({ category, eventType, form }) => {
  return (
    <div className='sub__category'>
      <CategorySection form={form} eventType={eventType} category={category} />
    </div>
  );
};

export default SubCategory;
