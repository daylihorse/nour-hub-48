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
      achievements: {
        Row: {
          achievement_type: string
          attachments: Json | null
          certificate_url: string | null
          competition_id: string | null
          created_at: string | null
          created_by: string | null
          date_achieved: string
          description: string | null
          horse_id: string
          id: string
          judge_notes: string | null
          level: string | null
          ranking: number | null
          score: number | null
          tenant_id: string
          time_recorded: unknown | null
          title: string
          trainer_id: string | null
          updated_at: string | null
          verification_date: string | null
          verified: boolean | null
        }
        Insert: {
          achievement_type: string
          attachments?: Json | null
          certificate_url?: string | null
          competition_id?: string | null
          created_at?: string | null
          created_by?: string | null
          date_achieved: string
          description?: string | null
          horse_id: string
          id?: string
          judge_notes?: string | null
          level?: string | null
          ranking?: number | null
          score?: number | null
          tenant_id: string
          time_recorded?: unknown | null
          title: string
          trainer_id?: string | null
          updated_at?: string | null
          verification_date?: string | null
          verified?: boolean | null
        }
        Update: {
          achievement_type?: string
          attachments?: Json | null
          certificate_url?: string | null
          competition_id?: string | null
          created_at?: string | null
          created_by?: string | null
          date_achieved?: string
          description?: string | null
          horse_id?: string
          id?: string
          judge_notes?: string | null
          level?: string | null
          ranking?: number | null
          score?: number | null
          tenant_id?: string
          time_recorded?: unknown | null
          title?: string
          trainer_id?: string | null
          updated_at?: string | null
          verification_date?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_achievements_competition"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_achievements_horse"
            columns: ["horse_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_achievements_trainer"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainers"
            referencedColumns: ["id"]
          },
        ]
      }
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
      budget_items: {
        Row: {
          account_id: string | null
          budget_id: string
          budgeted_amount: number
          category: string
          created_at: string | null
          id: string
          notes: string | null
          spent_amount: number | null
        }
        Insert: {
          account_id?: string | null
          budget_id: string
          budgeted_amount?: number
          category: string
          created_at?: string | null
          id?: string
          notes?: string | null
          spent_amount?: number | null
        }
        Update: {
          account_id?: string | null
          budget_id?: string
          budgeted_amount?: number
          category?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          spent_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_budget_items_account"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "financial_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_budget_items_budget"
            columns: ["budget_id"]
            isOneToOne: false
            referencedRelation: "budgets"
            referencedColumns: ["id"]
          },
        ]
      }
      budgets: {
        Row: {
          budget_period: string
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string
          id: string
          name: string
          start_date: string
          status: string
          tenant_id: string
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          budget_period: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date: string
          id?: string
          name: string
          start_date: string
          status?: string
          tenant_id: string
          total_amount?: number
          updated_at?: string | null
        }
        Update: {
          budget_period?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string
          id?: string
          name?: string
          start_date?: string
          status?: string
          tenant_id?: string
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: []
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
      communications: {
        Row: {
          attachments: Json | null
          client_id: string | null
          communication_type: string
          completed_at: string | null
          contact_info: Json | null
          contact_person: string | null
          content: string
          created_at: string | null
          created_by: string | null
          direction: string
          employee_id: string | null
          horse_id: string | null
          id: string
          scheduled_at: string | null
          status: string | null
          subject: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          attachments?: Json | null
          client_id?: string | null
          communication_type: string
          completed_at?: string | null
          contact_info?: Json | null
          contact_person?: string | null
          content: string
          created_at?: string | null
          created_by?: string | null
          direction: string
          employee_id?: string | null
          horse_id?: string | null
          id?: string
          scheduled_at?: string | null
          status?: string | null
          subject?: string | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          attachments?: Json | null
          client_id?: string | null
          communication_type?: string
          completed_at?: string | null
          contact_info?: Json | null
          contact_person?: string | null
          content?: string
          created_at?: string | null
          created_by?: string | null
          direction?: string
          employee_id?: string | null
          horse_id?: string | null
          id?: string
          scheduled_at?: string | null
          status?: string | null
          subject?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_communications_client"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_communications_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_communications_horse"
            columns: ["horse_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_communications_tenant"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      competitions: {
        Row: {
          attachments: Json | null
          categories: string[] | null
          competition_type: string
          contact_info: Json | null
          created_at: string | null
          created_by: string | null
          current_participants: number | null
          discipline: string
          end_date: string
          entry_fee: number | null
          id: string
          level: string | null
          location: string
          max_participants: number | null
          name: string
          organizer: string | null
          prize_pool: number | null
          registration_deadline: string | null
          results: Json | null
          rules_regulations: string | null
          start_date: string
          status: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          attachments?: Json | null
          categories?: string[] | null
          competition_type: string
          contact_info?: Json | null
          created_at?: string | null
          created_by?: string | null
          current_participants?: number | null
          discipline: string
          end_date: string
          entry_fee?: number | null
          id?: string
          level?: string | null
          location: string
          max_participants?: number | null
          name: string
          organizer?: string | null
          prize_pool?: number | null
          registration_deadline?: string | null
          results?: Json | null
          rules_regulations?: string | null
          start_date: string
          status?: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          attachments?: Json | null
          categories?: string[] | null
          competition_type?: string
          contact_info?: Json | null
          created_at?: string | null
          created_by?: string | null
          current_participants?: number | null
          discipline?: string
          end_date?: string
          entry_fee?: number | null
          id?: string
          level?: string | null
          location?: string
          max_participants?: number | null
          name?: string
          organizer?: string | null
          prize_pool?: number | null
          registration_deadline?: string | null
          results?: Json | null
          rules_regulations?: string | null
          start_date?: string
          status?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: []
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
      expense_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_category_id: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_category_id?: string | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_category_id?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_expense_categories_parent"
            columns: ["parent_category_id"]
            isOneToOne: false
            referencedRelation: "expense_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          category_id: string | null
          created_at: string | null
          created_by: string | null
          date: string
          description: string
          expense_number: string | null
          id: string
          payment_method_id: string | null
          receipt_url: string | null
          reimbursable: boolean | null
          status: string
          tax_amount: number | null
          tenant_id: string
          updated_at: string | null
          vendor: string | null
        }
        Insert: {
          amount: number
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string
          description: string
          expense_number?: string | null
          id?: string
          payment_method_id?: string | null
          receipt_url?: string | null
          reimbursable?: boolean | null
          status?: string
          tax_amount?: number | null
          tenant_id: string
          updated_at?: string | null
          vendor?: string | null
        }
        Update: {
          amount?: number
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string
          description?: string
          expense_number?: string | null
          id?: string
          payment_method_id?: string | null
          receipt_url?: string | null
          reimbursable?: boolean | null
          status?: string
          tax_amount?: number | null
          tenant_id?: string
          updated_at?: string | null
          vendor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_expenses_category"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "expense_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_expenses_payment_method"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_accounts: {
        Row: {
          account_code: string
          account_name: string
          account_type: string
          balance: number | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          parent_account_id: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          account_code: string
          account_name: string
          account_type: string
          balance?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          parent_account_id?: string | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          account_code?: string
          account_name?: string
          account_type?: string
          balance?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          parent_account_id?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_financial_accounts_parent"
            columns: ["parent_account_id"]
            isOneToOne: false
            referencedRelation: "financial_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_financial_accounts_tenant"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_transactions: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string
          id: string
          reference_number: string | null
          source_document_id: string | null
          source_document_type: string | null
          status: string
          tenant_id: string
          total_amount: number
          transaction_date: string
          transaction_type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description: string
          id?: string
          reference_number?: string | null
          source_document_id?: string | null
          source_document_type?: string | null
          status?: string
          tenant_id: string
          total_amount: number
          transaction_date?: string
          transaction_type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string
          id?: string
          reference_number?: string | null
          source_document_id?: string | null
          source_document_type?: string | null
          status?: string
          tenant_id?: string
          total_amount?: number
          transaction_date?: string
          transaction_type?: string | null
          updated_at?: string | null
        }
        Relationships: []
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
      horse_groups: {
        Row: {
          created_at: string | null
          current_paddock_id: string | null
          group_name: string
          horse_ids: string[]
          id: string
          rotation_order: number
          rotation_plan_id: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_paddock_id?: string | null
          group_name: string
          horse_ids: string[]
          id?: string
          rotation_order: number
          rotation_plan_id: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_paddock_id?: string | null
          group_name?: string
          horse_ids?: string[]
          id?: string
          rotation_order?: number
          rotation_plan_id?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "horse_groups_rotation_plan_id_fkey"
            columns: ["rotation_plan_id"]
            isOneToOne: false
            referencedRelation: "paddock_rotation_plans"
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
      invoice_items: {
        Row: {
          created_at: string | null
          description: string
          horse_id: string | null
          id: string
          invoice_id: string
          item_type: string
          line_total: number
          quantity: number
          service_date: string | null
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          description: string
          horse_id?: string | null
          id?: string
          invoice_id: string
          item_type: string
          line_total: number
          quantity?: number
          service_date?: string | null
          unit_price: number
        }
        Update: {
          created_at?: string | null
          description?: string
          horse_id?: string | null
          id?: string
          invoice_id?: string
          item_type?: string
          line_total?: number
          quantity?: number
          service_date?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_invoice_items_horse"
            columns: ["horse_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_invoice_items_invoice"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          client_id: string | null
          created_at: string | null
          created_by: string | null
          discount_amount: number | null
          due_date: string
          id: string
          invoice_date: string
          invoice_number: string
          notes: string | null
          paid_amount: number | null
          payment_terms: string | null
          status: string
          subtotal: number
          tax_amount: number | null
          tenant_id: string
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          discount_amount?: number | null
          due_date: string
          id?: string
          invoice_date?: string
          invoice_number: string
          notes?: string | null
          paid_amount?: number | null
          payment_terms?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number | null
          tenant_id: string
          total_amount?: number
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          discount_amount?: number | null
          due_date?: string
          id?: string
          invoice_date?: string
          invoice_number?: string
          notes?: string | null
          paid_amount?: number | null
          payment_terms?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number | null
          tenant_id?: string
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_invoices_client"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_invoices_tenant"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      laboratory_equipment: {
        Row: {
          attachments: Json | null
          calibration_due: string | null
          category: string
          cost: number | null
          created_at: string | null
          created_by: string | null
          equipment_number: string
          id: string
          last_maintenance: string | null
          location: string | null
          maintenance_history: Json | null
          maintenance_interval_days: number | null
          manufacturer: string | null
          model: string | null
          name: string
          next_maintenance: string | null
          operating_instructions: string | null
          purchase_date: string | null
          safety_notes: string | null
          serial_number: string | null
          specifications: Json | null
          status: string
          tenant_id: string
          updated_at: string | null
          usage_log: Json | null
          warranty_expiry: string | null
        }
        Insert: {
          attachments?: Json | null
          calibration_due?: string | null
          category: string
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          equipment_number: string
          id?: string
          last_maintenance?: string | null
          location?: string | null
          maintenance_history?: Json | null
          maintenance_interval_days?: number | null
          manufacturer?: string | null
          model?: string | null
          name: string
          next_maintenance?: string | null
          operating_instructions?: string | null
          purchase_date?: string | null
          safety_notes?: string | null
          serial_number?: string | null
          specifications?: Json | null
          status?: string
          tenant_id: string
          updated_at?: string | null
          usage_log?: Json | null
          warranty_expiry?: string | null
        }
        Update: {
          attachments?: Json | null
          calibration_due?: string | null
          category?: string
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          equipment_number?: string
          id?: string
          last_maintenance?: string | null
          location?: string | null
          maintenance_history?: Json | null
          maintenance_interval_days?: number | null
          manufacturer?: string | null
          model?: string | null
          name?: string
          next_maintenance?: string | null
          operating_instructions?: string | null
          purchase_date?: string | null
          safety_notes?: string | null
          serial_number?: string | null
          specifications?: Json | null
          status?: string
          tenant_id?: string
          updated_at?: string | null
          usage_log?: Json | null
          warranty_expiry?: string | null
        }
        Relationships: []
      }
      laboratory_quality_control: {
        Row: {
          actual_results: Json
          attachments: Json | null
          control_date: string
          control_type: string
          corrective_actions: string | null
          created_at: string | null
          created_by: string | null
          deviation_notes: string | null
          equipment_used: string[] | null
          expected_results: Json
          id: string
          operator: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          tenant_id: string
          test_type: string
          updated_at: string | null
        }
        Insert: {
          actual_results: Json
          attachments?: Json | null
          control_date: string
          control_type: string
          corrective_actions?: string | null
          created_at?: string | null
          created_by?: string | null
          deviation_notes?: string | null
          equipment_used?: string[] | null
          expected_results: Json
          id?: string
          operator: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          tenant_id: string
          test_type: string
          updated_at?: string | null
        }
        Update: {
          actual_results?: Json
          attachments?: Json | null
          control_date?: string
          control_type?: string
          corrective_actions?: string | null
          created_at?: string | null
          created_by?: string | null
          deviation_notes?: string | null
          equipment_used?: string[] | null
          expected_results?: Json
          id?: string
          operator?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          tenant_id?: string
          test_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      laboratory_samples: {
        Row: {
          attachments: Json | null
          client_contact: Json | null
          client_name: string | null
          collected_by: string
          collection_date: string
          collection_time: string | null
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          horse_id: string | null
          horse_name: string
          id: string
          notes: string | null
          person_who_brought: string
          previous_sample_id: string | null
          priority: string
          processing_started_at: string | null
          required_analysis: string[] | null
          sample_number: string
          sample_receipt_date: string | null
          sample_type: string
          selected_templates: string[] | null
          status: string
          storage_location: string | null
          storage_temperature: string | null
          tenant_id: string
          updated_at: string | null
          volume_amount: number | null
          volume_unit: string | null
        }
        Insert: {
          attachments?: Json | null
          client_contact?: Json | null
          client_name?: string | null
          collected_by: string
          collection_date: string
          collection_time?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          horse_id?: string | null
          horse_name: string
          id?: string
          notes?: string | null
          person_who_brought: string
          previous_sample_id?: string | null
          priority?: string
          processing_started_at?: string | null
          required_analysis?: string[] | null
          sample_number: string
          sample_receipt_date?: string | null
          sample_type: string
          selected_templates?: string[] | null
          status?: string
          storage_location?: string | null
          storage_temperature?: string | null
          tenant_id: string
          updated_at?: string | null
          volume_amount?: number | null
          volume_unit?: string | null
        }
        Update: {
          attachments?: Json | null
          client_contact?: Json | null
          client_name?: string | null
          collected_by?: string
          collection_date?: string
          collection_time?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          horse_id?: string | null
          horse_name?: string
          id?: string
          notes?: string | null
          person_who_brought?: string
          previous_sample_id?: string | null
          priority?: string
          processing_started_at?: string | null
          required_analysis?: string[] | null
          sample_number?: string
          sample_receipt_date?: string | null
          sample_type?: string
          selected_templates?: string[] | null
          status?: string
          storage_location?: string | null
          storage_temperature?: string | null
          tenant_id?: string
          updated_at?: string | null
          volume_amount?: number | null
          volume_unit?: string | null
        }
        Relationships: []
      }
      laboratory_templates: {
        Row: {
          category: string
          cost: number | null
          created_at: string | null
          created_by: string | null
          equipment_required: string[] | null
          estimated_duration_minutes: number | null
          id: string
          is_active: boolean | null
          methodology: string | null
          name_ar: string | null
          name_en: string
          normal_ranges: Json | null
          parameters: Json | null
          sample_type: string | null
          template_type: string
          tenant_id: string
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          category: string
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          equipment_required?: string[] | null
          estimated_duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          methodology?: string | null
          name_ar?: string | null
          name_en: string
          normal_ranges?: Json | null
          parameters?: Json | null
          sample_type?: string | null
          template_type: string
          tenant_id: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          category?: string
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          equipment_required?: string[] | null
          estimated_duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          methodology?: string | null
          name_ar?: string | null
          name_en?: string
          normal_ranges?: Json | null
          parameters?: Json | null
          sample_type?: string | null
          template_type?: string
          tenant_id?: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      laboratory_test_requests: {
        Row: {
          attachments: Json | null
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          estimated_completion: string | null
          horse_name: string
          id: string
          notes: string | null
          priority: string
          request_date: string
          request_number: string
          requested_by: string
          sample_id: string
          status: string
          tenant_id: string
          test_type: string
          updated_at: string | null
        }
        Insert: {
          attachments?: Json | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          estimated_completion?: string | null
          horse_name: string
          id?: string
          notes?: string | null
          priority?: string
          request_date: string
          request_number: string
          requested_by: string
          sample_id: string
          status?: string
          tenant_id: string
          test_type: string
          updated_at?: string | null
        }
        Update: {
          attachments?: Json | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          estimated_completion?: string | null
          horse_name?: string
          id?: string
          notes?: string | null
          priority?: string
          request_date?: string
          request_number?: string
          requested_by?: string
          sample_id?: string
          status?: string
          tenant_id?: string
          test_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "laboratory_test_requests_sample_id_fkey"
            columns: ["sample_id"]
            isOneToOne: false
            referencedRelation: "laboratory_samples"
            referencedColumns: ["id"]
          },
        ]
      }
      laboratory_test_results: {
        Row: {
          attachments: Json | null
          client_name: string
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          equipment_used: string[] | null
          estimated_completion: string | null
          horse_name: string
          id: string
          interpretation: string | null
          methodology: string | null
          normal_ranges: Json | null
          notes: string | null
          parameters: Json | null
          priority: string
          quality_control_passed: boolean | null
          recommendations: string | null
          result_number: string
          reviewed_at: string | null
          reviewed_by: string | null
          sample_id: string
          status: string
          technician: string
          template_id: string | null
          tenant_id: string
          test_date: string
          test_type: string
          updated_at: string | null
        }
        Insert: {
          attachments?: Json | null
          client_name: string
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          equipment_used?: string[] | null
          estimated_completion?: string | null
          horse_name: string
          id?: string
          interpretation?: string | null
          methodology?: string | null
          normal_ranges?: Json | null
          notes?: string | null
          parameters?: Json | null
          priority?: string
          quality_control_passed?: boolean | null
          recommendations?: string | null
          result_number: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          sample_id: string
          status?: string
          technician: string
          template_id?: string | null
          tenant_id: string
          test_date: string
          test_type: string
          updated_at?: string | null
        }
        Update: {
          attachments?: Json | null
          client_name?: string
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          equipment_used?: string[] | null
          estimated_completion?: string | null
          horse_name?: string
          id?: string
          interpretation?: string | null
          methodology?: string | null
          normal_ranges?: Json | null
          notes?: string | null
          parameters?: Json | null
          priority?: string
          quality_control_passed?: boolean | null
          recommendations?: string | null
          result_number?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          sample_id?: string
          status?: string
          technician?: string
          template_id?: string | null
          tenant_id?: string
          test_date?: string
          test_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "laboratory_test_results_sample_id_fkey"
            columns: ["sample_id"]
            isOneToOne: false
            referencedRelation: "laboratory_samples"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "laboratory_test_results_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "laboratory_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_alerts: {
        Row: {
          acknowledged_at: string | null
          acknowledged_by: string | null
          alert_type: string
          auto_generated: boolean | null
          created_at: string | null
          created_by: string | null
          description: string | null
          due_date: string | null
          horse_id: string
          id: string
          related_record_id: string | null
          related_record_type: string | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string
          status: string
          tenant_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type: string
          auto_generated?: boolean | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          horse_id: string
          id?: string
          related_record_id?: string | null
          related_record_type?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          status?: string
          tenant_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type?: string
          auto_generated?: boolean | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          horse_id?: string
          id?: string
          related_record_id?: string | null
          related_record_type?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          status?: string
          tenant_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_medical_alerts_horse"
            columns: ["horse_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_medical_alerts_tenant"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          cost: number | null
          created_at: string | null
          created_by: string | null
          dosage: string
          end_date: string | null
          frequency: string
          health_record_id: string | null
          horse_id: string
          id: string
          instructions: string | null
          medication_name: string
          medication_type: string
          prescribed_by: string
          reason_for_treatment: string | null
          route_of_administration: string | null
          side_effects: string | null
          start_date: string
          status: string
          tenant_id: string
          updated_at: string | null
          veterinarian_id: string | null
        }
        Insert: {
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          dosage: string
          end_date?: string | null
          frequency: string
          health_record_id?: string | null
          horse_id: string
          id?: string
          instructions?: string | null
          medication_name: string
          medication_type: string
          prescribed_by: string
          reason_for_treatment?: string | null
          route_of_administration?: string | null
          side_effects?: string | null
          start_date: string
          status?: string
          tenant_id: string
          updated_at?: string | null
          veterinarian_id?: string | null
        }
        Update: {
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          dosage?: string
          end_date?: string | null
          frequency?: string
          health_record_id?: string | null
          horse_id?: string
          id?: string
          instructions?: string | null
          medication_name?: string
          medication_type?: string
          prescribed_by?: string
          reason_for_treatment?: string | null
          route_of_administration?: string | null
          side_effects?: string | null
          start_date?: string
          status?: string
          tenant_id?: string
          updated_at?: string | null
          veterinarian_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_medications_health_record"
            columns: ["health_record_id"]
            isOneToOne: false
            referencedRelation: "health_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_medications_horse"
            columns: ["horse_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_medications_tenant"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_medications_veterinarian"
            columns: ["veterinarian_id"]
            isOneToOne: false
            referencedRelation: "veterinarians"
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
      paddock_assignments: {
        Row: {
          actual_end_date: string | null
          assigned_by: string
          assigned_date: string
          assignment_type: string | null
          created_at: string | null
          horse_id: string
          horse_name: string
          id: string
          notes: string | null
          paddock_id: string
          reason: string | null
          scheduled_end_date: string | null
          status: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          actual_end_date?: string | null
          assigned_by: string
          assigned_date?: string
          assignment_type?: string | null
          created_at?: string | null
          horse_id: string
          horse_name: string
          id?: string
          notes?: string | null
          paddock_id: string
          reason?: string | null
          scheduled_end_date?: string | null
          status?: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          actual_end_date?: string | null
          assigned_by?: string
          assigned_date?: string
          assignment_type?: string | null
          created_at?: string | null
          horse_id?: string
          horse_name?: string
          id?: string
          notes?: string | null
          paddock_id?: string
          reason?: string | null
          scheduled_end_date?: string | null
          status?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "paddock_assignments_paddock_id_fkey"
            columns: ["paddock_id"]
            isOneToOne: false
            referencedRelation: "paddocks"
            referencedColumns: ["id"]
          },
        ]
      }
      paddock_maintenance: {
        Row: {
          assigned_to: string | null
          completed_date: string | null
          cost: number | null
          created_at: string | null
          created_by: string | null
          description: string
          id: string
          maintenance_type: string
          next_maintenance_date: string | null
          notes: string | null
          paddock_id: string
          scheduled_date: string
          status: string
          tenant_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          completed_date?: string | null
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          description: string
          id?: string
          maintenance_type: string
          next_maintenance_date?: string | null
          notes?: string | null
          paddock_id: string
          scheduled_date: string
          status?: string
          tenant_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          completed_date?: string | null
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string
          id?: string
          maintenance_type?: string
          next_maintenance_date?: string | null
          notes?: string | null
          paddock_id?: string
          scheduled_date?: string
          status?: string
          tenant_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "paddock_maintenance_paddock_id_fkey"
            columns: ["paddock_id"]
            isOneToOne: false
            referencedRelation: "paddocks"
            referencedColumns: ["id"]
          },
        ]
      }
      paddock_rotation_plans: {
        Row: {
          automatic_rotation: boolean | null
          created_at: string | null
          created_by: string | null
          end_date: string | null
          id: string
          name: string
          notifications: Json | null
          paddock_ids: string[]
          rest_period: number
          rotation_interval: number
          start_date: string
          status: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          automatic_rotation?: boolean | null
          created_at?: string | null
          created_by?: string | null
          end_date?: string | null
          id?: string
          name: string
          notifications?: Json | null
          paddock_ids: string[]
          rest_period?: number
          rotation_interval: number
          start_date: string
          status?: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          automatic_rotation?: boolean | null
          created_at?: string | null
          created_by?: string | null
          end_date?: string | null
          id?: string
          name?: string
          notifications?: Json | null
          paddock_ids?: string[]
          rest_period?: number
          rotation_interval?: number
          start_date?: string
          status?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      paddocks: {
        Row: {
          capacity: number
          created_at: string | null
          created_by: string | null
          current_occupancy: number
          features: Json | null
          id: string
          location_coordinates: Json | null
          location_section: string | null
          name: string
          paddock_number: string
          paddock_type: string
          size_length: number | null
          size_unit: string | null
          size_width: number | null
          status: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          capacity?: number
          created_at?: string | null
          created_by?: string | null
          current_occupancy?: number
          features?: Json | null
          id?: string
          location_coordinates?: Json | null
          location_section?: string | null
          name: string
          paddock_number: string
          paddock_type?: string
          size_length?: number | null
          size_unit?: string | null
          size_width?: number | null
          status?: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          capacity?: number
          created_at?: string | null
          created_by?: string | null
          current_occupancy?: number
          features?: Json | null
          id?: string
          location_coordinates?: Json | null
          location_section?: string | null
          name?: string
          paddock_number?: string
          paddock_type?: string
          size_length?: number | null
          size_unit?: string | null
          size_width?: number | null
          status?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          account_details: Json | null
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          name: string
          tenant_id: string
          type: string
          updated_at: string | null
        }
        Insert: {
          account_details?: Json | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name: string
          tenant_id: string
          type: string
          updated_at?: string | null
        }
        Update: {
          account_details?: Json | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name?: string
          tenant_id?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          created_by: string | null
          gateway_response: Json | null
          id: string
          invoice_id: string | null
          notes: string | null
          payment_date: string
          payment_method_id: string | null
          reference_number: string | null
          status: string
          tenant_id: string
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          created_by?: string | null
          gateway_response?: Json | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_date?: string
          payment_method_id?: string | null
          reference_number?: string | null
          status?: string
          tenant_id: string
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          created_by?: string | null
          gateway_response?: Json | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_date?: string
          payment_method_id?: string | null
          reference_number?: string | null
          status?: string
          tenant_id?: string
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_payments_invoice"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_payments_method"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
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
      purchase_order_items: {
        Row: {
          created_at: string | null
          description: string
          id: string
          item_id: string | null
          line_total: number
          purchase_order_id: string
          quantity: number
          received_quantity: number | null
          unit_cost: number
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          item_id?: string | null
          line_total: number
          purchase_order_id: string
          quantity: number
          received_quantity?: number | null
          unit_cost: number
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          item_id?: string | null
          line_total?: number
          purchase_order_id?: string
          quantity?: number
          received_quantity?: number | null
          unit_cost?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_purchase_order_items_item"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_purchase_order_items_po"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_orders: {
        Row: {
          created_at: string | null
          created_by: string | null
          expected_delivery_date: string | null
          id: string
          notes: string | null
          order_date: string
          po_number: string
          status: string
          subtotal: number
          supplier_contact: Json | null
          supplier_name: string
          tax_amount: number | null
          tenant_id: string
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          expected_delivery_date?: string | null
          id?: string
          notes?: string | null
          order_date?: string
          po_number: string
          status?: string
          subtotal?: number
          supplier_contact?: Json | null
          supplier_name: string
          tax_amount?: number | null
          tenant_id: string
          total_amount?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          expected_delivery_date?: string | null
          id?: string
          notes?: string | null
          order_date?: string
          po_number?: string
          status?: string
          subtotal?: number
          supplier_contact?: Json | null
          supplier_name?: string
          tax_amount?: number | null
          tenant_id?: string
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_purchase_orders_tenant"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      recurring_schedules: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          horse_id: string | null
          id: string
          is_active: boolean | null
          location: string | null
          recurrence_data: Json | null
          recurrence_pattern: string
          schedule_type: string
          start_date: string
          tenant_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          horse_id?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          recurrence_data?: Json | null
          recurrence_pattern: string
          schedule_type: string
          start_date: string
          tenant_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          horse_id?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          recurrence_data?: Json | null
          recurrence_pattern?: string
          schedule_type?: string
          start_date?: string
          tenant_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_recurring_schedules_employee"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_recurring_schedules_horse"
            columns: ["horse_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_recurring_schedules_tenant"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      recurring_transactions: {
        Row: {
          account_id: string | null
          amount: number
          auto_generate: boolean | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          frequency: string
          id: string
          name: string
          next_occurrence: string | null
          start_date: string
          status: string
          tenant_id: string
          transaction_type: string
          updated_at: string | null
        }
        Insert: {
          account_id?: string | null
          amount: number
          auto_generate?: boolean | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          frequency: string
          id?: string
          name: string
          next_occurrence?: string | null
          start_date: string
          status?: string
          tenant_id: string
          transaction_type: string
          updated_at?: string | null
        }
        Update: {
          account_id?: string | null
          amount?: number
          auto_generate?: boolean | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          frequency?: string
          id?: string
          name?: string
          next_occurrence?: string | null
          start_date?: string
          status?: string
          tenant_id?: string
          transaction_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_recurring_account"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "financial_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      report_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          parameters: Json | null
          report_type: string
          template_data: Json
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parameters?: Json | null
          report_type: string
          template_data?: Json
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parameters?: Json | null
          report_type?: string
          template_data?: Json
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_report_templates_tenant"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
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
      tasks: {
        Row: {
          actual_duration: number | null
          assigned_to: string | null
          completed_date: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          due_date: string | null
          estimated_duration: number | null
          id: string
          notes: string | null
          priority: string
          related_entity_id: string | null
          related_entity_type: string | null
          status: string
          task_type: string
          tenant_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          actual_duration?: number | null
          assigned_to?: string | null
          completed_date?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          estimated_duration?: number | null
          id?: string
          notes?: string | null
          priority?: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          status?: string
          task_type: string
          tenant_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          actual_duration?: number | null
          assigned_to?: string | null
          completed_date?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          estimated_duration?: number | null
          id?: string
          notes?: string | null
          priority?: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          status?: string
          task_type?: string
          tenant_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_tasks_employee"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_tasks_tenant"
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
      trainers: {
        Row: {
          availability_schedule: Json | null
          bio: string | null
          certifications: string[] | null
          created_at: string | null
          created_by: string | null
          email: string | null
          emergency_contact: Json | null
          experience_years: number | null
          first_name: string
          hourly_rate: number | null
          id: string
          last_name: string
          phone: string | null
          profile_image_url: string | null
          specializations: string[] | null
          status: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          availability_schedule?: Json | null
          bio?: string | null
          certifications?: string[] | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          emergency_contact?: Json | null
          experience_years?: number | null
          first_name: string
          hourly_rate?: number | null
          id?: string
          last_name: string
          phone?: string | null
          profile_image_url?: string | null
          specializations?: string[] | null
          status?: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          availability_schedule?: Json | null
          bio?: string | null
          certifications?: string[] | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          emergency_contact?: Json | null
          experience_years?: number | null
          first_name?: string
          hourly_rate?: number | null
          id?: string
          last_name?: string
          phone?: string | null
          profile_image_url?: string | null
          specializations?: string[] | null
          status?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      training_assessments: {
        Row: {
          areas_for_improvement: string[] | null
          assessment_date: string
          assessment_type: string
          attachments: Json | null
          categories: Json
          created_at: string | null
          created_by: string | null
          goals_met: boolean | null
          horse_id: string
          id: string
          next_assessment_date: string | null
          notes: string | null
          overall_score: number | null
          program_id: string | null
          recommendations: string[] | null
          session_count: number | null
          strengths: string[] | null
          tenant_id: string
          trainer_id: string | null
          updated_at: string | null
        }
        Insert: {
          areas_for_improvement?: string[] | null
          assessment_date: string
          assessment_type: string
          attachments?: Json | null
          categories?: Json
          created_at?: string | null
          created_by?: string | null
          goals_met?: boolean | null
          horse_id: string
          id?: string
          next_assessment_date?: string | null
          notes?: string | null
          overall_score?: number | null
          program_id?: string | null
          recommendations?: string[] | null
          session_count?: number | null
          strengths?: string[] | null
          tenant_id: string
          trainer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          areas_for_improvement?: string[] | null
          assessment_date?: string
          assessment_type?: string
          attachments?: Json | null
          categories?: Json
          created_at?: string | null
          created_by?: string | null
          goals_met?: boolean | null
          horse_id?: string
          id?: string
          next_assessment_date?: string | null
          notes?: string | null
          overall_score?: number | null
          program_id?: string | null
          recommendations?: string[] | null
          session_count?: number | null
          strengths?: string[] | null
          tenant_id?: string
          trainer_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_assessments_horse"
            columns: ["horse_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assessments_program"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "training_programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assessments_trainer"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainers"
            referencedColumns: ["id"]
          },
        ]
      }
      training_facilities: {
        Row: {
          booking_rules: Json | null
          capacity: number
          created_at: string | null
          created_by: string | null
          dimensions: string | null
          equipment_available: string[] | null
          facility_type: string
          features: string[] | null
          hourly_rate: number | null
          id: string
          location_details: string | null
          maintenance_schedule: Json | null
          name: string
          status: string
          surface_type: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          booking_rules?: Json | null
          capacity?: number
          created_at?: string | null
          created_by?: string | null
          dimensions?: string | null
          equipment_available?: string[] | null
          facility_type: string
          features?: string[] | null
          hourly_rate?: number | null
          id?: string
          location_details?: string | null
          maintenance_schedule?: Json | null
          name: string
          status?: string
          surface_type?: string | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          booking_rules?: Json | null
          capacity?: number
          created_at?: string | null
          created_by?: string | null
          dimensions?: string | null
          equipment_available?: string[] | null
          facility_type?: string
          features?: string[] | null
          hourly_rate?: number | null
          id?: string
          location_details?: string | null
          maintenance_schedule?: Json | null
          name?: string
          status?: string
          surface_type?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      training_programs: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          discipline: string
          duration_weeks: number
          id: string
          intensity_level: string
          max_participants: number | null
          name: string
          objectives: string[] | null
          prerequisites: string[] | null
          pricing: Json | null
          program_type: string
          schedule_template: Json | null
          status: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          discipline: string
          duration_weeks?: number
          id?: string
          intensity_level?: string
          max_participants?: number | null
          name: string
          objectives?: string[] | null
          prerequisites?: string[] | null
          pricing?: Json | null
          program_type: string
          schedule_template?: Json | null
          status?: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          discipline?: string
          duration_weeks?: number
          id?: string
          intensity_level?: string
          max_participants?: number | null
          name?: string
          objectives?: string[] | null
          prerequisites?: string[] | null
          pricing?: Json | null
          program_type?: string
          schedule_template?: Json | null
          status?: string
          tenant_id?: string
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
      transaction_entries: {
        Row: {
          account_id: string
          created_at: string | null
          credit_amount: number | null
          debit_amount: number | null
          description: string | null
          id: string
          transaction_id: string
        }
        Insert: {
          account_id: string
          created_at?: string | null
          credit_amount?: number | null
          debit_amount?: number | null
          description?: string | null
          id?: string
          transaction_id: string
        }
        Update: {
          account_id?: string
          created_at?: string | null
          credit_amount?: number | null
          debit_amount?: number | null
          description?: string | null
          id?: string
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_entries_account"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "financial_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_entries_transaction"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "financial_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      vaccinations: {
        Row: {
          administered_by: string
          batch_number: string | null
          certificate_number: string | null
          cost: number | null
          created_at: string | null
          created_by: string | null
          dose_amount: string | null
          horse_id: string
          id: string
          manufacturer: string | null
          next_due_date: string | null
          reaction_notes: string | null
          site_of_injection: string | null
          status: string
          tenant_id: string
          updated_at: string | null
          vaccination_date: string
          vaccine_name: string
          vaccine_type: string
          veterinarian_id: string | null
        }
        Insert: {
          administered_by: string
          batch_number?: string | null
          certificate_number?: string | null
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          dose_amount?: string | null
          horse_id: string
          id?: string
          manufacturer?: string | null
          next_due_date?: string | null
          reaction_notes?: string | null
          site_of_injection?: string | null
          status?: string
          tenant_id: string
          updated_at?: string | null
          vaccination_date: string
          vaccine_name: string
          vaccine_type: string
          veterinarian_id?: string | null
        }
        Update: {
          administered_by?: string
          batch_number?: string | null
          certificate_number?: string | null
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          dose_amount?: string | null
          horse_id?: string
          id?: string
          manufacturer?: string | null
          next_due_date?: string | null
          reaction_notes?: string | null
          site_of_injection?: string | null
          status?: string
          tenant_id?: string
          updated_at?: string | null
          vaccination_date?: string
          vaccine_name?: string
          vaccine_type?: string
          veterinarian_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_vaccinations_horse"
            columns: ["horse_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_vaccinations_tenant"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_vaccinations_veterinarian"
            columns: ["veterinarian_id"]
            isOneToOne: false
            referencedRelation: "veterinarians"
            referencedColumns: ["id"]
          },
        ]
      }
      veterinarians: {
        Row: {
          address: Json | null
          clinic_name: string | null
          consultation_fee: number | null
          created_at: string | null
          created_by: string | null
          email: string | null
          emergency_contact: boolean | null
          id: string
          license_number: string | null
          name: string
          notes: string | null
          phone: string | null
          specialty: string | null
          status: string
          tenant_id: string
          travel_fee: number | null
          updated_at: string | null
        }
        Insert: {
          address?: Json | null
          clinic_name?: string | null
          consultation_fee?: number | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          emergency_contact?: boolean | null
          id?: string
          license_number?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          specialty?: string | null
          status?: string
          tenant_id: string
          travel_fee?: number | null
          updated_at?: string | null
        }
        Update: {
          address?: Json | null
          clinic_name?: string | null
          consultation_fee?: number | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          emergency_contact?: boolean | null
          id?: string
          license_number?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          specialty?: string | null
          status?: string
          tenant_id?: string
          travel_fee?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_veterinarians_tenant"
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
