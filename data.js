/**
 * SMART CYLINDER BOOKING SYSTEM - DATA ENGINE
 * Persistent storage manager using LocalStorage with rich seed datasets.
 * Project by: Avanya Sinha, Chanchal Goyal, Mansi Kumari, Deepshikha Kumari, Kashish Kumari
 */

const STORAGE_KEYS = {
  USERS: 'sc_users',
  ADMINS: 'sc_admins',
  CYLINDERS: 'sc_cylinders',
  BOOKINGS: 'sc_bookings',
  PAYMENTS: 'sc_payments',
  CURRENT_USER: 'sc_current_user',
  CURRENT_ADMIN: 'sc_current_admin'
};

const SEED_DATA = {
  admins: [
    {
      adminId: 1,
      username: 'admin',
      password: 'admin123',
      fullName: 'System Administrator',
      email: 'admin@smartcylinder.com',
      role: 'SUPER_ADMIN'
    },
    {
      adminId: 2,
      username: 'manager',
      password: 'manager123',
      fullName: 'Operations Manager',
      email: 'manager@smartcylinder.com',
      role: 'MANAGER'
    }
  ],
  cylinders: [
    {
      cylinderId: 1,
      cylinderType: 'Domestic LPG (Subsidized)',
      weightKg: 14.2,
      price: 850,
      subsidyAmount: 200,
      stockQuantity: 145,
      description: 'Standard domestic gas cylinder for household cooking with direct bank DBT subsidy benefit.',
      icon: '🛢️',
      popular: true
    },
    {
      cylinderId: 2,
      cylinderType: 'Domestic LPG (Non-Subsidized)',
      weightKg: 14.2,
      price: 1050,
      subsidyAmount: 0,
      stockQuantity: 180,
      description: 'Non-subsidized standard domestic cylinder for multiple connections or commercial home usage.',
      icon: '🛢️',
      popular: false
    },
    {
      cylinderId: 3,
      cylinderType: 'Commercial LPG Cylinder',
      weightKg: 19.0,
      price: 1850,
      subsidyAmount: 0,
      stockQuantity: 68,
      description: 'Heavy duty high-pressure cylinder designed for restaurants, canteens, dhabas and catering.',
      icon: '🏭',
      popular: false
    },
    {
      cylinderId: 4,
      cylinderType: 'Chhotu Mini Cylinder',
      weightKg: 5.0,
      price: 390,
      subsidyAmount: 0,
      stockQuantity: 92,
      description: 'Handy and portable 5kg cylinder without address proof requirement. Ideal for bachelors & students.',
      icon: '🎒',
      popular: false
    },
    {
      cylinderId: 5,
      cylinderType: 'Industrial Jumbo Cylinder',
      weightKg: 47.5,
      price: 4550,
      subsidyAmount: 0,
      stockQuantity: 25,
      description: 'Massive capacity 47.5kg cylinder for industrial plants, commercial bakeries, and large hotels.',
      icon: '🏢',
      popular: false
    }
  ],
  users: [
    {
      userId: 1,
      consumerNo: 'LPG-10029384',
      fullName: 'Rahul Sharma',
      email: 'rahul@gmail.com',
      password: 'user123',
      phone: '9876543210',
      address: 'Flat 402, Shanti Vihar Apartments, Civil Lines',
      city: 'Delhi',
      pincode: '110054',
      distributorName: 'Bharat Petroleum City Gas Agency',
      subsidyEligible: true,
      createdAt: '2026-01-15T10:00:00Z'
    },
    {
      userId: 2,
      consumerNo: 'LPG-10029385',
      fullName: 'Priya Patel',
      email: 'priya@gmail.com',
      password: 'user123',
      phone: '9812345678',
      address: 'House No. 12, Green Park Extension',
      city: 'Jaipur',
      pincode: '302016',
      distributorName: 'Indane Gas Regional Distributor',
      subsidyEligible: true,
      createdAt: '2026-02-10T12:30:00Z'
    }
  ],
  bookings: [
    {
      bookingId: 1,
      bookingReference: 'BK-2026-9041',
      userId: 1,
      cylinderId: 1,
      cylinderType: 'Domestic LPG (Subsidized)',
      weightKg: 14.2,
      bookingDate: '2026-10-24T09:30:00Z',
      expectedDeliveryDate: '2026-10-26',
      actualDeliveryDate: '2026-10-26T14:15:00Z',
      deliveryAddress: 'Flat 402, Shanti Vihar Apartments, Civil Lines, Delhi',
      status: 'DELIVERED',
      paymentStatus: 'PAID',
      paymentMethod: 'UPI',
      subsidyOpted: true,
      basePrice: 850,
      subsidyDiscount: 200,
      deliveryCharge: 50,
      totalAmount: 700,
      driverName: 'Ramesh Kumar',
      driverPhone: '9876012345'
    },
    {
      bookingId: 2,
      bookingReference: 'BK-2026-9042',
      userId: 1,
      cylinderId: 1,
      cylinderType: 'Domestic LPG (Subsidized)',
      weightKg: 14.2,
      bookingDate: '2026-10-29T11:20:00Z',
      expectedDeliveryDate: '2026-10-31',
      actualDeliveryDate: null,
      deliveryAddress: 'Flat 402, Shanti Vihar Apartments, Civil Lines, Delhi',
      status: 'OUT_FOR_DELIVERY',
      paymentStatus: 'PAID',
      paymentMethod: 'CARD',
      subsidyOpted: true,
      basePrice: 850,
      subsidyDiscount: 200,
      deliveryCharge: 50,
      totalAmount: 700,
      driverName: 'Suresh Yadav',
      driverPhone: '9876098765'
    },
    {
      bookingId: 3,
      bookingReference: 'BK-2026-9043',
      userId: 2,
      cylinderId: 4,
      cylinderType: 'Chhotu Mini Cylinder',
      weightKg: 5.0,
      bookingDate: '2026-10-30T08:00:00Z',
      expectedDeliveryDate: '2026-11-01',
      actualDeliveryDate: null,
      deliveryAddress: 'House No. 12, Green Park Extension, Jaipur',
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
      paymentMethod: 'UPI',
      subsidyOpted: false,
      basePrice: 390,
      subsidyDiscount: 0,
      deliveryCharge: 50,
      totalAmount: 440,
      driverName: 'Amit Verma',
      driverPhone: '9876054321'
    }
  ]
};

