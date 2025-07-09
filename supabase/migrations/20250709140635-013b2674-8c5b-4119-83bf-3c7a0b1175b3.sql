-- Add missing laboratory templates for hormone and parasite testing

INSERT INTO public.laboratory_templates (
  id, 
  template_number, 
  name_en, 
  name_ar, 
  category, 
  sample_type, 
  methodology, 
  turnaround_time, 
  parameters_count, 
  parameters, 
  is_active, 
  tenant_id, 
  created_at, 
  updated_at
) VALUES 
-- Hormone Panel Template
(
  'hormone-template',
  'LAB-TEMP-005',
  'Hormone Panel',
  'فحص الهرمونات',
  'Endocrinology',
  'Serum',
  'Immunoassay',
  '6 hours',
  6,
  '[
    {
      "id": 10,
      "nameEn": "Estradiol",
      "nameAr": "الإستراديول",
      "unit": "pg/mL",
      "dataType": "numeric",
      "normalRangeMin": "15",
      "normalRangeMax": "100",
      "criticalLow": "5",
      "criticalHigh": "300"
    },
    {
      "id": 11,
      "nameEn": "Progesterone",
      "nameAr": "البروجستيرون",
      "unit": "ng/mL",
      "dataType": "numeric",
      "normalRangeMin": "0.5",
      "normalRangeMax": "20",
      "criticalLow": "0.1",
      "criticalHigh": "50"
    },
    {
      "id": 12,
      "nameEn": "Testosterone",
      "nameAr": "التستوستيرون",
      "unit": "ng/mL",
      "dataType": "numeric",
      "normalRangeMin": "0.1",
      "normalRangeMax": "2.0",
      "criticalLow": "0.05",
      "criticalHigh": "5.0"
    },
    {
      "id": 13,
      "nameEn": "Cortisol",
      "nameAr": "الكورتيزول",
      "unit": "μg/dL",
      "dataType": "numeric",
      "normalRangeMin": "2",
      "normalRangeMax": "15",
      "criticalLow": "0.5",
      "criticalHigh": "30"
    },
    {
      "id": 14,
      "nameEn": "LH",
      "nameAr": "الهرمون المنشط للجسم الأصفر",
      "unit": "mIU/mL",
      "dataType": "numeric",
      "normalRangeMin": "0.5",
      "normalRangeMax": "15",
      "criticalLow": "0.1",
      "criticalHigh": "50"
    },
    {
      "id": 15,
      "nameEn": "FSH",
      "nameAr": "الهرمون المنشط للجريب",
      "unit": "mIU/mL",
      "dataType": "numeric",
      "normalRangeMin": "1",
      "normalRangeMax": "20",
      "criticalLow": "0.1",
      "criticalHigh": "100"
    }
  ]'::jsonb,
  true,
  '550e8400-e29b-41d4-a716-446655440004',
  now(),
  now()
),
-- Parasite Screen Template  
(
  'parasite-template',
  'LAB-TEMP-006', 
  'Parasite Screen',
  'فحص الطفيليات',
  'Parasitology',
  'Feces',
  'Microscopy',
  '4 hours',
  5,
  '[
    {
      "id": 16,
      "nameEn": "Strongyle Eggs",
      "nameAr": "بيض الديدان القوية",
      "unit": "EPG",
      "dataType": "numeric", 
      "normalRangeMin": "0",
      "normalRangeMax": "200",
      "criticalLow": "0",
      "criticalHigh": "1000"
    },
    {
      "id": 17,
      "nameEn": "Ascarid Eggs", 
      "nameAr": "بيض الديدان الأسكاريدية",
      "unit": "EPG",
      "dataType": "numeric",
      "normalRangeMin": "0", 
      "normalRangeMax": "50",
      "criticalLow": "0",
      "criticalHigh": "500"
    },
    {
      "id": 18,
      "nameEn": "Tapeworm Segments",
      "nameAr": "قطع الديدان الشريطية", 
      "unit": "Present/Absent",
      "dataType": "text",
      "normalRangeMin": "Absent",
      "normalRangeMax": "Absent", 
      "criticalLow": "Present",
      "criticalHigh": "Present"
    },
    {
      "id": 19,
      "nameEn": "Pinworm Eggs",
      "nameAr": "بيض الديدان الدبوسية",
      "unit": "EPG", 
      "dataType": "numeric",
      "normalRangeMin": "0",
      "normalRangeMax": "20",
      "criticalLow": "0", 
      "criticalHigh": "200"
    },
    {
      "id": 20,
      "nameEn": "Coccidia Oocysts",
      "nameAr": "أكياس الكوكسيديا",
      "unit": "OPG",
      "dataType": "numeric",
      "normalRangeMin": "0",
      "normalRangeMax": "100", 
      "criticalLow": "0",
      "criticalHigh": "1000"
    }
  ]'::jsonb,
  true,
  '550e8400-e29b-41d4-a716-446655440004',
  now(), 
  now()
)
ON CONFLICT (id) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_ar = EXCLUDED.name_ar,
  category = EXCLUDED.category,
  sample_type = EXCLUDED.sample_type,
  methodology = EXCLUDED.methodology,
  turnaround_time = EXCLUDED.turnaround_time,
  parameters_count = EXCLUDED.parameters_count,
  parameters = EXCLUDED.parameters,
  updated_at = now();