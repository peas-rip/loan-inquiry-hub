export interface LoanApplication {
  id: string;
  name: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  loanCategory: string;
  submittedAt: string;
}

export interface AdminCredentials {
  email: string;
  password: string;
}

const STORAGE_KEYS = {
  APPLICATIONS: 'loan_applications',
  ADMIN: 'admin_credentials'
};

// Default admin credentials
const DEFAULT_ADMIN: AdminCredentials = {
  email: 'admin@loanapp.com',
  password: 'admin123'
};

export const storage = {
  // Loan Applications
  getApplications(): LoanApplication[] {
    const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return data ? JSON.parse(data) : [];
  },

  saveApplication(application: Omit<LoanApplication, 'id' | 'submittedAt'>): LoanApplication {
    const applications = this.getApplications();
    const newApplication: LoanApplication = {
      ...application,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString()
    };
    applications.push(newApplication);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    return newApplication;
  },

  getApplicationById(id: string): LoanApplication | undefined {
    return this.getApplications().find(app => app.id === id);
  },

  // Admin Credentials
  getAdminCredentials(): AdminCredentials {
    const data = localStorage.getItem(STORAGE_KEYS.ADMIN);
    return data ? JSON.parse(data) : DEFAULT_ADMIN;
  },

  updateAdminCredentials(credentials: AdminCredentials): void {
    localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(credentials));
  },

  verifyAdmin(email: string, password: string): boolean {
    const admin = this.getAdminCredentials();
    return admin.email === email && admin.password === password;
  }
};