// Database Access Object (Client DAO)
const DB = {
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_DATA.users));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ADMINS)) {
      localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(SEED_DATA.admins));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CYLINDERS)) {
      localStorage.setItem(STORAGE_KEYS.CYLINDERS, JSON.stringify(SEED_DATA.cylinders));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(SEED_DATA.bookings));
    }
  },

  // Users
  getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  },

  getUserByEmail(email) {
    return this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  getUserById(id) {
    return this.getUsers().find(u => u.userId === parseInt(id));
  },

  saveUser(userData) {
    const users = this.getUsers();
    userData.userId = Date.now();
    users.push(userData);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return userData;
  },

  updateUser(updatedUser) {
    const users = this.getUsers().map(u => u.userId === updatedUser.userId ? updatedUser : u);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    // also update current session if same
    const current = this.getCurrentUser();
    if (current && current.userId === updatedUser.userId) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser));
    }
  },

  // Admins
  getAdmins() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ADMINS) || '[]');
  },

  // Cylinders
  getCylinders() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CYLINDERS) || '[]');
  },

  getCylinderById(id) {
    return this.getCylinders().find(c => c.cylinderId === parseInt(id));
  },

  updateCylinder(c) {
    const list = this.getCylinders().map(item => item.cylinderId === c.cylinderId ? c : item);
    localStorage.setItem(STORAGE_KEYS.CYLINDERS, JSON.stringify(list));
  },

  decrementStock(cylinderId, qty = 1) {
    const cylinders = this.getCylinders();
    const item = cylinders.find(c => c.cylinderId === cylinderId);
    if (item && item.stockQuantity >= qty) {
      item.stockQuantity -= qty;
      localStorage.setItem(STORAGE_KEYS.CYLINDERS, JSON.stringify(cylinders));
      return true;
    }
    return false;
  },

  // Bookings
  getBookings() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]');
  },

  getBookingsByUserId(userId) {
    return this.getBookings().filter(b => b.userId === parseInt(userId)).sort((a,b) => new Date(b.bookingDate) - new Date(a.bookingDate));
  },

  getBookingByReference(ref) {
    return this.getBookings().find(b => b.bookingReference === ref);
  },

  createBooking(booking) {
    const bookings = this.getBookings();
    booking.bookingId = Date.now();
    bookings.unshift(booking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    return booking;
  },

  updateBookingStatus(bookingId, newStatus, driverName, driverPhone) {
    const bookings = this.getBookings().map(b => {
      if (b.bookingId === parseInt(bookingId)) {
        b.status = newStatus;
        if (driverName) b.driverName = driverName;
        if (driverPhone) b.driverPhone = driverPhone;
        if (newStatus === 'DELIVERED') {
          b.actualDeliveryDate = new Date().toISOString();
        }
      }
      return b;
    });
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  },

  cancelBooking(bookingId) {
    const bookings = this.getBookings().map(b => {
      if (b.bookingId === parseInt(bookingId)) {
        b.status = 'CANCELLED';
      }
      return b;
    });
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  },

  // Auth Sessions
  getCurrentUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 'null');
  },

  setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },

  getCurrentAdmin() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_ADMIN) || 'null');
  },

  setCurrentAdmin(admin) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_ADMIN, JSON.stringify(admin));
  },

  logoutUser() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  logoutAdmin() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_ADMIN);
  },

  // Aggregated Analytics
  getDashboardStats() {
    const users = this.getUsers();
    const bookings = this.getBookings();
    const cylinders = this.getCylinders();

    const totalUsers = users.length;
    const totalBookings = bookings.length;
    const pendingDeliveries = bookings.filter(b => ['PENDING', 'CONFIRMED', 'DISPATCHED', 'OUT_FOR_DELIVERY'].includes(b.status)).length;
    const deliveredCount = bookings.filter(b => b.status === 'DELIVERED').length;
    const totalRevenue = bookings.filter(b => b.paymentStatus === 'PAID').reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    const totalStock = cylinders.reduce((sum, c) => sum + (c.stockQuantity || 0), 0);

    return {
      totalUsers,
      totalBookings,
      pendingDeliveries,
      deliveredCount,
      totalRevenue,
      totalStock
    };
  }
};

// Initialize DB on script load
DB.init();
