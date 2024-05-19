// import getListing from '@/actions/getListings';
import Input from '@/components/inputs/multiInput';

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  // listing data for individual
  // const data = await getListing(id);
  // const item = data?.OnsiteEvent || data?.OnlineEvent;
  // const eventType =
  //   data?.eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent';
  return (
    <div className='listing__details'>
      <h4>Listing Basics</h4>
      <div className='listing__details__info'>
        <div className='content'>
          <div className='content__heading'>
            <h5>Listing Title</h5>
          </div>
          {/* <h5>{item?.name}</h5> */}
        </div>
        <div className='content'>
          <div className='content__heading'>
            <h5>Listing Description</h5>
          </div>
          {/* <p>{item?.highlight}</p> */}
        </div>
        <div className='content'>
          <div className='content__heading'>
            <h5>Listing Location</h5>
          </div>
          {/* <p>{data?.location}</p> */}
        </div>
        <div className='content'>
          <div className='content__heading'>
            <h5>Listing Currency</h5>
          </div>
          {/* <p>{data?.currency}</p> */}
        </div>
        <div className='content'>
          <div className='content__heading'>
            <h5>Listing Price</h5>
          </div>
          {/* <p>{data?.price}</p> */}
        </div>
        <div className='content'>
          <div className='content__heading'>
            <h5>Listing Category</h5>
          </div>
          {/* <p>{item?.category}</p> */}
        </div>
        <div className='content'>
          <div className='content__heading'>
            <h5>Listing Image url</h5>
          </div>
          {/* <p>{item?.imageUrl}</p> */}
        </div>
        <div className='content'>
          <div className='content__heading'>
            <h5>Listing Maxium attendance</h5>
          </div>
          {/* <p>{item?.maxAttendances}</p> */}
        </div>
        <div className='content'>
          <div className='content__heading'>
            <h5>Listing Language</h5>
          </div>
          {/* <p>{item?.language}</p> */}
        </div>
        <div className='content'>
          <div className='content__heading'>
            <h5>Listing Number of days</h5>
          </div>
          {/* <p>{item?.nbrOfDays}</p> */}
        </div>
        <div className='content'>
          <div className='content__heading'>
            <h5>Listing Hours per days</h5>
          </div>
          {/* <p>{item?.hoursPerDays}</p> */}
        </div>
        <div className='content'>
          <div className='content__heading'>
            <h5>Listing Discount Availability</h5>
          </div>
          {/* <p>{item?.isDiscountAvailable === 'true' ? 'Yes' : 'No'}</p> */}
        </div>
        <div className='content'>
          <div className='content__heading'>
            <h5>Listing Discount amount</h5>
          </div>
          {/* <p>{item?.discount}</p> */}
        </div>
      </div>
    </div>
  );
};

export default page;
