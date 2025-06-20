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
      appointments: {
        Row: {
          appointment_date: string
          appointment_type: string
          client_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          duration_minutes: number | null
          employee_id: string | null
          horse_id: string | null
          id: string
          location: string | null
          notes: string | null
          reminder_sent: boolean | null
          status: string
          tenant_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          appointment_type: string
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration_minutes?: number | null
          employee_id?: string | null
          horse_id?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          reminder_sent?: boolean | null
          status?: string
          tenant_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_type?: string
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration_minutes?: number | null
          employee_id?: string | null
          horse_id?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          reminder_sent?: boolean | null
          status?: string
          tenant_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_appointments_client"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_appointments_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_appointments_horse"
            columns: ["horse_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_appointments_tenant"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      breeding_records: {
        Row: {
          additional_costs: number | null
          attachments: Json | null
          breeding_date: string
          breeding_manager: string | null
          contract_id: string | null
          created_at: string | null
          created_by: string | null
          expected_due_date: string | null
          foal_id: string | null
          foaling_date: string | null
          id: string
          location: string | null
          mare_id: string
          method: string
          notes: string | null
          pregnancy_confirmation_date: string | null
          pregnancy_confirmed: boolean | null
          result: string | null
          stallion_id: string
          status: string
          stud_fee: number | null
          tenant_id: string
          updated_at: string | null
          veterinarian: string | null
        }
        Insert: {
          additional_costs?: number | null
          attachments?: Json | null
          breeding_date: string
          breeding_manager?: string | null
          contract_id?: string | null
          created_at?: string | null
          created_by?: string | null
          expected_due_date?: string | null
          foal_id?: string | null
          foaling_date?: string | null
          id?: string
          location?: string | null
          mare_id: string
          method: string
          notes?: string | null
          pregnancy_confirmation_date?: string | null
          pregnancy_confirmed?: boolean | null
          result?: string | null
          stallion_id: string
          status?: string
          stud_fee?: number | null
          tenant_id: string
          updated_at?: string | null
          veterinarian?: string | null
        }
        Update: {
          additional_costs?: number | null
          attachments?: Json | null
          breeding_date?: string
          breeding_manager?: string | null
          contract_id?: string | null
          created_at?: string | null
          created_by?: string | null
          expected_due_date?: string | null
          foal_id?: string | null
          foaling_date?: string | null
          id?: string
          location?: string | null
          mare_id?: string
          method?: string
          notes?: string | null
          pregnancy_confirmation_date?: string | null
          pregnancy_confirmed?: boolean | null
          result?: string | null
          stallion_id?: string
          status?: string
          stud_fee?: number | null
          tenant_id?: string
          updated_at?: string | null
          veterinarian?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "breeding_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "breeding_records_foal_id_fkey"
            columns: ["foal_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "breeding_records_mare_id_fkey"
            columns: ["mare_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "breeding_records_stallion_id_fkey"
            columns: ["stallion_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "breeding_records_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: Json | null
          billing_address: Json | null
          client_number: string | null
          client_type: string
          created_at: string | null
          created_by: string | null
          credit_limit: number | null
          email: string | null
          id: string
          name: string
          notes: string | null
          payment_terms: string | null
          phone: string | null
          status: string
          tax_id: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          address?: Json | null
          billing_address?: Json | null
          client_number?: string | null
          client_type: string
          created_at?: string | null
          created_by?: string | null
          credit_limit?: number | null
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          payment_terms?: string | null
          phone?: string | null
          status?: string
          tax_id?: string | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          address?: Json | null
          billing_address?: Json | null
          client_number?: string | null
          client_type?: string
          created_at?: string | null
          created_by?: string | null
          credit_limit?: number | null
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          payment_terms?: string | null
          phone?: string | null
          status?: string
          tax_id?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_clients_tenant"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          address: Json | null
          created_at: string | null
          created_by: string | null
          department: string
          email: string | null
          emergency_contact: Json | null
          employee_number: string | null
          first_name: string
          hire_date: string
          id: string
          last_name: string
          phone: string | null
          position: string
          salary: number | null
          status: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          address?: Json | null
          created_at?: string | null
          created_by?: string | null
          department: string
          email?: string | null
          emergency_contact?: Json | null
          employee_number?: string | null
          first_name: string
          hire_date: string
          id?: string
          last_name: string
          phone?: string | null
          position: string
          salary?: number | null
          status?: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          address?: Json | null
          created_at?: string | null
          created_by?: string | null
          department?: string
          email?: string | null
          emergency_contact?: Json | null
          employee_number?: string | null
          first_name?: string
          hire_date?: string
          id?: string
          last_name?: string
          phone?: string | null
          position?: string
          salary?: number | null
          status?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_employees_tenant"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      health_records: {
        Row: {
          attachments: Json | null
          created_at: string | null
          created_by: string | null
          date_performed: string
          description: string | null
          diagnosis: string | null
          findings: string | null
          horse_id: string
          id: string
          medications: Json | null
          next_due_date: string | null
          recommendations: string | null
          record_type: string
          status: string
          tenant_id: string
          title: string
          treatment: string | null
          updated_at: string | null
          veterinarian: string | null
        }
        Insert: {
          attachments?: Json | null
          created_at?: string | null
          created_by?: string | null
          date_performed: string
          description?: string | null
          diagnosis?: string | null
          findings?: string | null
          horse_id: string
          id?: string
          medications?: Json | null
          next_due_date?: string | null
          recommendations?: string | null
          record_type: string
          status?: string
          tenant_id: string
          title: string
          treatment?: string | null
          updated_at?: string | null
          veterinarian?: string | null
        }
        Update: {
          attachments?: Json | null
          created_at?: string | null
          created_by?: string | null
          date_performed?: string
          description?: string | null
          diagnosis?: string | null
          findings?: string | null
          horse_id?: string
          id?: string
          medications?: Json | null
          next_due_date?: string | null
          recommendations?: string | null
          record_type?: string
          status?: string
          tenant_id?: string
          title?: string
          treatment?: string | null
          updated_at?: string | null
          veterinarian?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "health_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "health_records_horse_id_fkey"
            columns: ["horse_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "health_records_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      horse_documents: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          document_type: string
          expiry_date: string | null
          file_name: string
          file_size: number | null
          file_type: string | null
          file_url: string
          horse_id: string | null
          id: string
          is_active: boolean | null
          issue_date: string | null
          tags: string[] | null
          tenant_id: string
          title: string
          updated_at: string | null
          visibility: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          document_type: string
          expiry_date?: string | null
          file_name: string
          file_size?: number | null
          file_type?: string | null
          file_url: string
          horse_id?: string | null
          id?: string
          is_active?: boolean | null
          issue_date?: string | null
          tags?: string[] | null
          tenant_id: string
          title: string
          updated_at?: string | null
          visibility?: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          document_type?: string
          expiry_date?: string | null
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          horse_id?: string | null
          id?: string
          is_active?: boolean | null
          issue_date?: string | null
          tags?: string[] | null
          tenant_id?: string
          title?: string
          updated_at?: string | null
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "horse_documents_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "horse_documents_horse_id_fkey"
            columns: ["horse_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "horse_documents_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      horse_financials: {
        Row: {
          amount: number
          attachments: Json | null
          created_at: string | null
          created_by: string | null
          currency: string
          description: string
          horse_id: string
          id: string
          invoice_number: string | null
          notes: string | null
          payee: string | null
          payer: string | null
          payment_method: string | null
          payment_status: string
          receipt_number: string | null
          related_record_id: string | null
          tenant_id: string
          transaction_date: string
          transaction_type: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          attachments?: Json | null
          created_at?: string | null
          created_by?: string | null
          currency?: string
          description: string
          horse_id: string
          id?: string
          invoice_number?: string | null
          notes?: string | null
          payee?: string | null
          payer?: string | null
          payment_method?: string | null
          payment_status?: string
          receipt_number?: string | null
          related_record_id?: string | null
          tenant_id: string
          transaction_date: string
          transaction_type: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          attachments?: Json | null
          created_at?: string | null
          created_by?: string | null
          currency?: string
          description?: string
          horse_id?: string
          id?: string
          invoice_number?: string | null
          notes?: string | null
          payee?: string | null
          payer?: string | null
          payment_method?: string | null
          payment_status?: string
          receipt_number?: string | null
          related_record_id?: string | null
          tenant_id?: string
          transaction_date?: string
          transaction_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "horse_financials_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "horse_financials_horse_id_fkey"
            columns: ["horse_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "horse_financials_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      horse_movements: {
        Row: {
          attachments: Json | null
          created_at: string | null
          created_by: string | null
          current_stall: string | null
          driver_name: string | null
          from_location: string | null
          health_certificate: string | null
          horse_id: string
          id: string
          insurance_coverage: string | null
          movement_date: string
          movement_type: string
          notes: string | null
          receiving_person: string | null
          responsible_person: string | null
          status: string
          tenant_id: string
          to_location: string | null
          transport_company: string | null
          transport_method: string | null
          transport_permit: string | null
          updated_at: string | null
          vehicle_details: string | null
        }
        Insert: {
          attachments?: Json | null
          created_at?: string | null
          created_by?: string | null
          current_stall?: string | null
          driver_name?: string | null
          from_location?: string | null
          health_certificate?: string | null
          horse_id: string
          id?: string
          insurance_coverage?: string | null
          movement_date: string
          movement_type: string
          notes?: string | null
          receiving_person?: string | null
          responsible_person?: string | null
          status?: string
          tenant_id: string
          to_location?: string | null
          transport_company?: string | null
          transport_method?: string | null
          transport_permit?: string | null
          updated_at?: string | null
          vehicle_details?: string | null
        }
        Update: {
          attachments?: Json | null
          created_at?: string | null
          created_by?: string | null
          current_stall?: string | null
          driver_name?: string | null
          from_location?: string | null
          health_certificate?: string | null
          horse_id?: string
          id?: string
          insurance_coverage?: string | null
          movement_date?: string
          movement_type?: string
          notes?: string | null
          receiving_person?: string | null
          responsible_person?: string | null
          status?: string
          tenant_id?: string
          to_location?: string | null
          transport_company?: string | null
          transport_method?: string | null
          transport_permit?: string | null
          updated_at?: string | null
          vehicle_details?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "horse_movements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "horse_movements_horse_id_fkey"
            columns: ["horse_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "horse_movements_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      horses: {
        Row: {
          arabic_name: string | null
          birth_date: string
          bloodline_origin: string | null
          breed: string
          color: string
          created_at: string | null
          created_by: string | null
          current_location: string | null
          dam_id: string | null
          gender: string
          health_status: string
          height: number | null
          id: string
          insurance_provider: string | null
          insurance_value: number | null
          insured: boolean | null
          market_value: number | null
          microchip_id: string | null
          name: string
          owner_contact: string | null
          owner_name: string
          owner_type: string
          passport_number: string | null
          purchase_price: number | null
          registration_number: string | null
          sire_id: string | null
          stall_number: string | null
          status: string
          tenant_id: string
          updated_at: string | null
          weight: number | null
        }
        Insert: {
          arabic_name?: string | null
          birth_date: string
          bloodline_origin?: string | null
          breed: string
          color: string
          created_at?: string | null
          created_by?: string | null
          current_location?: string | null
          dam_id?: string | null
          gender: string
          health_status?: string
          height?: number | null
          id?: string
          insurance_provider?: string | null
          insurance_value?: number | null
          insured?: boolean | null
          market_value?: number | null
          microchip_id?: string | null
          name: string
          owner_contact?: string | null
          owner_name: string
          owner_type: string
          passport_number?: string | null
          purchase_price?: number | null
          registration_number?: string | null
          sire_id?: string | null
          stall_number?: string | null
          status?: string
          tenant_id: string
          updated_at?: string | null
          weight?: number | null
        }
        Update: {
          arabic_name?: string | null
          birth_date?: string
          bloodline_origin?: string | null
          breed?: string
          color?: string
          created_at?: string | null
          created_by?: string | null
          current_location?: string | null
          dam_id?: string | null
          gender?: string
          health_status?: string
          height?: number | null
          id?: string
          insurance_provider?: string | null
          insurance_value?: number | null
          insured?: boolean | null
          market_value?: number | null
          microchip_id?: string | null
          name?: string
          owner_contact?: string | null
          owner_name?: string
          owner_type?: string
          passport_number?: string | null
          purchase_price?: number | null
          registration_number?: string | null
          sire_id?: string | null
          stall_number?: string | null
          status?: string
          tenant_id?: string
          updated_at?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "horses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "horses_dam_id_fkey"
            columns: ["dam_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "horses_sire_id_fkey"
            columns: ["sire_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "horses_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          parent_category_id: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          parent_category_id?: string | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          parent_category_id?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_inventory_categories_tenant"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_items: {
        Row: {
          barcode: string | null
          category_id: string | null
          created_at: string | null
          created_by: string | null
          current_stock: number | null
          description: string | null
          expiry_date: string | null
          id: string
          name: string
          reorder_level: number | null
          sku: string | null
          status: string
          storage_location: string | null
          supplier_info: Json | null
          tenant_id: string
          unit_cost: number | null
          unit_of_measure: string
          updated_at: string | null
        }
        Insert: {
          barcode?: string | null
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          current_stock?: number | null
          description?: string | null
          expiry_date?: string | null
          id?: string
          name: string
          reorder_level?: number | null
          sku?: string | null
          status?: string
          storage_location?: string | null
          supplier_info?: Json | null
          tenant_id: string
          unit_cost?: number | null
          unit_of_measure: string
          updated_at?: string | null
        }
        Update: {
          barcode?: string | null
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          current_stock?: number | null
          description?: string | null
          expiry_date?: string | null
          id?: string
          name?: string
          reorder_level?: number | null
          sku?: string | null
          status?: string
          storage_location?: string | null
          supplier_info?: Json | null
          tenant_id?: string
          unit_cost?: number | null
          unit_of_measure?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_inventory_items_category"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "inventory_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_inventory_items_tenant"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_transactions: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          item_id: string
          notes: string | null
          quantity: number
          reference_number: string | null
          tenant_id: string
          total_cost: number | null
          transaction_date: string
          transaction_type: string
          unit_cost: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          item_id: string
          notes?: string | null
          quantity: number
          reference_number?: string | null
          tenant_id: string
          total_cost?: number | null
          transaction_date?: string
          transaction_type: string
          unit_cost?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          item_id?: string
          notes?: string | null
          quantity?: number
          reference_number?: string | null
          tenant_id?: string
          total_cost?: number | null
          transaction_date?: string
          transaction_type?: string
          unit_cost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_inventory_transactions_item"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_inventory_transactions_tenant"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      nutrition_records: {
        Row: {
          appetite_rating: number | null
          body_condition_score: number | null
          calories_per_unit: number | null
          created_at: string | null
          created_by: string | null
          dietary_restrictions: string | null
          fat_content: number | null
          fed_by: string | null
          feed_type: string
          feeding_date: string
          feeding_instructions: string | null
          fiber_content: number | null
          horse_id: string
          id: string
          meal_type: string
          notes: string | null
          protein_content: number | null
          quantity: number | null
          supplements: Json | null
          tenant_id: string
          unit: string
          updated_at: string | null
        }
        Insert: {
          appetite_rating?: number | null
          body_condition_score?: number | null
          calories_per_unit?: number | null
          created_at?: string | null
          created_by?: string | null
          dietary_restrictions?: string | null
          fat_content?: number | null
          fed_by?: string | null
          feed_type: string
          feeding_date: string
          feeding_instructions?: string | null
          fiber_content?: number | null
          horse_id: string
          id?: string
          meal_type: string
          notes?: string | null
          protein_content?: number | null
          quantity?: number | null
          supplements?: Json | null
          tenant_id: string
          unit: string
          updated_at?: string | null
        }
        Update: {
          appetite_rating?: number | null
          body_condition_score?: number | null
          calories_per_unit?: number | null
          created_at?: string | null
          created_by?: string | null
          dietary_restrictions?: string | null
          fat_content?: number | null
          fed_by?: string | null
          feed_type?: string
          feeding_date?: string
          feeding_instructions?: string | null
          fiber_content?: number | null
          horse_id?: string
          id?: string
          meal_type?: string
          notes?: string | null
          protein_content?: number | null
          quantity?: number | null
          supplements?: Json | null
          tenant_id?: string
          unit?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nutrition_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nutrition_records_horse_id_fkey"
            columns: ["horse_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nutrition_records_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_records: {
        Row: {
          attachments: Json | null
          category: string | null
          conditions: string | null
          created_at: string | null
          created_by: string | null
          discipline: string | null
          event_date: string
          event_name: string
          event_type: string
          horse_id: string
          id: string
          jockey_rider: string | null
          level: string | null
          location: string | null
          notes: string | null
          placement: number | null
          points_earned: number | null
          prize_money: number | null
          score: number | null
          tenant_id: string
          time_recorded: unknown | null
          total_participants: number | null
          trainer: string | null
          updated_at: string | null
        }
        Insert: {
          attachments?: Json | null
          category?: string | null
          conditions?: string | null
          created_at?: string | null
          created_by?: string | null
          discipline?: string | null
          event_date: string
          event_name: string
          event_type: string
          horse_id: string
          id?: string
          jockey_rider?: string | null
          level?: string | null
          location?: string | null
          notes?: string | null
          placement?: number | null
          points_earned?: number | null
          prize_money?: number | null
          score?: number | null
          tenant_id: string
          time_recorded?: unknown | null
          total_participants?: number | null
          trainer?: string | null
          updated_at?: string | null
        }
        Update: {
          attachments?: Json | null
          category?: string | null
          conditions?: string | null
          created_at?: string | null
          created_by?: string | null
          discipline?: string | null
          event_date?: string
          event_name?: string
          event_type?: string
          horse_id?: string
          id?: string
          jockey_rider?: string | null
          level?: string | null
          location?: string | null
          notes?: string | null
          placement?: number | null
          points_earned?: number | null
          prize_money?: number | null
          score?: number | null
          tenant_id?: string
          time_recorded?: unknown | null
          total_participants?: number | null
          trainer?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "performance_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performance_records_horse_id_fkey"
            columns: ["horse_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performance_records_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      pregnancy_records: {
        Row: {
          actual_foaling_date: string | null
          attachments: Json | null
          breeding_record_id: string | null
          complications: string | null
          conception_date: string | null
          created_at: string | null
          created_by: string | null
          expected_due_date: string
          feeding_program: string | null
          foal_id: string | null
          id: string
          last_ultrasound_date: string | null
          mare_condition: string | null
          mare_id: string
          notes: string | null
          pregnancy_outcome: string | null
          pregnancy_stage: string | null
          tenant_id: string
          ultrasound_results: string | null
          updated_at: string | null
          vaccination_schedule: Json | null
          veterinarian: string | null
          vital_signs: Json | null
          weight_tracking: Json | null
        }
        Insert: {
          actual_foaling_date?: string | null
          attachments?: Json | null
          breeding_record_id?: string | null
          complications?: string | null
          conception_date?: string | null
          created_at?: string | null
          created_by?: string | null
          expected_due_date: string
          feeding_program?: string | null
          foal_id?: string | null
          id?: string
          last_ultrasound_date?: string | null
          mare_condition?: string | null
          mare_id: string
          notes?: string | null
          pregnancy_outcome?: string | null
          pregnancy_stage?: string | null
          tenant_id: string
          ultrasound_results?: string | null
          updated_at?: string | null
          vaccination_schedule?: Json | null
          veterinarian?: string | null
          vital_signs?: Json | null
          weight_tracking?: Json | null
        }
        Update: {
          actual_foaling_date?: string | null
          attachments?: Json | null
          breeding_record_id?: string | null
          complications?: string | null
          conception_date?: string | null
          created_at?: string | null
          created_by?: string | null
          expected_due_date?: string
          feeding_program?: string | null
          foal_id?: string | null
          id?: string
          last_ultrasound_date?: string | null
          mare_condition?: string | null
          mare_id?: string
          notes?: string | null
          pregnancy_outcome?: string | null
          pregnancy_stage?: string | null
          tenant_id?: string
          ultrasound_results?: string | null
          updated_at?: string | null
          vaccination_schedule?: Json | null
          veterinarian?: string | null
          vital_signs?: Json | null
          weight_tracking?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "pregnancy_records_breeding_record_id_fkey"
            columns: ["breeding_record_id"]
            isOneToOne: false
            referencedRelation: "breeding_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pregnancy_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pregnancy_records_foal_id_fkey"
            columns: ["foal_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pregnancy_records_mare_id_fkey"
            columns: ["mare_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pregnancy_records_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          updated_at: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          updated_at?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      stalls: {
        Row: {
          capacity: number | null
          created_at: string | null
          created_by: string | null
          current_occupant_id: string | null
          dimensions: string | null
          features: Json | null
          id: string
          location: string | null
          notes: string | null
          rent_amount: number | null
          stall_number: string
          stall_type: string
          status: string
          tenant_id: string
          updated_at: string | null
          utilities_included: boolean | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          created_by?: string | null
          current_occupant_id?: string | null
          dimensions?: string | null
          features?: Json | null
          id?: string
          location?: string | null
          notes?: string | null
          rent_amount?: number | null
          stall_number: string
          stall_type: string
          status?: string
          tenant_id: string
          updated_at?: string | null
          utilities_included?: boolean | null
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          created_by?: string | null
          current_occupant_id?: string | null
          dimensions?: string | null
          features?: Json | null
          id?: string
          location?: string | null
          notes?: string | null
          rent_amount?: number | null
          stall_number?: string
          stall_type?: string
          status?: string
          tenant_id?: string
          updated_at?: string | null
          utilities_included?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_stalls_tenant"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_users: {
        Row: {
          id: string
          joined_at: string | null
          last_login_at: string | null
          permissions: string[] | null
          role: string
          status: string
          tenant_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          last_login_at?: string | null
          permissions?: string[] | null
          role: string
          status?: string
          tenant_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          last_login_at?: string | null
          permissions?: string[] | null
          role?: string
          status?: string
          tenant_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          name: string
          settings: Json | null
          status: string
          subscription_tier: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          name: string
          settings?: Json | null
          status?: string
          subscription_tier: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          settings?: Json | null
          status?: string
          subscription_tier?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      training_records: {
        Row: {
          created_at: string | null
          created_by: string | null
          discipline: string | null
          duration_minutes: number | null
          energy_level: number | null
          equipment_used: string[] | null
          exercises_performed: string[] | null
          gait_quality: Json | null
          horse_id: string
          id: string
          intensity_level: string | null
          next_session_notes: string | null
          progress_notes: string | null
          recommended_exercises: string[] | null
          responsiveness_score: number | null
          session_date: string
          surface_conditions: string | null
          tenant_id: string
          trainer: string | null
          training_goals: string | null
          training_type: string
          updated_at: string | null
          weather_conditions: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          discipline?: string | null
          duration_minutes?: number | null
          energy_level?: number | null
          equipment_used?: string[] | null
          exercises_performed?: string[] | null
          gait_quality?: Json | null
          horse_id: string
          id?: string
          intensity_level?: string | null
          next_session_notes?: string | null
          progress_notes?: string | null
          recommended_exercises?: string[] | null
          responsiveness_score?: number | null
          session_date: string
          surface_conditions?: string | null
          tenant_id: string
          trainer?: string | null
          training_goals?: string | null
          training_type: string
          updated_at?: string | null
          weather_conditions?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          discipline?: string | null
          duration_minutes?: number | null
          energy_level?: number | null
          equipment_used?: string[] | null
          exercises_performed?: string[] | null
          gait_quality?: Json | null
          horse_id?: string
          id?: string
          intensity_level?: string | null
          next_session_notes?: string | null
          progress_notes?: string | null
          recommended_exercises?: string[] | null
          responsiveness_score?: number | null
          session_date?: string
          surface_conditions?: string | null
          tenant_id?: string
          trainer?: string | null
          training_goals?: string | null
          training_type?: string
          updated_at?: string | null
          weather_conditions?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_records_horse_id_fkey"
            columns: ["horse_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_records_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      ensure_all_sample_tenant_associations: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      ensure_user_profile_exists: {
        Args:
          | Record<PropertyKey, never>
          | {
              p_user_id: string
              p_email: string
              p_first_name?: string
              p_last_name?: string
            }
        Returns: undefined
      }
      get_user_tenant_access: {
        Args: { user_id: string }
        Returns: {
          tenant_id: string
          role: string
          permissions: string[]
        }[]
      }
      insert_tenant_user_if_exists: {
        Args: {
          p_user_email: string
          p_tenant_id: string
          p_role: string
          p_permissions?: string[]
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
