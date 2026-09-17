export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      analytics: {
        Row: {
          browser: string | null
          content_id: string | null
          country: string | null
          date_time: string
          device_type: string | null
          duration_seconds: number | null
          event_type: string
          id: string
          referral: string | null
        }
        Insert: {
          browser?: string | null
          content_id?: string | null
          country?: string | null
          date_time?: string
          device_type?: string | null
          duration_seconds?: number | null
          event_type: string
          id?: string
          referral?: string | null
        }
        Update: {
          browser?: string | null
          content_id?: string | null
          country?: string | null
          date_time?: string
          device_type?: string | null
          duration_seconds?: number | null
          event_type?: string
          id?: string
          referral?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_accounts: {
        Row: {
          account_holder: string
          account_number: string
          bank_name: string
          created_at: string
          id: string
          is_active: boolean
          updated_at: string
        }
        Insert: {
          account_holder?: string
          account_number?: string
          bank_name?: string
          created_at?: string
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          account_holder?: string
          account_number?: string
          bank_name?: string
          created_at?: string
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      collection_items: {
        Row: {
          collection_id: string
          content_id: string
          created_at: string
          id: string
          sort_order: number
        }
        Insert: {
          collection_id: string
          content_id: string
          created_at?: string
          id?: string
          sort_order?: number
        }
        Update: {
          collection_id?: string
          content_id?: string
          created_at?: string
          id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "collection_items_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_items_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          cover_image: string | null
          created_at: string
          date_range: string | null
          description: string | null
          enabled: boolean
          id: string
          sheikh_id: string | null
          sort_order: number
          title: string
          topic_id: string | null
          updated_at: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          date_range?: string | null
          description?: string | null
          enabled?: boolean
          id?: string
          sheikh_id?: string | null
          sort_order?: number
          title: string
          topic_id?: string | null
          updated_at?: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          date_range?: string | null
          description?: string | null
          enabled?: boolean
          id?: string
          sheikh_id?: string | null
          sort_order?: number
          title?: string
          topic_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "collections_sheikh_id_fkey"
            columns: ["sheikh_id"]
            isOneToOne: false
            referencedRelation: "sheikhs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collections_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      content: {
        Row: {
          added_at: string
          created_at: string
          date: string | null
          description: string | null
          duration: number | null
          event: string | null
          external_url: string | null
          file_path: string | null
          id: string
          language: string
          location: string | null
          metadata: Json | null
          page_count: number | null
          publisher: string | null
          sheikh_id: string | null
          soft_deleted_at: string | null
          source_platform: string | null
          source_url: string | null
          state: string
          tags: string[] | null
          title: string
          topics: string[] | null
          type: string
          updated_at: string
        }
        Insert: {
          added_at?: string
          created_at?: string
          date?: string | null
          description?: string | null
          duration?: number | null
          event?: string | null
          external_url?: string | null
          file_path?: string | null
          id?: string
          language?: string
          location?: string | null
          metadata?: Json | null
          page_count?: number | null
          publisher?: string | null
          sheikh_id?: string | null
          soft_deleted_at?: string | null
          source_platform?: string | null
          source_url?: string | null
          state?: string
          tags?: string[] | null
          title: string
          topics?: string[] | null
          type: string
          updated_at?: string
        }
        Update: {
          added_at?: string
          created_at?: string
          date?: string | null
          description?: string | null
          duration?: number | null
          event?: string | null
          external_url?: string | null
          file_path?: string | null
          id?: string
          language?: string
          location?: string | null
          metadata?: Json | null
          page_count?: number | null
          publisher?: string | null
          sheikh_id?: string | null
          soft_deleted_at?: string | null
          source_platform?: string | null
          source_url?: string | null
          state?: string
          tags?: string[] | null
          title?: string
          topics?: string[] | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_sheikh_id_fkey"
            columns: ["sheikh_id"]
            isOneToOne: false
            referencedRelation: "sheikhs"
            referencedColumns: ["id"]
          },
        ]
      }
      donation_progress: {
        Row: {
          current_amount: number | null
          current_sqft: number
          id: string
          total_amount: number | null
          total_sqft: number
          updated_at: string
        }
        Insert: {
          current_amount?: number | null
          current_sqft?: number
          id?: string
          total_amount?: number | null
          total_sqft?: number
          updated_at?: string
        }
        Update: {
          current_amount?: number | null
          current_sqft?: number
          id?: string
          total_amount?: number | null
          total_sqft?: number
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          date: string | null
          description: string | null
          id: string
          location: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date?: string | null
          description?: string | null
          id?: string
          location?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string | null
          description?: string | null
          id?: string
          location?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      featured_items: {
        Row: {
          content_id: string
          created_at: string
          enabled: boolean
          id: string
          slot: string
          sort_order: number
        }
        Insert: {
          content_id: string
          created_at?: string
          enabled?: boolean
          id?: string
          slot?: string
          sort_order?: number
        }
        Update: {
          content_id?: string
          created_at?: string
          enabled?: boolean
          id?: string
          slot?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "featured_items_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
        ]
      }
      project_images: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          sort_order: number
          url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          sort_order?: number
          url: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          sort_order?: number
          url?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          id: string
          item_id: string
          item_type: string
          notes: string | null
          state: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          item_type: string
          notes?: string | null
          state?: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          item_type?: string
          notes?: string | null
          state?: string
        }
        Relationships: []
      }
      sheikhs: {
        Row: {
          created_at: string
          id: string
          languages: string[] | null
          name: string
          photo_url: string | null
          short_bio: string | null
          topics: string[] | null
          updated_at: string
          visibility: string
        }
        Insert: {
          created_at?: string
          id?: string
          languages?: string[] | null
          name: string
          photo_url?: string | null
          short_bio?: string | null
          topics?: string[] | null
          updated_at?: string
          visibility?: string
        }
        Update: {
          created_at?: string
          id?: string
          languages?: string[] | null
          name?: string
          photo_url?: string | null
          short_bio?: string | null
          topics?: string[] | null
          updated_at?: string
          visibility?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          created_at: string
          id: string
          key: string
          locale: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          locale: string
          updated_at?: string
          value?: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          locale?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      submissions: {
        Row: {
          contact_email: string | null
          created_at: string
          date: string | null
          description: string | null
          event: string | null
          file_path: string | null
          id: string
          location: string | null
          notes: string | null
          reviewed_at: string | null
          sheikh_id: string | null
          state: string
          title: string
          type: string
          url: string | null
        }
        Insert: {
          contact_email?: string | null
          created_at?: string
          date?: string | null
          description?: string | null
          event?: string | null
          file_path?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          reviewed_at?: string | null
          sheikh_id?: string | null
          state?: string
          title: string
          type: string
          url?: string | null
        }
        Update: {
          contact_email?: string | null
          created_at?: string
          date?: string | null
          description?: string | null
          event?: string | null
          file_path?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          reviewed_at?: string | null
          sheikh_id?: string | null
          state?: string
          title?: string
          type?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_sheikh_id_fkey"
            columns: ["sheikh_id"]
            isOneToOne: false
            referencedRelation: "sheikhs"
            referencedColumns: ["id"]
          },
        ]
      }
      topics: {
        Row: {
          created_at: string
          description: string | null
          id: string
          locale: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          locale?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          locale?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
