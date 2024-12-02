export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      additives: {
        Row: {
          body_systems_affected: string[] | null
          code: string | null
          created_at: string
          description: string | null
          health_impacts: Json | null
          id: string
          name: string
          risk_level: string | null
          scientific_studies: Json | null
          updated_at: string
        }
        Insert: {
          body_systems_affected?: string[] | null
          code?: string | null
          created_at?: string
          description?: string | null
          health_impacts?: Json | null
          id?: string
          name: string
          risk_level?: string | null
          scientific_studies?: Json | null
          updated_at?: string
        }
        Update: {
          body_systems_affected?: string[] | null
          code?: string | null
          created_at?: string
          description?: string | null
          health_impacts?: Json | null
          id?: string
          name?: string
          risk_level?: string | null
          scientific_studies?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      compatibility: {
        Row: {
          compatible_condition: string
          created_at: string
          diet_id: string | null
          id: string
          notes: string | null
        }
        Insert: {
          compatible_condition: string
          created_at?: string
          diet_id?: string | null
          id?: string
          notes?: string | null
        }
        Update: {
          compatible_condition?: string
          created_at?: string
          diet_id?: string | null
          id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compatibility_diet_id_fkey"
            columns: ["diet_id"]
            isOneToOne: false
            referencedRelation: "diets"
            referencedColumns: ["id"]
          },
        ]
      }
      diet_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          order_index: number | null
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          order_index?: number | null
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          order_index?: number | null
          slug?: string
        }
        Relationships: []
      }
      diet_tags: {
        Row: {
          created_at: string
          diet_id: string | null
          id: string
          tag: string
        }
        Insert: {
          created_at?: string
          diet_id?: string | null
          id?: string
          tag: string
        }
        Update: {
          created_at?: string
          diet_id?: string | null
          id?: string
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "diet_tags_diet_id_fkey"
            columns: ["diet_id"]
            isOneToOne: false
            referencedRelation: "diets"
            referencedColumns: ["id"]
          },
        ]
      }
      diets: {
        Row: {
          category_id: string | null
          core_principles: string | null
          created_at: string
          description: string | null
          id: string
          is_therapeutic: boolean | null
          name: string
          origin: string | null
          primary_goal: Database["public"]["Enums"]["diet_goal_type"] | null
          target_demographic: string | null
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          core_principles?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_therapeutic?: boolean | null
          name: string
          origin?: string | null
          primary_goal?: Database["public"]["Enums"]["diet_goal_type"] | null
          target_demographic?: string | null
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          core_principles?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_therapeutic?: boolean | null
          name?: string
          origin?: string | null
          primary_goal?: Database["public"]["Enums"]["diet_goal_type"] | null
          target_demographic?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "diets_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "diet_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      food_recommendations: {
        Row: {
          created_at: string
          diet_id: string | null
          food_category: string | null
          food_name: string
          id: string
          notes: string | null
        }
        Insert: {
          created_at?: string
          diet_id?: string | null
          food_category?: string | null
          food_name: string
          id?: string
          notes?: string | null
        }
        Update: {
          created_at?: string
          diet_id?: string | null
          food_category?: string | null
          food_name?: string
          id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "food_recommendations_diet_id_fkey"
            columns: ["diet_id"]
            isOneToOne: false
            referencedRelation: "diets"
            referencedColumns: ["id"]
          },
        ]
      }
      food_restrictions: {
        Row: {
          created_at: string
          diet_id: string | null
          food_category: string | null
          food_name: string
          id: string
          reason: string | null
        }
        Insert: {
          created_at?: string
          diet_id?: string | null
          food_category?: string | null
          food_name: string
          id?: string
          reason?: string | null
        }
        Update: {
          created_at?: string
          diet_id?: string | null
          food_category?: string | null
          food_name?: string
          id?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "food_restrictions_diet_id_fkey"
            columns: ["diet_id"]
            isOneToOne: false
            referencedRelation: "diets"
            referencedColumns: ["id"]
          },
        ]
      }
      goals_and_benefits: {
        Row: {
          created_at: string
          description: string | null
          diet_id: string | null
          goal: string
          id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          diet_id?: string | null
          goal: string
          id?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          diet_id?: string | null
          goal?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goals_and_benefits_diet_id_fkey"
            columns: ["diet_id"]
            isOneToOne: false
            referencedRelation: "diets"
            referencedColumns: ["id"]
          },
        ]
      }
      product_health_analysis: {
        Row: {
          created_at: string
          hazard_ingredients: string[] | null
          health_score: number
          id: string
          nutrition_analysis: Json | null
          product_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          hazard_ingredients?: string[] | null
          health_score: number
          id?: string
          nutrition_analysis?: Json | null
          product_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          hazard_ingredients?: string[] | null
          health_score?: number
          id?: string
          nutrition_analysis?: Json | null
          product_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_health_analysis_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          barcode: string
          created_at: string
          id: string
          image_url: string | null
          ingredients: string | null
          name: string | null
          nutritional_info: Json | null
          search_text: unknown | null
          user_id: string
        }
        Insert: {
          barcode: string
          created_at?: string
          id?: string
          image_url?: string | null
          ingredients?: string | null
          name?: string | null
          nutritional_info?: Json | null
          search_text?: unknown | null
          user_id: string
        }
        Update: {
          barcode?: string
          created_at?: string
          id?: string
          image_url?: string | null
          ingredients?: string | null
          name?: string | null
          nutritional_info?: Json | null
          search_text?: unknown | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          allergies: string[] | null
          avatar_url: string | null
          dietary_preferences: string[] | null
          full_name: string | null
          health_conditions: string[] | null
          id: string
          notification_preferences: Json | null
          preferred_diet_type: string | null
          updated_at: string
          username: string | null
          weight_goals: string | null
        }
        Insert: {
          allergies?: string[] | null
          avatar_url?: string | null
          dietary_preferences?: string[] | null
          full_name?: string | null
          health_conditions?: string[] | null
          id: string
          notification_preferences?: Json | null
          preferred_diet_type?: string | null
          updated_at?: string
          username?: string | null
          weight_goals?: string | null
        }
        Update: {
          allergies?: string[] | null
          avatar_url?: string | null
          dietary_preferences?: string[] | null
          full_name?: string | null
          health_conditions?: string[] | null
          id?: string
          notification_preferences?: Json | null
          preferred_diet_type?: string | null
          updated_at?: string
          username?: string | null
          weight_goals?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      _intbig_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      _intbig_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      akeys: {
        Args: {
          "": unknown
        }
        Returns: string[]
      }
      avals: {
        Args: {
          "": unknown
        }
        Returns: string[]
      }
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      bqarr_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      bqarr_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      bytea_to_text: {
        Args: {
          data: string
        }
        Returns: string
      }
      crosstab: {
        Args: {
          "": string
        }
        Returns: Record<string, unknown>[]
      }
      crosstab2: {
        Args: {
          "": string
        }
        Returns: Database["public"]["CompositeTypes"]["tablefunc_crosstab_2"][]
      }
      crosstab3: {
        Args: {
          "": string
        }
        Returns: Database["public"]["CompositeTypes"]["tablefunc_crosstab_3"][]
      }
      crosstab4: {
        Args: {
          "": string
        }
        Returns: Database["public"]["CompositeTypes"]["tablefunc_crosstab_4"][]
      }
      dmetaphone: {
        Args: {
          "": string
        }
        Returns: string
      }
      dmetaphone_alt: {
        Args: {
          "": string
        }
        Returns: string
      }
      each: {
        Args: {
          hs: unknown
        }
        Returns: Record<string, unknown>[]
      }
      g_int_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      g_int_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      g_int_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      g_intbig_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      g_intbig_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      g_intbig_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gbt_bit_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_bool_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_bool_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_bpchar_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_bytea_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_cash_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_cash_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_date_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_date_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_enum_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_enum_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_float4_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_float4_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_float8_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_float8_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_inet_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_int2_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_int2_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_int4_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_int4_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_int8_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_int8_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_intv_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_intv_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_intv_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_macad_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_macad_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_macad8_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_macad8_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_numeric_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_oid_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_oid_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_text_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_time_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_time_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_timetz_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_ts_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_ts_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_tstz_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_uuid_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_uuid_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_var_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_var_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey_var_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey_var_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey16_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey16_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey2_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey2_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey32_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey32_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey4_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey4_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey8_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey8_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ghstore_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ghstore_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ghstore_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ghstore_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      ghstore_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hstore:
        | {
            Args: {
              "": string[]
            }
            Returns: unknown
          }
        | {
            Args: {
              "": Record<string, unknown>
            }
            Returns: unknown
          }
      hstore_hash: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      hstore_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hstore_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hstore_recv: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hstore_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hstore_subscript_handler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hstore_to_array: {
        Args: {
          "": unknown
        }
        Returns: string[]
      }
      hstore_to_json: {
        Args: {
          "": unknown
        }
        Returns: Json
      }
      hstore_to_json_loose: {
        Args: {
          "": unknown
        }
        Returns: Json
      }
      hstore_to_jsonb: {
        Args: {
          "": unknown
        }
        Returns: Json
      }
      hstore_to_jsonb_loose: {
        Args: {
          "": unknown
        }
        Returns: Json
      }
      hstore_to_matrix: {
        Args: {
          "": unknown
        }
        Returns: string[]
      }
      hstore_version_diag: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      http: {
        Args: {
          request: Database["public"]["CompositeTypes"]["http_request"]
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete:
        | {
            Args: {
              uri: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
      http_get:
        | {
            Args: {
              uri: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
      http_head: {
        Args: {
          uri: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: {
          field: string
          value: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post:
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
      http_put: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: {
          curlopt: string
          value: string
        }
        Returns: boolean
      }
      icount: {
        Args: {
          "": number[]
        }
        Returns: number
      }
      intset: {
        Args: {
          "": number
        }
        Returns: number[]
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      querytree: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: string[]
      }
      skeys: {
        Args: {
          "": unknown
        }
        Returns: string[]
      }
      sort: {
        Args: {
          "": number[]
        }
        Returns: number[]
      }
      sort_asc: {
        Args: {
          "": number[]
        }
        Returns: number[]
      }
      sort_desc: {
        Args: {
          "": number[]
        }
        Returns: number[]
      }
      soundex: {
        Args: {
          "": string
        }
        Returns: string
      }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      svals: {
        Args: {
          "": unknown
        }
        Returns: string[]
      }
      text_soundex: {
        Args: {
          "": string
        }
        Returns: string
      }
      text_to_bytea: {
        Args: {
          data: string
        }
        Returns: string
      }
      unaccent: {
        Args: {
          "": string
        }
        Returns: string
      }
      unaccent_init: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      uniq: {
        Args: {
          "": number[]
        }
        Returns: number[]
      }
      urlencode:
        | {
            Args: {
              data: Json
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      diet_goal_type:
        | "Weight Loss"
        | "Heart Health"
        | "Digestive Health"
        | "Wellness"
        | "Disease Management"
        | "Sustainability"
        | "Other"
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
      tablefunc_crosstab_2: {
        row_name: string | null
        category_1: string | null
        category_2: string | null
      }
      tablefunc_crosstab_3: {
        row_name: string | null
        category_1: string | null
        category_2: string | null
        category_3: string | null
      }
      tablefunc_crosstab_4: {
        row_name: string | null
        category_1: string | null
        category_2: string | null
        category_3: string | null
        category_4: string | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
