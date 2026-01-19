export type Json
  = | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: number
          user_id: string
          name: string | null
          email: string | null
          type: string | null
          priority: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: never
          user_id?: string
          name?: string | null
          email?: string | null
          type?: string | null
          priority?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: never
          user_id?: never
          name?: string | null
          email?: string | null
          type?: string | null
          priority?: number | null
          created_at?: never
          updated_at?: string | null
        }
      }
    }
  }
}

export type ICustomer = Database['public']['Tables']['customers']['Row']
export type INewCustomer = Database['public']['Tables']['customers']['Insert']