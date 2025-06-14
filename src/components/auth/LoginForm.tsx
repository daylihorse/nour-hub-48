
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import DevLoginHelper from './DevLoginHelper';
import SignUpForm from './SignUpForm';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await login(email, password);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: 'Login Failed',
            description: 'Invalid email or password. Please check your credentials and try again.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Login Failed',
            description: error.message || 'An unexpected error occurred',
            variant: 'destructive',
          });
        }
        return;
      }

      if (data.user) {
        toast({
          title: 'Success',
          description: 'Logged in successfully',
        });
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchToSignUp = () => {
    setActiveTab('signup');
  };

  const handleSwitchToLogin = () => {
    setActiveTab('login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="dev-helper">Dev Accounts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card className="w-full max-w-md mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Welcome to EquiSense</CardTitle>
                <CardDescription>
                  Sign in to your account to continue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
                
                <Separator className="my-4" />
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={handleSwitchToSignUp}
                      className="text-primary hover:underline font-medium"
                    >
                      Sign up here
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <SignUpForm onSwitchToLogin={handleSwitchToLogin} />
          </TabsContent>
          
          <TabsContent value="dev-helper">
            <DevLoginHelper />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginForm;
