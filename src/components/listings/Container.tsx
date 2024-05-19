"use client";

import { motion } from "framer-motion";

import Heading from "@/components/Heading";

interface ContainerProps {
  children: React.ReactNode;
  delta: number;
  steps: any;
  currentStep: number;
}
const Container: React.FC<ContainerProps> = ({
  children,
  delta,
  steps,
  currentStep,
}) => {
  return (
    <motion.div
      initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="form__step"
    >
      {steps.map((step: any, index: any) => (
        <div key={step.label}>
          {currentStep === index && (
            <Heading title={step.name} subtitle={step.description} />
          )}
        </div>
      ))}
      {children}
    </motion.div>
  );
};

export default Container;
