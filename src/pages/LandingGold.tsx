import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Cubes from '@/components/3D/Cubes';
import { Brain, Zap, Target, Users, Globe, Sparkles } from 'lucide-react';

export default function LandingGold() {
  return (
    <div className="min-h-screen bg-deepblack text-white">
      {/* HERO SECTION WITH CUBES */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* CUBES BACKGROUND */}
        <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
          <Cubes
            gridSize={8}
            maxAngle={60}
            radius={4}
            borderStyle="2px solid #FFD700"
            faceColor="#1a1a2e"
            rippleColor="#FF1493"
            rippleSpeed={1.5}
            autoAnimate={true}
            rippleOnClick={false}
          />
        </div>

        {/* HERO CONTENT - ASYMMETRIC BRUTAL LAYOUT */}
        <div className="relative z-10 container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT: MASSIVE TEXT BLOCK */}
            <div className="space-y-8">
              <div className="inline-block border-4 border-gold bg-obsidian px-6 py-3 shadow-gold-brutal rotate-[-2deg]">
                <span className="text-pink font-black uppercase text-sm tracking-widest">AI-Powered Learning</span>
              </div>
              
              <h1 className="text-7xl lg:text-9xl font-black uppercase leading-none tracking-tighter">
                <span className="block text-gold drop-shadow-[4px_4px_0px_#000]">Learn</span>
                <span className="block text-pink drop-shadow-[4px_4px_0px_#000] mt-4">Faster</span>
                <span className="block text-white drop-shadow-[4px_4px_0px_#000] mt-4">Win</span>
              </h1>

              <p className="text-2xl font-bold text-white/80 max-w-md border-l-4 border-pink pl-6">
                The most BRUTAL learning platform. AI-powered. Gamified. Unstoppable.
              </p>

              <div className="flex gap-6 flex-wrap">
                <Button size="lg" className="text-lg px-12 py-8 text-xl" asChild>
                  <Link to="/register">START NOW</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-12 py-8 text-xl" asChild>
                  <Link to="/login">LOGIN</Link>
                </Button>
              </div>
            </div>

            {/* RIGHT: STACKED STATS CARDS */}
            <div className="space-y-6">
              {[
                { number: '10K+', label: 'Active Learners', color: 'gold' },
                { number: '500+', label: 'AI Courses', color: 'pink' },
                { number: '24/7', label: 'AI Support', color: 'gold' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`border-4 border-black bg-obsidian p-8 shadow-${stat.color}-brutal transform hover:translate-x-[-4px] hover:translate-y-[-4px] transition-transform cursor-pointer`}
                  style={{ transform: `rotate(${i % 2 === 0 ? '1deg' : '-1deg'})` }}
                >
                  <div className={`text-6xl font-black text-${stat.color}`}>{stat.number}</div>
                  <div className="text-xl font-bold text-white uppercase mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - BRUTAL GRID */}
      <section className="py-32 bg-obsidian border-y-8 border-black relative overflow-hidden" id="features">
        <div className="container mx-auto px-6">
          <h2 className="text-7xl font-black uppercase text-center mb-20">
            <span className="text-gold">Power</span>{' '}
            <span className="text-pink">Features</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-16 h-16" />,
                title: 'AI ASSISTANT',
                desc: 'Get instant help from our advanced AI tutor',
                accent: 'gold',
              },
              {
                icon: <Zap className="w-16 h-16" />,
                title: 'GAMIFIED XP',
                desc: 'Level up, earn badges, dominate leaderboards',
                accent: 'pink',
              },
              {
                icon: <Target className="w-16 h-16" />,
                title: 'SMART ROADMAPS',
                desc: 'AI-generated learning paths for your goals',
                accent: 'gold',
              },
              {
                icon: <Users className="w-16 h-16" />,
                title: 'STUDY GROUPS',
                desc: 'Collaborate and learn with your squad',
                accent: 'pink',
              },
              {
                icon: <Globe className="w-16 h-16" />,
                title: '100+ LANGUAGES',
                desc: 'Learn in your native language',
                accent: 'gold',
              },
              {
                icon: <Sparkles className="w-16 h-16" />,
                title: 'ACCESSIBLE',
                desc: 'Dyslexia-friendly, colorblind mode, screen reader',
                accent: 'pink',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`
                  border-4 border-black bg-deepblack p-8
                  shadow-${feature.accent}-heavy
                  hover:shadow-${feature.accent}-brutal
                  hover:translate-x-[-2px] hover:translate-y-[-2px]
                  transition-all cursor-pointer group
                `}
              >
                <div className={`text-${feature.accent} mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className={`text-2xl font-black uppercase text-${feature.accent} mb-3`}>
                  {feature.title}
                </h3>
                <p className="text-white/70 font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION - MASSIVE */}
      <section className="py-32 bg-gold relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-8xl font-black uppercase text-black mb-8 drop-shadow-[4px_4px_0px_#FF1493]">
            Ready to WIN?
          </h2>
          <p className="text-2xl font-bold text-black/80 mb-12 max-w-2xl mx-auto">
            Join thousands of learners crushing their goals with AI-powered education.
          </p>
          <Button
            size="lg"
            variant="destructive"
            className="text-2xl px-16 py-10 text-black bg-pink hover:bg-pink/90"
            asChild
          >
            <Link to="/register">GET STARTED FREE</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

