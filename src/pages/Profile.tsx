import { useEffect, useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";

export default function Profile() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    getProfile();
  }, [user]);

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
      <ProfileForm 
        profile={profile} 
        loading={loading} 
        onUpdateProfile={updateProfile}
      />
    </div>
  );
}