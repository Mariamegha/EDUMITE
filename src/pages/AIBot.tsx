import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { chatWithGemini } from '@/lib/gemini';
import { TranslatedText } from '@/components/TranslatedText';
import { useTranslatedText } from '@/hooks/useTranslation';
import { Sparkles, Send, Mic, Volume2, Languages, Loader2 } from 'lucide-react';
import SpotlightCard from '@/components/3D/SpotlightCard';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const placeholderText = useTranslatedText('Ask me anything...');

  const suggestions = [
    'Explain quantum physics',
    'Help me with calculus',
    'Create a study plan',
    'Quiz me on history',
  ];

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithGemini([...messages, userMessage]);
      const aiMessage: Message = {
        role: 'assistant',
        content: response,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to get AI response. Please try again.',
        variant: 'destructive',
      });
      // Add error message to chat
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or rephrase your question.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-deepblack">
      <div className="container mx-auto h-[calc(100vh-6rem)] px-4 py-6">
      <div className="grid h-full gap-6 lg:grid-cols-[1fr_300px]">
        {/* Chat Area */}
        <Card className="flex flex-col border-4 border-black shadow-pink-brutal">
          <div className="flex items-center justify-between border-b-4 border-pink p-4 bg-obsidian">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-pink" />
              <h1 className="text-2xl font-black uppercase text-gold"><TranslatedText text="AI Study Assistant" /></h1>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" title="Translate" className="text-gold hover:bg-gold/20">
                <Languages className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" title="Read aloud" className="text-pink hover:bg-pink/20">
                <Volume2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4 bg-obsidian">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-white">
                    <Sparkles className="mx-auto mb-4 h-16 w-16 text-gold" />
                    <p className="text-2xl font-black uppercase text-gold mb-2"><TranslatedText text="Start a conversation" /></p>
                    <p className="text-lg font-bold text-white/70"><TranslatedText text="Ask me anything about your studies!" /></p>
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-6 py-4 border-2 border-black ${
                        message.role === 'user'
                          ? 'bg-gold text-black shadow-gold-heavy font-bold'
                          : 'bg-pink text-white shadow-pink-heavy font-bold'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </ScrollArea>

          <div className="border-t-4 border-gold p-4 bg-obsidian">
            <div className="flex gap-2">
              <Input
                placeholder={placeholderText}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                disabled={isLoading}
                className="border-2 border-gold font-bold text-white placeholder:text-white/50 bg-black/50 focus-visible:ring-gold focus-visible:ring-2"
              />
              <Button 
                size="icon" 
                variant="ghost" 
                disabled={isLoading}
                className="border-2 border-gold bg-gold/20 text-gold hover:bg-gold hover:text-black font-black"
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Button 
                size="icon" 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()}
                className="border-2 border-pink bg-pink text-white hover:bg-pink/80 shadow-pink-heavy font-black"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Suggestions Sidebar */}
        <div className="hidden lg:block space-y-4">
          <SpotlightCard spotlightColor="rgba(255, 215, 0, 0.3)">
          <Card className="p-6 border-4 border-black shadow-gold-brutal bg-obsidian">
            <h3 className="mb-4 text-xl font-black uppercase text-gold"><TranslatedText text="Quick Prompts" /></h3>
            <div className="space-y-3">
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  className="w-full justify-start text-left border-2 border-gold text-gold hover:bg-gold hover:text-black font-bold shadow-gold-medium"
                  onClick={() => setInput(suggestion)}
                >
                  <TranslatedText text={suggestion} />
                </Button>
              ))}
            </div>
          </Card>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(255, 20, 147, 0.3)">
          <Card className="p-6 border-4 border-black shadow-pink-brutal bg-obsidian">
            <h3 className="mb-3 text-xl font-black uppercase text-pink"><TranslatedText text="Pro Tips" /></h3>
            <ul className="space-y-3 text-sm text-white font-bold">
              <li className="flex items-start gap-2">
                <span className="text-gold">•</span>
                <TranslatedText text="Be specific with your questions" />
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold">•</span>
                <TranslatedText text="Ask for examples or explanations" />
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold">•</span>
                <TranslatedText text="Request step-by-step solutions" />
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold">•</span>
                <TranslatedText text="Use voice input for faster queries" />
              </li>
            </ul>
          </Card>
          </SpotlightCard>
        </div>
      </div>
      </div>
    </div>
  );
}
