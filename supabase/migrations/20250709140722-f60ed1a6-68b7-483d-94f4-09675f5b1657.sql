-- Add missing laboratory templates for hormone and parasite testing

INSERT INTO public.laboratory_templates (
  id, 
  tenant_id,
  name_en, 
  name_ar, 
  category, 
  template_type,
  sample_type, 
  methodology, 
  estimated_duration_minutes,
  parameters, 
  normal_ranges,
  is_active, 
  created_at, 
  updated_at
) VALUES 
-- Hormone Panel Template
(
  'hormone-template',
  '550e8400-e29b-41d4-a716-446655440004',
  'Hormone Panel',
  'فحص الهرمونات',
  'Endocrinology',
  'diagnostic',
  'Serum',
  'Immunoassay',
  360,
  '[
    {
      "id": 10,
      "nameEn": "Estradiol",
      "nameAr": "الإستراديول",
      "unit": "pg/mL",
      "dataType": "numeric"
    },
    {
      "id": 11,
      "nameEn": "Progesterone",
      "nameAr": "البروجستيرون",
      "unit": "ng/mL",
      "dataType": "numeric"
    },
    {
      "id": 12,
      "nameEn": "Testosterone",
      "nameAr": "التستوستيرون",
      "unit": "ng/mL",
      "dataType": "numeric"
    },
    {
      "id": 13,
      "nameEn": "Cortisol",
      "nameAr": "الكورتيزول",
      "unit": "μg/dL",
      "dataType": "numeric"
    },
    {
      "id": 14,
      "nameEn": "LH",
      "nameAr": "الهرمون المنشط للجسم الأصفر",
      "unit": "mIU/mL",
      "dataType": "numeric"
    },
    {
      "id": 15,
      "nameEn": "FSH",
      "nameAr": "الهرمون المنشط للجريب",
      "unit": "mIU/mL",
      "dataType": "numeric"
    }
  ]'::jsonb,
  '{
    "Estradiol": {"min": "15", "max": "100", "criticalLow": "5", "criticalHigh": "300"},
    "Progesterone": {"min": "0.5", "max": "20", "criticalLow": "0.1", "criticalHigh": "50"},
    "Testosterone": {"min": "0.1", "max": "2.0", "criticalLow": "0.05", "criticalHigh": "5.0"},
    "Cortisol": {"min": "2", "max": "15", "criticalLow": "0.5", "criticalHigh": "30"},
    "LH": {"min": "0.5", "max": "15", "criticalLow": "0.1", "criticalHigh": "50"},
    "FSH": {"min": "1", "max": "20", "criticalLow": "0.1", "criticalHigh": "100"}
  }'::jsonb,
  true,
  now(),
  now()
),
-- Parasite Screen Template  
(
  'parasite-template',
  '550e8400-e29b-41d4-a716-446655440004',
  'Parasite Screen',
  'فحص الطفيليات',
  'Parasitology',
  'diagnostic',
  'Feces',
  'Microscopy',
  240,
  '[
    {
      "id": 16,
      "nameEn": "Strongyle Eggs",
      "nameAr": "بيض الديدان القوية",
      "unit": "EPG",
      "dataType": "numeric"
    },
    {
      "id": 17,
      "nameEn": "Ascarid Eggs", 
      "nameAr": "بيض الديدان الأسكاريدية",
      "unit": "EPG",
      "dataType": "numeric"
    },
    {
      "id": 18,
      "nameEn": "Tapeworm Segments",
      "nameAr": "قطع الديدان الشريطية", 
      "unit": "Present/Absent",
      "dataType": "text"
    },
    {
      "id": 19,
      "nameEn": "Pinworm Eggs",
      "nameAr": "بيض الديدان الدبوسية",
      "unit": "EPG", 
      "dataType": "numeric"
    },
    {
      "id": 20,
      "nameEn": "Coccidia Oocysts",
      "nameAr": "أكياس الكوكسيديا",
      "unit": "OPG",
      "dataType": "numeric"
    }
  ]'::jsonb,
  '{
    "Strongyle Eggs": {"min": "0", "max": "200", "criticalLow": "0", "criticalHigh": "1000"},
    "Ascarid Eggs": {"min": "0", "max": "50", "criticalLow": "0", "criticalHigh": "500"},
    "Tapeworm Segments": {"min": "Absent", "max": "Absent", "criticalLow": "Present", "criticalHigh": "Present"},
    "Pinworm Eggs": {"min": "0", "max": "20", "criticalLow": "0", "criticalHigh": "200"},
    "Coccidia Oocysts": {"min": "0", "max": "100", "criticalLow": "0", "criticalHigh": "1000"}
  }'::jsonb,
  true,
  now(), 
  now()
)
ON CONFLICT (id) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_ar = EXCLUDED.name_ar,
  category = EXCLUDED.category,
  template_type = EXCLUDED.template_type,
  sample_type = EXCLUDED.sample_type,
  methodology = EXCLUDED.methodology,
  estimated_duration_minutes = EXCLUDED.estimated_duration_minutes,
  parameters = EXCLUDED.parameters,
  normal_ranges = EXCLUDED.normal_ranges,
  updated_at = now();