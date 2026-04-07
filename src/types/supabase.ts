export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: 'user' | 'moderator' | 'admin';
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          role?: 'user' | 'moderator' | 'admin';
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: 'user' | 'moderator' | 'admin';
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      myths: {
        Row: {
          id: string;
          title: string;
          summary: string | null;
          content: string | null;
          status: 'verified' | 'debunked' | 'partial';
          category: 'Health' | 'Cultural' | 'Historical' | 'Social';
          sources: Json;
          views: number;
          likes: number;
          dislikes: number;
          published_at: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          summary?: string | null;
          content?: string | null;
          status?: 'verified' | 'debunked' | 'partial';
          category: 'Health' | 'Cultural' | 'Historical' | 'Social';
          sources?: Json;
          views?: number;
          likes?: number;
          dislikes?: number;
          published_at?: string | null;
          created_by?: string | null;
        };
        Update: {
          title?: string;
          summary?: string | null;
          content?: string | null;
          status?: 'verified' | 'debunked' | 'partial';
          category?: 'Health' | 'Cultural' | 'Historical' | 'Social';
          sources?: Json;
          views?: number;
          likes?: number;
          dislikes?: number;
          published_at?: string | null;
        };
      };
      stories: {
        Row: {
          id: string;
          title: string;
          author_name: string;
          author_id: string | null;
          content: string | null;
          full_content: string | null;
          category: 'Folklore' | 'Supernatural' | 'Urban Legends' | 'Historical' | 'Regional';
          status: 'published' | 'pending';
          likes: number;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          author_name: string;
          author_id?: string | null;
          content?: string | null;
          full_content?: string | null;
          category: 'Folklore' | 'Supernatural' | 'Urban Legends' | 'Historical' | 'Regional';
          status?: 'published' | 'pending';
          likes?: number;
          published_at?: string | null;
        };
        Update: {
          title?: string;
          author_name?: string;
          content?: string | null;
          full_content?: string | null;
          category?: 'Folklore' | 'Supernatural' | 'Urban Legends' | 'Historical' | 'Regional';
          status?: 'published' | 'pending';
          likes?: number;
          published_at?: string | null;
        };
      };
      comments: {
        Row: {
          id: string;
          user_id: string | null;
          user_name: string;
          content: string;
          myth_id: string | null;
          story_id: string | null;
          status: 'approved' | 'pending';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          user_name: string;
          content: string;
          myth_id?: string | null;
          story_id?: string | null;
          status?: 'approved' | 'pending';
        };
        Update: {
          user_name?: string;
          content?: string;
          status?: 'approved' | 'pending';
        };
      };
      myth_submissions: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: 'Health' | 'Cultural' | 'Historical' | 'Social';
          source_url: string | null;
          submitted_by: string | null;
          submitter_name: string;
          status: 'pending' | 'approved' | 'rejected';
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: 'Health' | 'Cultural' | 'Historical' | 'Social';
          source_url?: string | null;
          submitted_by?: string | null;
          submitter_name: string;
          status?: 'pending' | 'approved' | 'rejected';
          admin_notes?: string | null;
        };
        Update: {
          title?: string;
          description?: string;
          category?: 'Health' | 'Cultural' | 'Historical' | 'Social';
          source_url?: string | null;
          status?: 'pending' | 'approved' | 'rejected';
          admin_notes?: string | null;
        };
      };
      votes: {
        Row: {
          id: string;
          user_id: string;
          myth_id: string | null;
          story_id: string | null;
          vote_type: 'like' | 'dislike';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          myth_id?: string | null;
          story_id?: string | null;
          vote_type: 'like' | 'dislike';
        };
        Update: {
          vote_type?: 'like' | 'dislike';
        };
      };
    };
    Functions: {
      cast_myth_vote: {
        Args: { p_myth_id: string; p_user_id: string; p_vote_type: string };
        Returns: undefined;
      };
      cast_story_vote: {
        Args: { p_story_id: string; p_user_id: string };
        Returns: undefined;
      };
      increment_myth_views: {
        Args: { p_myth_id: string };
        Returns: undefined;
      };
    };
  };
};

// Convenience type aliases
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Myth = Database['public']['Tables']['myths']['Row'];
export type Story = Database['public']['Tables']['stories']['Row'];
export type Comment = Database['public']['Tables']['comments']['Row'];
export type Vote = Database['public']['Tables']['votes']['Row'];
export type MythInsert = Database['public']['Tables']['myths']['Insert'];
export type MythUpdate = Database['public']['Tables']['myths']['Update'];
export type StoryInsert = Database['public']['Tables']['stories']['Insert'];
export type StoryUpdate = Database['public']['Tables']['stories']['Update'];
export type CommentInsert = Database['public']['Tables']['comments']['Insert'];
export type MythSubmission = Database['public']['Tables']['myth_submissions']['Row'];
export type MythSubmissionInsert = Database['public']['Tables']['myth_submissions']['Insert'];
export type MythSubmissionUpdate = Database['public']['Tables']['myth_submissions']['Update'];
