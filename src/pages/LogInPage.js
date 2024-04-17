import FormHeader from "../components/FormHeader";
import Login from "../components/LogIn";
function LoginPage({setIsLogIn}) {
  return (
    <div>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <FormHeader
            heading="Login to your account"
            paragraph="Don't have an account yet? "
            linkName="Signup"
            linkUrl="/signup"
          />
          <Login setIsLogIn={setIsLogIn}></Login>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
