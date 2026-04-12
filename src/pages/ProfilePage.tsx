import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Check, Save, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { updateProfile } from "@/services/profiles";
import { createAvatar } from "@dicebear/core";
import { adventurer, avataaars, bottts, lorelei, notionists, thumbs } from "@dicebear/collection";

const AVATAR_STYLES = [
  { name: "adventurer", label: "Explorer", style: adventurer },
  { name: "avataaars", label: "Cartoon", style: avataaars },
  { name: "bottts", label: "Robot", style: bottts },
  { name: "lorelei", label: "Elegant", style: lorelei },
  { name: "notionists", label: "Minimal", style: notionists },
  { name: "thumbs", label: "Playful", style: thumbs },
] as const;

function generateAvatar(styleName: string, seed: string): string {
  const styleObj = AVATAR_STYLES.find((s) => s.name === styleName);
  if (!styleObj) return "";
  return createAvatar(styleObj.style, { seed, size: 128 }).toDataUri();
}

const ProfilePage = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState(profile?.name || "");
  const [selectedAvatar, setSelectedAvatar] = useState(profile?.avatar_url || "adventurer");
  const [isSaving, setIsSaving] = useState(false);

  const seed = user?.email || user?.id || "default";

  const avatarPreviews = useMemo(() => {
    return AVATAR_STYLES.map((s) => ({
      ...s,
      dataUri: createAvatar(s.style, { seed, size: 128 }).toDataUri(),
    }));
  }, [seed]);

  const hasChanges = name !== (profile?.name || "") || selectedAvatar !== (profile?.avatar_url || "adventurer");

  const handleSave = async () => {
    if (!user || !name.trim()) return;
    setIsSaving(true);
    try {
      await updateProfile(user.id, {
        name: name.trim(),
        avatar_url: selectedAvatar,
      });
      await refreshProfile();
      toast({ title: "Profile updated", description: "Your changes have been saved." });
    } catch {
      toast({ title: "Error", description: "Failed to update profile. Please try again.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const currentAvatarUri = generateAvatar(selectedAvatar, seed);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 lg:pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Back */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Profile Card */}
          <div className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden animate-fade-in">
            {/* Accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />

            {/* Current Avatar + Name Header */}
            <div className="flex flex-col items-center pt-8 pb-6 border-b border-border/50">
              <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-secondary/20 shadow-lg mb-4">
                {currentAvatarUri ? (
                  <img src={currentAvatarUri} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {(profile?.name || "U").charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <h1 className="font-display text-xl font-bold text-foreground">{profile?.name}</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              {profile?.role && profile.role !== "user" && (
                <span className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold uppercase rounded-full bg-primary/10 text-primary">
                  <Shield className="w-3 h-3" />
                  {profile.role}
                </span>
              )}
            </div>

            <div className="p-6 lg:p-8 space-y-8">
              {/* Avatar Selection */}
              <div>
                <h2 className="text-sm font-semibold text-foreground mb-1">Choose your avatar</h2>
                <p className="text-xs text-muted-foreground mb-4">Select a style — your unique avatar is generated from your email.</p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {avatarPreviews.map((av) => (
                    <button
                      key={av.name}
                      onClick={() => setSelectedAvatar(av.name)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 group ${
                        selectedAvatar === av.name
                          ? "border-secondary bg-secondary/5 shadow-sm"
                          : "border-transparent hover:border-border hover:bg-muted/50"
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-xl overflow-hidden transition-transform ${
                        selectedAvatar === av.name ? "scale-105" : "group-hover:scale-105"
                      }`}>
                        <img src={av.dataUri} alt={av.label} className="w-full h-full object-cover" />
                      </div>
                      <span className={`text-[11px] font-medium ${
                        selectedAvatar === av.name ? "text-secondary" : "text-muted-foreground"
                      }`}>
                        {av.label}
                      </span>
                      {selectedAvatar === av.name && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                          <Check className="w-3 h-3 text-secondary-foreground" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Profile Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your display name"
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/30 border border-border/50">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{user?.email}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Email cannot be changed.</p>
                </div>
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSave}
                disabled={!hasChanges || isSaving || !name.trim()}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                size="lg"
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
