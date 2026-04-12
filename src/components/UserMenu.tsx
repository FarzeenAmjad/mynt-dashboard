import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, Shield, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef, useEffect, useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import {
  adventurer, avataaars, bigEars, bigSmile, bottts, croodles,
  dylan, funEmoji, lorelei, micah, miniavs, notionists,
  openPeeps, personas, pixelArt, thumbs,
} from "@dicebear/collection";

const STYLE_MAP: Record<string, any> = {
  adventurer, avataaars, bigEars, bigSmile, bottts, croodles,
  dylan, funEmoji, lorelei, micah, miniavs, notionists,
  openPeeps, personas, pixelArt, thumbs,
};

export const UserMenu = () => {
  const { user, profile, isLoading, signOut, isAdmin } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const avatarUri = useMemo(() => {
    const styleName = profile?.avatar_url || "adventurer";
    const styleObj = STYLE_MAP[styleName];
    if (!styleObj || !user) return null;
    return createAvatar(styleObj, { seed: user.email || user.id, size: 64 }).toDataUri();
  }, [profile?.avatar_url, user]);

  if (isLoading) {
    return <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />;
  }

  if (!user) {
    return (
      <Link to="/auth">
        <Button variant="outline" size="sm">
          {t("auth.signIn")}
        </Button>
      </Link>
    );
  }

  const initials = (profile?.name || user.email || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
          {avatarUri ? (
            <img src={avatarUri} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs font-semibold text-primary">{initials}</span>
          )}
        </div>
        <span className="hidden md:block text-sm font-medium text-foreground max-w-[120px] truncate">
          {profile?.name || user.email}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-card rounded-xl shadow-card border border-border py-1 z-50 animate-fade-in">
          <div className="px-4 py-3 border-b border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center flex-shrink-0">
              {avatarUri ? (
                <img src={avatarUri} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-semibold text-primary">{initials}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{profile?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              {profile?.role && profile.role !== "user" && (
                <span className="inline-block mt-0.5 px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full bg-primary/10 text-primary">
                  {profile.role}
                </span>
              )}
            </div>
          </div>

          {isAdmin && (
            <Link
              to="/admin/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <Shield className="w-4 h-4" />
              Admin Dashboard
            </Link>
          )}

          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
          >
            <User className="w-4 h-4" />
            {t("common.profile")}
          </Link>

          <button
            onClick={async () => {
              setIsOpen(false);
              await signOut();
              toast({ title: t("common.signedOut"), description: t("common.signedOutDesc") });
              navigate("/");
            }}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-muted transition-colors w-full text-left"
          >
            <LogOut className="w-4 h-4" />
            {t("common.signOut")}
          </button>
        </div>
      )}
    </div>
  );
};
