import { Suspense } from "react";

import { NewPasswordForm } from "@/components/auth/new-password";

const NewPasswordPage = () => {
  return (
    <Suspense>
      <NewPasswordForm />;
    </Suspense>
  );
};

export default NewPasswordPage;
