import { StoreProduct, StoreService as StoreServiceType, Sale, CartItem } from '@/types/store';

class StoreManagementService {
  private products: StoreProduct[] = [
    {
      id: 'prod_1',
      name: 'Premium Chia Seeds',
      description: 'High-quality organic chia seeds for horse nutrition',
      price: 25.99,
      category: 'Feed Materials',
      department: 'inventory',
      stock: 50,
      images: ['🌱'],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prod_2',
      name: 'Horse Vitamins',
      description: 'Essential vitamins for horse health',
      price: 35.50,
      category: 'Medical Supplies',
      department: 'inventory',
      stock: 25,
      images: ['💊'],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prod_3',
      name: 'Orniboral',
      description: 'Veterinary medicine for respiratory health',
      price: 45.00,
      category: 'Medical Supplies',
      department: 'clinic',
      stock: 15,
      images: ['💊'],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prod_4',
      name: 'Laboratory Test Strips',
      description: 'High-precision test strips for laboratory analysis',
      price: 85.00,
      category: 'Laboratory Equipment',
      department: 'laboratory',
      stock: 30,
      images: ['🧪'],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prod_5',
      name: 'Marketplace Special Item',
      description: 'Exclusive marketplace product for testing',
      price: 199.99,
      category: 'Marketplace Exclusive',
      department: 'marketplace',
      stock: 10,
      images: ['🏪'],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prod_6',
      name: 'Riding Helmet',
      description: 'Safety helmet for horse riding',
      price: 89.99,
      category: 'Safety Equipment',
      department: 'academy',
      stock: 20,
      images: ['🪖'],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prod_7',
      name: 'Horse Saddle',
      description: 'Professional riding saddle',
      price: 450.00,
      category: 'Riding Equipment',
      department: 'academy',
      stock: 5,
      images: ['🏇'],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  private services: StoreServiceType[] = [
    {
      id: 'serv_1',
      name: 'Wound Stitching Service',
      description: 'Professional wound stitching service by certified veterinarians',
      price: 150.00,
      category: 'Veterinary Services',
      department: 'clinic',
      duration: 45,
      isActive: true,
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'serv_2',
      name: 'Blood Test Analysis',
      description: 'Comprehensive blood analysis with detailed report',
      price: 75.00,
      category: 'Laboratory Services',
      department: 'laboratory',
      duration: 30,
      isActive: true,
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: false,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'serv_3',
      name: 'Inventory Consultation',
      description: 'Professional consultation on inventory management and optimization',
      price: 120.00,
      category: 'Consultation Services',
      department: 'inventory',
      duration: 60,
      isActive: true,
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'serv_4',
      name: 'Marketplace Consultation',
      description: 'Expert guidance on marketplace operations and sales strategies',
      price: 200.00,
      category: 'Business Services',
      department: 'marketplace',
      duration: 90,
      isActive: true,
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: false,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'serv_5',
      name: 'Horse Riding Lesson',
      description: 'Professional horse riding instruction for all skill levels',
      price: 75.00,
      category: 'Training Services',
      department: 'academy',
      duration: 60,
      isActive: true,
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'serv_6',
      name: 'Horse Training Session',
      description: 'Advanced training session for competitive riding',
      price: 120.00,
      category: 'Training Services',
      department: 'academy',
      duration: 90,
      isActive: true,
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  private sales: Sale[] = [];

  constructor() {
    console.log('StoreManagementService initialized');
    console.log('Products loaded:', this.products.length);
    console.log('Services loaded:', this.services.length);
  }

  // Product methods
  getProducts(department?: string): StoreProduct[] {
    console.log('getProducts called with department:', department);
    const result = department 
      ? this.products.filter(p => p.department === department && p.isActive)
      : this.products.filter(p => p.isActive);
    console.log('Products returned:', result.length);
    return result;
  }

  getProductById(id: string): StoreProduct | undefined {
    console.log('getProductById called with id:', id);
    const result = this.products.find(p => p.id === id);
    console.log('Product found:', result ? result.name : 'Not found');
    return result;
  }

  addProduct(product: Omit<StoreProduct, 'id' | 'createdAt' | 'updatedAt'>): StoreProduct {
    console.log('addProduct called:', product.name);
    const newProduct: StoreProduct = {
      ...product,
      id: `prod_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(newProduct);
    console.log('Product added successfully:', newProduct.id);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<StoreProduct>): StoreProduct | null {
    console.log('updateProduct called for id:', id);
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      console.log('Product not found for update:', id);
      return null;
    }
    
    this.products[index] = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date(),
    };
    console.log('Product updated successfully:', this.products[index].name);
    return this.products[index];
  }

  // Service methods
  getServices(department?: string): StoreServiceType[] {
    console.log('getServices called with department:', department);
    const result = department
      ? this.services.filter(s => s.department === department && s.isActive)
      : this.services.filter(s => s.isActive);
    console.log('Services returned:', result.length);
    return result;
  }

  getServiceById(id: string): StoreServiceType | undefined {
    console.log('getServiceById called with id:', id);
    const result = this.services.find(s => s.id === id);
    console.log('Service found:', result ? result.name : 'Not found');
    return result;
  }

  addService(service: Omit<StoreServiceType, 'id' | 'createdAt' | 'updatedAt'>): StoreServiceType {
    console.log('addService called:', service.name);
    const newService: StoreServiceType = {
      ...service,
      id: `serv_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.services.push(newService);
    console.log('Service added successfully:', newService.id);
    return newService;
  }

  updateService(id: string, updates: Partial<StoreServiceType>): StoreServiceType | null {
    console.log('updateService called for id:', id);
    const index = this.services.findIndex(s => s.id === id);
    if (index === -1) {
      console.log('Service not found for update:', id);
      return null;
    }
    
    this.services[index] = {
      ...this.services[index],
      ...updates,
      updatedAt: new Date(),
    };
    console.log('Service updated successfully:', this.services[index].name);
    return this.services[index];
  }

  // Sales methods
  recordSale(sale: Omit<Sale, 'id' | 'saleDate'>): Sale {
    console.log('recordSale called for department:', sale.department);
    console.log('Sale items:', sale.items.length);
    const newSale: Sale = {
      ...sale,
      id: `sale_${Date.now()}`,
      saleDate: new Date(),
    };
    this.sales.push(newSale);
    
    // Update stock for products
    sale.items.forEach(item => {
      if (item.type === 'product') {
        const product = this.getProductById(item.id);
        if (product) {
          console.log(`Updating stock for ${product.name}: ${product.stock} -> ${product.stock - item.quantity}`);
          this.updateProduct(item.id, { 
            stock: product.stock - item.quantity 
          });
        }
      }
    });
    
    console.log('Sale recorded successfully:', newSale.id, 'Total:', newSale.total);
    return newSale;
  }

  getSales(department?: string): Sale[] {
    console.log('getSales called with department:', department);
    const result = department
      ? this.sales.filter(s => s.department === department)
      : this.sales;
    console.log('Sales returned:', result.length);
    return result;
  }

  getSalesStats(department?: string) {
    console.log('getSalesStats called with department:', department);
    const relevantSales = this.getSales(department);
    const today = new Date();
    const thisMonth = relevantSales.filter(s => 
      s.saleDate.getMonth() === today.getMonth() &&
      s.saleDate.getFullYear() === today.getFullYear()
    );

    const stats = {
      totalSales: relevantSales.reduce((sum, sale) => sum + sale.total, 0),
      monthlySales: thisMonth.reduce((sum, sale) => sum + sale.total, 0),
      totalTransactions: relevantSales.length,
      monthlyTransactions: thisMonth.length,
    };
    
    console.log('Sales stats:', stats);
    return stats;
  }
}

export const storeService = new StoreManagementService();
