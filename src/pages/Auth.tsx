
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { AuthChangeEvent } from "@supabase/supabase-js";

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session) => {
      if (event === "SIGNED_IN" && session) {
        toast({
          title: "Welcome back!",
          description: "Successfully signed in",
        });
        navigate("/");
      }
      if (event === "SIGNED_OUT") {
        toast({
          title: "Signed out",
          description: "You have been signed out successfully",
        });
      }
      if (event === "PASSWORD_RECOVERY") {
        toast({
          title: "Password recovery",
          description: "Check your email for password recovery instructions",
        });
      }
    });

    // Handle initial session check
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        let errorMessage = "An error occurred during authentication";
      
        // Map common error messages to user-friendly messages
        if (error.message.includes("Email not confirmed")) {
          errorMessage = "Please check your email to confirm your account";
        } else if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Invalid email or password";
        } else if (error.message.includes("Email already registered")) {
          errorMessage = "This email is already registered";
        } else if (error.message.includes("Password")) {
          errorMessage = "Password must be at least 6 characters long";
        }

        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
      if (session) {
        navigate("/");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Nourish Navigator
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in or create an account to get started
          </p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="light"
            providers={[]}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Email address",
                  password_label: "Password",
                  button_label: "Sign in",
                  loading_button_label: "Signing in...",
                },
                sign_up: {
                  email_label: "Email address",
                  password_label: "Create a password",
                  button_label: "Create account",
                  loading_button_label: "Creating account...",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

