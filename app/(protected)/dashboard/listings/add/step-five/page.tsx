import { getCurrentUser } from "@/lib/session";

import Step5 from "./StepClient";

const page = async () => {
  const user = await getCurrentUser();
  return (
    <>
      <Step5 user={user} />
    </>
  );
};

export default page;
