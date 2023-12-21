export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Application {
  opportunity_id: string;
  opportunity: string;
  company_id: string;
  company_name: string;
  user_id: string;
  user_name: string;
  resume: string;
}

export interface Referral {
  referral_code: string;
  referrer_code?: string;
  user_id: string;
}
export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          content: string;
          created_at: string;
          id: number;
          user_id: string | null;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: number;
          user_id?: string | null;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: number;
          user_id?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
export type Record<K extends keyof any, T> = {
  [P in K]: T;
};

export interface Bucket {
  id: string;
  name: string;
  owner: string;
  file_size_limit?: number;
  allowed_mime_types?: string[];
  created_at: string;
  updated_at: string;
  public: boolean;
}

export interface FileObject {
  name: string;
  bucket_id?: string;
  owner?: string;
  id?: string;
  updated_at?: string;
  created_at?: string;
  last_accessed_at?: string;
  metadata?: Record<string, any>;
  buckets?: Bucket;
}
