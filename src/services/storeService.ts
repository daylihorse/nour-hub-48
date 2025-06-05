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
  ];

  private sales: Sale[] = [];

  // Product methods
  getProducts(department?: string): StoreProduct[] {
    return department 
      ? this.products.filter(p => p.department === department && p.isActive)
      : this.products.filter(p => p.isActive);
  }

  getProductById(id: string): StoreProduct | undefined {
    return this.products.find(p => p.id === id);
  }

  addProduct(product: Omit<StoreProduct, 'id' | 'createdAt' | 'updatedAt'>): StoreProduct {
    const newProduct: StoreProduct = {
      ...product,
      id: `prod_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<StoreProduct>): StoreProduct | null {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    this.products[index] = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date(),
    };
    return this.products[index];
  }

  // Service methods
  getServices(department?: string): StoreServiceType[] {
    return department
      ? this.services.filter(s => s.department === department && s.isActive)
      : this.services.filter(s => s.isActive);
  }

  getServiceById(id: string): StoreServiceType | undefined {
    return this.services.find(s => s.id === id);
  }

  addService(service: Omit<StoreServiceType, 'id' | 'createdAt' | 'updatedAt'>): StoreServiceType {
    const newService: StoreServiceType = {
      ...service,
      id: `serv_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.services.push(newService);
    return newService;
  }

  updateService(id: string, updates: Partial<StoreServiceType>): StoreServiceType | null {
    const index = this.services.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    this.services[index] = {
      ...this.services[index],
      ...updates,
      updatedAt: new Date(),
    };
    return this.services[index];
  }

  // Sales methods
  recordSale(sale: Omit<Sale, 'id' | 'saleDate'>): Sale {
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
          this.updateProduct(item.id, { 
            stock: product.stock - item.quantity 
          });
        }
      }
    });
    
    return newSale;
  }

  getSales(department?: string): Sale[] {
    return department
      ? this.sales.filter(s => s.department === department)
      : this.sales;
  }

  getSalesStats(department?: string) {
    const relevantSales = this.getSales(department);
    const today = new Date();
    const thisMonth = relevantSales.filter(s => 
      s.saleDate.getMonth() === today.getMonth() &&
      s.saleDate.getFullYear() === today.getFullYear()
    );

    return {
      totalSales: relevantSales.reduce((sum, sale) => sum + sale.total, 0),
      monthlySales: thisMonth.reduce((sum, sale) => sum + sale.total, 0),
      totalTransactions: relevantSales.length,
      monthlyTransactions: thisMonth.length,
    };
  }
}

export const storeService = new StoreManagementService();
