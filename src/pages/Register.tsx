import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { signUp } from '@/services/authService';
import { TranslatedText } from '@/components/TranslatedText';
import { Mail, Lock, User, Sparkles } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const { user, error } = await signUp({ email, password, name });

    if (error) {
      toast({
        title: 'Registration failed',
        description: error,
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    if (user) {
      toast({
        title: 'Account created!',
        description: 'Welcome to Edumite! Let\'s get you started.',
      });
      navigate('/dashboard');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-deepblack">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-4xl font-black uppercase">
            <Sparkles className="h-8 w-8 text-pink" />
            <span className="text-gold">EDU</span>
            <span className="text-pink">MITE</span>
          </Link>
        </div>

        <Card className="shadow-pink-brutal">
          <CardHeader className="border-b-4 border-pink">
            <CardTitle className="text-3xl font-black uppercase text-pink"><TranslatedText text="Create Account" /></CardTitle>
            <CardDescription className="text-white/70 font-bold"><TranslatedText text="Start your learning journey today" /></CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-pink font-bold uppercase text-sm"><TranslatedText text="Full Name" /></Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-pink" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 border-2 border-pink bg-obsidian text-white shadow-medium focus:shadow-heavy"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-pink font-bold uppercase text-sm"><TranslatedText text="Email" /></Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-pink" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@edumite.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-2 border-pink bg-obsidian text-white shadow-medium focus:shadow-heavy"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-pink font-bold uppercase text-sm"><TranslatedText text="Password" /></Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-pink" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-2 border-pink bg-obsidian text-white shadow-medium focus:shadow-heavy"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full text-lg py-6" disabled={isLoading}>
                {isLoading ? <TranslatedText text="Creating account..." /> : <TranslatedText text="Create Account" />}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-white/70 font-bold"><TranslatedText text="Already have an account?" /></span>{' '}
              <Link to="/login" className="text-gold hover:text-pink font-black uppercase">
                <TranslatedText text="Sign in" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
