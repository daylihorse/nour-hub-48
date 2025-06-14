
interface MockUser {
  id: string;
  email: string;
  user_metadata?: {
    first_name?: string;
    last_name?: string;
  };
}

interface MockSession {
  user: MockUser;
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

class MockAuthService {
  private currentUser: MockUser | null = null;
  private currentSession: MockSession | null = null;
  private users: Map<string, { password: string; user: MockUser }> = new Map();
  private authCallbacks: Array<(event: string, session: MockSession | null) => void> = [];

  constructor() {
    // Initialize with sample users
    this.initializeSampleUsers();
    
    // Check for existing session in localStorage
    const savedSession = localStorage.getItem('mock_auth_session');
    if (savedSession) {
      try {
        this.currentSession = JSON.parse(savedSession);
        this.currentUser = this.currentSession?.user || null;
      } catch (error) {
        console.error('Error loading saved session:', error);
        localStorage.removeItem('mock_auth_session');
      }
    }
  }

  private initializeSampleUsers() {
    const sampleUsers = [
      { email: 'owner@eliteequestrian.com', password: 'password123', firstName: 'Elite', lastName: 'Owner' },
      { email: 'manager@eliteequestrian.com', password: 'password123', firstName: 'Elite', lastName: 'Manager' },
      { email: 'owner@sunsetstables.com', password: 'password123', firstName: 'Sunset', lastName: 'Owner' },
      { email: 'director@advancedvetclinic.com', password: 'password123', firstName: 'Clinic', lastName: 'Director' },
      { email: 'director@equinediagnostics.com', password: 'password123', firstName: 'Lab', lastName: 'Director' },
      { email: 'admin@regionalequinehospital.com', password: 'password123', firstName: 'Hospital', lastName: 'Admin' },
      { email: 'admin@horsetrader.com', password: 'password123', firstName: 'Trader', lastName: 'Admin' },
      { email: 'ceo@globalequinesolutions.com', password: 'password123', firstName: 'Global', lastName: 'CEO' }
    ];

    sampleUsers.forEach(user => {
      const mockUser: MockUser = {
        id: this.generateId(),
        email: user.email,
        user_metadata: {
          first_name: user.firstName,
          last_name: user.lastName
        }
      };
      this.users.set(user.email, { password: user.password, user: mockUser });
    });
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private createSession(user: MockUser): MockSession {
    return {
      user,
      access_token: 'mock_access_token_' + this.generateId(),
      refresh_token: 'mock_refresh_token_' + this.generateId(),
      expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
  }

  private saveSession(session: MockSession | null) {
    if (session) {
      localStorage.setItem('mock_auth_session', JSON.stringify(session));
    } else {
      localStorage.removeItem('mock_auth_session');
    }
  }

  private notifyAuthChange(event: string, session: MockSession | null) {
    this.authCallbacks.forEach(callback => {
      try {
        callback(event, session);
      } catch (error) {
        console.error('Error in auth callback:', error);
      }
    });
  }

  async signInWithPassword(email: string, password: string) {
    console.log('Mock sign in attempt:', email);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userRecord = this.users.get(email);
    if (!userRecord || userRecord.password !== password) {
      const error = new Error('Invalid email or password');
      console.error('Mock sign in failed:', error.message);
      return { data: { user: null, session: null }, error };
    }

    const session = this.createSession(userRecord.user);
    this.currentUser = userRecord.user;
    this.currentSession = session;
    this.saveSession(session);
    
    console.log('Mock sign in successful:', email);
    this.notifyAuthChange('SIGNED_IN', session);
    
    return { data: { user: userRecord.user, session }, error: null };
  }

  async signUp(email: string, password: string, options?: { data?: any }) {
    console.log('Mock sign up attempt:', email);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (this.users.has(email)) {
      const error = new Error('User already exists');
      console.error('Mock sign up failed:', error.message);
      return { data: { user: null, session: null }, error };
    }

    const mockUser: MockUser = {
      id: this.generateId(),
      email,
      user_metadata: options?.data || {}
    };

    this.users.set(email, { password, user: mockUser });
    
    const session = this.createSession(mockUser);
    this.currentUser = mockUser;
    this.currentSession = session;
    this.saveSession(session);
    
    console.log('Mock sign up successful:', email);
    this.notifyAuthChange('SIGNED_UP', session);
    
    return { data: { user: mockUser, session }, error: null };
  }

  async signOut() {
    console.log('Mock sign out');
    
    this.currentUser = null;
    this.currentSession = null;
    this.saveSession(null);
    
    this.notifyAuthChange('SIGNED_OUT', null);
    
    return { error: null };
  }

  async getSession() {
    return { 
      data: { 
        session: this.currentSession 
      }, 
      error: null 
    };
  }

  async getUser() {
    return { 
      data: { 
        user: this.currentUser 
      }, 
      error: null 
    };
  }

  onAuthStateChange(callback: (event: string, session: MockSession | null) => void) {
    this.authCallbacks.push(callback);
    
    return {
      data: {
        subscription: {
          unsubscribe: () => {
            const index = this.authCallbacks.indexOf(callback);
            if (index > -1) {
              this.authCallbacks.splice(index, 1);
            }
          }
        }
      }
    };
  }
}

export const mockAuthService = new MockAuthService();
