import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { signIn } from '@/services/authService';
import { TranslatedText } from '@/components/TranslatedText';
import { Mail, Lock, Sparkles } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { user, error } = await signIn({ email, password });

    if (error) {
      toast({
        title: 'Sign in failed',
        description: error,
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    if (user) {
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
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
            <Sparkles className="h-8 w-8 text-gold" />
            <span className="text-gold">ED</span>
            <span className="text-pink">URA</span>
          </Link>
        </div>

        <Card className="shadow-gold-brutal">
          <CardHeader className="border-b-4 border-gold">
            <CardTitle className="text-3xl font-black uppercase text-gold"><TranslatedText text="Welcome Back" /></CardTitle>
            <CardDescription className="text-white/70 font-bold"><TranslatedText text="Sign in to continue your learning journey" /></CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gold font-bold uppercase text-sm"><TranslatedText text="Email" /></Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gold" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@edura.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-2 border-gold bg-obsidian text-white shadow-medium focus:shadow-heavy"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gold font-bold uppercase text-sm"><TranslatedText text="Password" /></Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gold" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-2 border-gold bg-obsidian text-white shadow-medium focus:shadow-heavy"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full text-lg py-6" disabled={isLoading}>
                {isLoading ? <TranslatedText text="Signing in..." /> : <TranslatedText text="Sign In" />}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-white/70 font-bold"><TranslatedText text="Don't have an account?" /></span>{' '}
              <Link to="/register" className="text-pink hover:text-gold font-black uppercase">
                <TranslatedText text="Sign up" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
