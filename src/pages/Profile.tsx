
import { useEffect, useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";

export default function Profile() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    getProfile();
  }, [user]);

  // Handle scrolling to section when component mounts or hash changes
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      // Remove the # from the hash
      const sectionId = hash.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        // Add a small delay to ensure the DOM is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          // Add some padding to account for fixed header
          window.scrollBy(0, -80);
        }, 100);
      }
    }
  }, [location.hash]);

  const getProfile = async () => {
    try {
      setLoading(true);
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const { error } = await supabase
        .from("profiles")
        .upsert({ id: user.id, ...updates })
        .eq("id", user.id);

      if (error) throw error;
      
      // Refresh profile data
      await getProfile();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  if (loading && !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-6 animate-fade-in">
      <ProfileHeader user={user} profile={profile} />
      <div className="space-y-8">
        <section id="personal">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <ProfileForm 
            profile={profile} 
            loading={loading} 
            onUpdateProfile={updateProfile}
          />
        </section>

        <section id="health">
          <h2 className="text-2xl font-semibold mb-4">Health Data Connections</h2>
          <ProfileForm 
            profile={profile} 
            loading={loading} 
            onUpdateProfile={updateProfile}
          />
        </section>

        <section id="goals">
          <h2 className="text-2xl font-semibold mb-4">Health Goals</h2>
          <ProfileForm 
            profile={profile} 
            loading={loading} 
            onUpdateProfile={updateProfile}
          />
        </section>

        <section id="tracking">
          <h2 className="text-2xl font-semibold mb-4">Activity Tracking</h2>
          <ProfileForm 
            profile={profile} 
            loading={loading} 
            onUpdateProfile={updateProfile}
          />
        </section>
      </div>
    </div>
  );
}
