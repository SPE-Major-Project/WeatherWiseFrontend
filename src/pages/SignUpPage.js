import FormHeader from "../components/FormHeader";
import Signup from "../components/SignUp";

function SignupPage() {
  return (
    <div>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <FormHeader
            heading="Signup to create an account"
            paragraph="Already have an account? "
            linkName="Login"
            linkUrl="/login"
          />
          <Signup />
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
