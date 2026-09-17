export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: string
          created_at: string
        }
        Insert: {
          id: string
          role?: string
          created_at?: string
        }
        Update: {
          role?: string
        }
        Relationships: []
      }
      sheikhs: {
        Row: {
          id: string
          name: string
          photo_url: string | null
          short_bio: string
          languages: string[]
          topics: string[]
          visibility: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          photo_url?: string | null
          short_bio?: string
          languages?: string[]
          topics?: string[]
          visibility?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          photo_url?: string | null
          short_bio?: string
          languages?: string[]
          topics?: string[]
          visibility?: string
          updated_at?: string
        }
        Relationships: []
      }
      topics: {
        Row: {
          id: string
          name: string
          slug: string
          locale: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          locale?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          slug?: string
          locale?: string
          description?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          id: string
          name: string
          date: string | null
          location: string | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          date?: string | null
          location?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          date?: string | null
          location?: string | null
          description?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      content: {
        Row: {
          added_at: string
          created_at: string
          date: string | null
          description: string
          duration: number | null
          event: string | null
          external_url: string | null
          file_path: string | null
          id: string
          language: string
          metadata: Json
          page_count: number | null
          publisher: string | null
          sheikh_id: string | null
          soft_deleted_at: string | null
          source_platform: string | null
          source_url: string | null
          state: string
          tags: string[]
          title: string
          topics: string[]
          type: string
          updated_at: string
        }
        Insert: {
          added_at?: string
          created_at?: string
          date?: string | null
          description?: string
          duration?: number | null
          event?: string | null
          external_url?: string | null
          file_path?: string | null
          id?: string
          language?: string
          metadata?: Json
          page_count?: number | null
          publisher?: string | null
          sheikh_id?: string | null
          soft_deleted_at?: string | null
          source_platform?: string | null
          source_url?: string | null
          state?: string
          tags?: string[]
          title: string
          topics?: string[]
          type: string
          updated_at?: string
        }
        Update: {
          added_at?: string
          date?: string | null
          description?: string
          duration?: number | null
          event?: string | null
          external_url?: string | null
          file_path?: string | null
          language?: string
          metadata?: Json
          page_count?: number | null
          publisher?: string | null
          sheikh_id?: string | null
          soft_deleted_at?: string | null
          source_platform?: string | null
          source_url?: string | null
          state?: string
          tags?: string[]
          title?: string
          topics?: string[]
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_sheikh_id_fkey"
            columns: ["sheikh_id"]
            referencedRelation: "sheikhs"
            referencedColumns: ["id"]
          }
        ]
      }
      collections: {
        Row: {
          cover_image: string | null
          created_at: string
          date_range: string | null
          description: string
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
          description?: string
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
          date_range?: string | null
          description?: string
          enabled?: boolean
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
            referencedRelation: "sheikhs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collections_topic_id_fkey"
            columns: ["topic_id"]
            referencedRelation: "topics"
            referencedColumns: ["id"]
          }
        ]
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
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "collection_items_collection_id_fkey"
            columns: ["collection_id"]
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_items_content_id_fkey"
            columns: ["content_id"]
            referencedRelation: "content"
            referencedColumns: ["id"]
          }
        ]
      }
      submissions: {
        Row: {
          contact_email: string | null
          created_at: string
          date: string | null
          description: string
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
          description?: string
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
          date?: string | null
          description?: string
          event?: string | null
          file_path?: string | null
          location?: string | null
          notes?: string | null
          reviewed_at?: string | null
          sheikh_id?: string | null
          state?: string
          title?: string
          type?: string
          url?: string | null
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
          item_id?: string
          item_type?: string
          notes?: string | null
          state?: string
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
          enabled?: boolean
          slot?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "featured_items_content_id_fkey"
            columns: ["content_id"]
            referencedRelation: "content"
            referencedColumns: ["id"]
          }
        ]
      }
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
          referral?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_content_id_fkey"
            columns: ["content_id"]
            referencedRelation: "content"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_updated_at_column: {
        Args: {}
        Returns: trigger
      }
      has_role: {
        Args: {
          _user_id: uuid
          _role: app_role
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

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof DatabaseWithoutInternals, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  DefaultSchemaCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends DefaultSchemaCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = DefaultSchemaCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : DefaultSchemaCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][DefaultSchemaCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
