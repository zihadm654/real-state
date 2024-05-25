"use client";

import { useEffect, useState } from "react";
import { createListing } from "@/actions/addListing";
import { SafeListing, StepListItem } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { ListingSchema, TListing } from "@/lib/validations/schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Container from "@/components/listings/Container";
import Dropzone from "@/components/listings/dropzone";

import { categories } from "../navbar/categories";
import CategoryInput from "./CategoryInput";
import Details from "./details";
import Location from "./location";
// import { uploadFile } from '@/actions/upload';
import CreateWelcome from "./welcome";

export default function MultiForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const [selectPosition, setSelectPosition] = useState("");

  const form = useForm<SafeListing>({
    mode: "onBlur",
    resolver: zodResolver(ListingSchema),
  });
  //submit function
  const processForm: SubmitHandler<SafeListing> = async (data) => {
    const result = await createListing(data);

    if (!result) {
      toast.error("Something went wrong");
      console.log("Something went wrong");
      return;
    }

    // if (result?.error) {
    //   // set local error state
    //   console.log(result?.error);
    //   return;
    // }

    form.reset();
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
  const category = form.watch("category");
  const watch = form.watch;
  // watch all the field
  useEffect(() => {
    const subscription = form.watch((value: any) => {
      console.log(value);
    });
    return () => subscription.unsubscribe();
  }, [form, watch]);

  // const setCustomValue = (id: string, value: any) => {
  //   form.setValue(id, value, {
  //     shouldDirty: true,
  //     shouldTouch: true,
  //     shouldValidate: true,
  //   });
  // };
  // steps of multi form
  const steps: StepListItem[] = [
    {
      label: "Welcome",
      id: "1",
      name: "Welcome to DMT",
      description: `We at Digital Marketplace for Tourism, welcome all the individuals and businesses on our booking service platform. Here, you can list Accommodation and Events offering based in Africa and Asia. Focused on tourism niche and regional specific services, the sellers will be able to take great advantage among buyers around the world. We wish everyone who is connected with us, for the prosperity of this community and help boost business operations around the region. May we all prosper`,
    },
    {
      label: "Category",
      id: "2",
      name: "Select the category",
      description:
        "Share some details about your business and the type of listing you want to host.",
      fields: ["category"],
    },
    {
      label: "Location",
      id: "3",
      name: "Specify your event location",
      description:
        "Let's get started by specifying the location where you want to host your event.",
      fields: ["location"],
    },
    {
      label: "Details",
      id: "4",
      name: "Give your details info",
      description:
        "Let's get started by specifying the details where you want to host your event.",
      fields: [
        "title",
        "description",
        "price",
        "guests",
        "bedrooms",
        "bathrooms",
        "rooms",
      ],
    },
    {
      label: "Photos",
      id: "5",
      name: "Photos for the beautiful listing",
      description:
        "We recommend having at least five of these top amenities. You’ll be able to add other amenities after you publish your listing.",
      fields: ["image"],
    },
    {
      label: "complete",
      id: "6",
      name: "Complete",
      description:
        "We recommend having at least five of these top amenities. You’ll be able to add other amenities after you publish your listing.",
    },
  ];
  return (
    <section className="flex flex-col items-center justify-between p-10">
      {/* steps */}
      <nav aria-label="progress">
        <ol role="list" className="flex items-center justify-between gap-4">
          {steps.map((step, index) => (
            <li key={step.label}>
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium"> {step.label}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium"> {step.label}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}{" "}
                  </span>
                  <span className="text-sm font-medium"> {step.label}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <Form {...form}>
        <form className="mt-4 py-4" onSubmit={form.handleSubmit(processForm)}>
          {currentStep === 0 && (
            <Container steps={steps} delta={delta} currentStep={currentStep}>
              <CreateWelcome />
            </Container>
          )}

          {currentStep === 1 && (
            <Container steps={steps} delta={delta} currentStep={currentStep}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {categories?.map((item) => (
                  <div key={item.label} className="col-span-1">
                    <CategoryInput
                      onClick={() =>
                        form.setValue("category", item.label, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        })
                      }
                      selected={category === item.label}
                      label={item.label}
                      icon={item.icon}
                    />
                  </div>
                ))}
              </div>
            </Container>
          )}
          {currentStep === 2 && (
            <Container steps={steps} delta={delta} currentStep={currentStep}>
              <Location
                form={form}
                selectPosition={selectPosition}
                setPosition={setSelectPosition}
              />
            </Container>
          )}
          {currentStep === 3 && (
            <Container steps={steps} delta={delta} currentStep={currentStep}>
              <Details form={form} />
            </Container>
          )}
          {currentStep === 4 && (
            <Container steps={steps} delta={delta} currentStep={currentStep}>
              <div className="upload__img">
                <Dropzone form={form} />
              </div>
            </Container>
          )}
          {currentStep === 5 && (
            <Container steps={steps} delta={delta} currentStep={currentStep}>
              <h3>Thanks for creating a listing</h3>
            </Container>
          )}
        </form>
      </Form>
      {/* Navigation */}
      <div className="flex w-full items-center justify-between px-4">
        <Button type="button" onClick={prev} disabled={currentStep === 0}>
          Back
        </Button>
        <Button
          type="button"
          onClick={next}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
