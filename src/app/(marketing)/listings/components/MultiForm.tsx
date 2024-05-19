'use client';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TListing, ListingSchema } from '@/utils/schema';
import { StepListItem } from '@/types';
import CreateWelcome from './welcome';
import Location from './location';
import Business from './business';
import Details from './details';
import RoomType from './roomType';
import Container from '@/components/listings/Container';
import Dropzone from '@/components/Dropezone';
import { uploadFile } from '@/actions/upload';
import SubCategory from './subCategory';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function MultiForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const [selectPosition, setSelectPosition] = useState();
  const form = useForm<TListing>({
    mode: 'onBlur',
    resolver: zodResolver(ListingSchema),
  });
  // watch the specific property
  const businessNature = form.watch('businessNature');
  const listingType = form.watch('listingType');
  const eventType = form.watch('eventType');

  const discountAvailableField =
    eventType === 'ONSITE'
      ? 'onsiteEvent.isDiscountAvailable'
      : 'onlineEvent.isDiscountAvailable';
  const isDiscountAvailable = form.watch(discountAvailableField);

  const categoryField =
    eventType === 'ONSITE' ? 'onsiteEvent.category' : 'onlineEvent.category';
  const category = form.watch(categoryField);
  const transferService = form.watch(`onsiteEvent.transferService`);
  //submit function
  const processForm: SubmitHandler<TListing> = async (data) => {
    console.log(data);
    try {
      const res = await uploadFile(data.photos);
      // toast('photos upload success');
      console.log(res);
    } catch (error) {
      // toast('photos upload failed');
    }
    const userInputs = ListingSchema.parse(data);
    console.log(userInputs);
    // reset();
    setCurrentStep(0);
  };

  type FieldName = keyof TListing;

  const next = async () => {
    const fields = steps[currentStep].fields;
    if (currentStep === 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
      return;
    }
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };
  const watch = form.watch;
  // watch all the field
  useEffect(() => {
    const subscription = form.watch((value: any) => {
      console.log(value);
    });
    return () => subscription.unsubscribe();
  }, [form, watch]);

  // steps of multi form
  const steps: StepListItem[] = [
    {
      label: 'Welcome',
      id: '1',
      name: 'Welcome to DMT',
      description: `We at Digital Marketplace for Tourism, welcome all the individuals and businesses on our booking service platform. Here, you can list Accommodation and Events offering based in Africa and Asia. Focused on tourism niche and regional specific services, the sellers will be able to take great advantage among buyers around the world. We wish everyone who is connected with us, for the prosperity of this community and help boost business operations around the region. May we all prosper`,
    },
    {
      label: 'Location',
      id: '2',
      name: 'Specify your event location',
      description:
        "Let's get started by specifying the location where you want to host your event.",
      fields: ['location'],
    },
    {
      label: 'Business',
      id: '3',
      name: 'Tell us about your business',
      description:
        'Share some details about your business and the type of listing you want to host.',
      fields: [
        'businessNature',
        'individualNbr',
        'individualTaxIdNbr',
        'businessRegistrationNbr',
        'businessTaxIdNbr',
        'eventType',
        'listingType',
      ],
    },
    {
      label: 'Category',
      id: '4',
      name: 'Select sub category and skill level',
      description:
        'Include details about your listing to help guests find the right fit.',
      fields: [
        `${eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'}.category`,
        `${eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'}.business`,
        `${
          eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'
        }.experiential`,
        `${
          eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'
        }.specialInterest`,
        `${
          eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'
        }.healthAndWellness`,
        `${
          eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'
        }.hostSkillLevel`,
      ],
    },
    {
      label: 'Events',
      id: '5',
      name: 'Provide neccessary information about event',
      description: 'Let the guests know about your listing information.',
      fields: [
        'currency',
        'price',
        `${eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'}.name`,
        `${eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'}.highlight`,
        `${eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'}.language`,
        `${eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'}.price`,
        `${eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'}.nbrOfDays`,
        `${
          eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'
        }.isDiscountAvailable`,
        `${
          eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'
        }.maxAttendances`,
        `${eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'}.hoursPerDay`,
        `${eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'}.discount`,
      ],
    },
    {
      label: 'Photos',
      id: '6',
      name: 'Photos for the beautiful listing',
      description:
        'We recommend having at least five of these top amenities. You’ll be able to add other amenities after you publish your listing.',
      fields: ['photos'],
    },
    {
      label: 'Preview',
      id: '7',
      name: 'Preview all your selections',
      description: 'preview all the selections and validate',
      fields: [
        'location',
        'businessNature',
        'eventType',
        'listingType',
        'currency',
        'price',
        `${eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'}.name`,
        `${eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'}.highlight`,
        `${eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'}.category`,
        `${eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'}.language`,
        `${eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'}.price`,
        `${eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'}.business`,
        `${
          eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'
        }.experiential`,
        `${eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'}.nbrOfDays`,
        `${
          eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'
        }.isDiscountAvailable`,
        `${
          eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'
        }.hostSkillLevel`,
        `${
          eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'
        }.maxAttendances`,
        `${
          eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'
        }.specialInterest`,
        `${
          eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'
        }.healthAndWellness`,
        `${eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'}.hoursPerDay`,
        `${eventType === 'ONSITE' ? 'onsiteEvent' : 'onlineEvent'}.discount`,
        'photos',
      ],
    },
    {
      label: 'complete',
      id: '8',
      name: 'Complete',
      description:
        'We recommend having at least five of these top amenities. You’ll be able to add other amenities after you publish your listing.',
    },
  ];
  return (
    <section className='multi__form'>
      {/* steps */}
      <nav className='progress' aria-label='progress'>
        <ol role='list'>
          {steps.map((step, index) => (
            <li key={step.label}>
              {currentStep > index ? (
                <div className='group'>
                  <span>{step.id}</span>
                  <span> {step.label}</span>
                </div>
              ) : currentStep === index ? (
                <div aria-current='step'>
                  <span>{step.id}</span>
                  <span> {step.label}</span>
                </div>
              ) : (
                <div className='group border-gray-200'>
                  <span>{step.id} </span>
                  <span> {step.label}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <Form {...form}>
        <form className='form__input' onSubmit={form.handleSubmit(processForm)}>
          {currentStep === 0 && (
            <Container steps={steps} delta={delta} currentStep={currentStep}>
              <CreateWelcome />
            </Container>
          )}

          {currentStep === 1 && (
            <Container steps={steps} delta={delta} currentStep={currentStep}>
              <Location
                form={form}
                selectPosition={selectPosition}
                setPosition={setSelectPosition}
              />
            </Container>
          )}
          {currentStep === 2 && (
            <Container steps={steps} delta={delta} currentStep={currentStep}>
              <Business
                offerType={listingType}
                businessNature={businessNature}
                form={form}
              />
            </Container>
          )}
          {currentStep === 3 && (
            <Container steps={steps} delta={delta} currentStep={currentStep}>
              <SubCategory
                category={category}
                eventType={
                  eventType === 'ONLINE' ? 'onlineEvent' : 'onsiteEvent'
                }
                form={form}
              />
            </Container>
          )}
          {currentStep === 4 && (
            <Container steps={steps} delta={delta} currentStep={currentStep}>
              <RoomType
                eventType={
                  eventType === 'ONLINE' ? 'onlineEvent' : 'onsiteEvent'
                }
                isDiscountAvailable={isDiscountAvailable}
                transferService={transferService}
                form={form}
              />
            </Container>
          )}
          {currentStep === 5 && (
            <Container steps={steps} delta={delta} currentStep={currentStep}>
              <div className='upload__img'>
                <Dropzone
                  register={form.register}
                  className='dropzone'
                  name='photos'
                  form={form}
                />
              </div>
            </Container>
          )}

          {currentStep === 6 && (
            <Container steps={steps} delta={delta} currentStep={currentStep}>
              <Details
                category={category}
                isDiscountAvailable={isDiscountAvailable}
                eventType={
                  eventType === 'ONLINE' ? 'onlineEvent' : 'onsiteEvent'
                }
                offerType={listingType}
                businessNature={businessNature}
                transferService={transferService}
                selectPosition={selectPosition}
                setPosition={setSelectPosition}
                form={form}
              />
            </Container>
          )}
          {currentStep === 7 && (
            <Container steps={steps} delta={delta} currentStep={currentStep}>
              <h3>Thanks for creating a listing</h3>
            </Container>
          )}
        </form>
      </Form>
      {/* Navigation */}
      <div className='pt-2 form__btns'>
        <Button type='button' onClick={prev} disabled={currentStep === 0}>
          Back
        </Button>
        <Button
          type='button'
          onClick={next}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
