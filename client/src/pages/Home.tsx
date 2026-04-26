import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, CheckCircle, Trophy, Flame, Users, MessageSquare, Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useIsMobile } from "@/hooks/useMobile";

/**
 * Design System: Professional OKLCH Theme
 * - Clean, sophisticated color palette with blue-purple tones
 * - Real-world photography for authentic connection
 * - Minimalist, modern design with subtle interactions
 * - Focus on clarity and genuine user transformation
 */

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleThemeWithAnimation } = useTheme();
  const isMobile = useIsMobile();
  const themeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen && !isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, mobileMenuOpen]);

  const handleThemeToggle = (e?: React.MouseEvent) => {
    if (toggleThemeWithAnimation) {
      const target = e?.currentTarget as HTMLElement | undefined;
      if (target) {
        const rect = target.getBoundingClientRect();
        toggleThemeWithAnimation({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      } else if (themeButtonRef.current) {
        const rect = themeButtonRef.current.getBoundingClientRect();
        toggleThemeWithAnimation({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    }
  };

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#mentors", label: "Mentors" },
    { href: "#testimonials", label: "Testimonials" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur border-b border-border" : "bg-transparent"}`}>
        <div className="container flex items-center justify-between py-4">
          <div className="text-2xl font-bold text-primary">MENTOR AI</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm uppercase hover:text-primary transition">
                {link.label}
              </a>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => handleThemeToggle(e)}
              className="rounded-full"
              ref={themeButtonRef}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase font-bold">Join Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden gap-2 items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => handleThemeToggle(e)}
              className="rounded-full"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur pb-4">
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className="text-sm uppercase hover:text-primary transition px-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase font-bold mx-4">Join Now</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Dynamic background with gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-40"></div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-120px)]">
            {/* Left Content - Takes 5 columns */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-6">
                <div className="inline-block px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  <span className="text-sm font-bold text-primary">AI-Powered Mentorship</span>
                </div>
                
                <h1 className="text-5xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                  Stop {" "}
                  {/* <br /> */}
                  <span className="text-primary">Consuming</span>
                  <br />
                  Start {" "}
                  {/* <br /> */}
                  <span className="text-primary">Becoming</span>
                </h1>
                
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg font-light">
                  Real challenges. Proof-based validation. AI accountability. Your personal mentor that doesn't motivate—it disciplines.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase font-bold text-base lg:text-lg py-6 px-8 group rounded-lg">
                  Start Your Journey
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition" />
                </Button>
                <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary/10 uppercase font-bold text-base lg:text-lg py-6 px-8 rounded-lg">
                  Try Demo
                </Button>
              </div>

              {/* Social Proof - Enhanced */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                <div className="space-y-2">
                  <div className="text-4xl lg:text-5xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground font-medium">Active Users</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl lg:text-5xl font-bold text-primary">4.9★</div>
                  <div className="text-sm text-muted-foreground font-medium">User Rating</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl lg:text-5xl font-bold text-primary">87%</div>
                  <div className="text-sm text-muted-foreground font-medium">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Visual - Takes 7 columns with enhanced design */}
            <div className="lg:col-span-7 relative">
              <div className="relative group">
                {/* Outer glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                
                {/* Main image container */}
                <div className="relative h-96 sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
                  <img 
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663600664020/7YcsuUqY2fWM69qR8ZaZus/hero-real-mentor-BSQCKNyoQSm76LY7ekrpRA.webp" 
                    alt="Mentor AI - Focused Professional" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none"></div>
                </div>
                
                {/* Floating card overlay */}
                <div className="absolute -bottom-6 -left-6 lg:-bottom-8 lg:-left-8 bg-card border border-primary/20 rounded-xl p-6 shadow-xl max-w-xs">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-sm font-bold text-primary uppercase">Live Now</span>
                  </div>
                  <p className="text-sm text-foreground font-medium">"Mentor AI changed how I approach discipline. Real accountability, real results."</p>
                  <div className="mt-3 text-xs text-muted-foreground">— Alex Chen, Software Engineer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative py-20 bg-secondary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              You're Stuck in a Loop
            </h2>
            <p className="text-lg text-muted-foreground">
              You consume endless content, watch motivational videos, and make promises to yourself. But nothing changes. You lack accountability, discipline, and a system that actually works.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: "📚", title: "Endless Consumption", desc: "You scroll, watch, and read but never act. Information without action is just noise." },
              { icon: "😴", title: "Lack of Discipline", desc: "Motivation fades. You need structure, not inspiration. Real growth requires daily habits." },
              { icon: "👥", title: "No Accountability", desc: "Nobody's watching. You make excuses. You need someone (or something) to hold you accountable." },
              { icon: "📉", title: "No Progress Tracking", desc: "You can't measure what you don't track. Without visibility, growth becomes invisible." },
            ].map((problem, idx) => (
              <div key={idx} className="p-6 rounded-lg subtle-border bg-card/50 card-hover">
                <div className="text-4xl mb-4">{problem.icon}</div>
                <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="relative py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Mentor AI Changes the Game
            </h2>
            <p className="text-lg text-muted-foreground">
              We don't motivate you. We challenge you. We don't give advice. We hold you accountable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              {[
                { num: "01", title: "Real Challenges", desc: "Personalized daily tasks designed for your specific goals, not generic motivation." },
                { num: "02", title: "Proof-Based", desc: "Submit video, text, or images as evidence. No excuses. No fake completions." },
                { num: "03", title: "AI Validation", desc: "Our AI asks questions to verify real effort. You can't fool the system." },
                { num: "04", title: "Tracked Growth", desc: "Every action is logged. Watch your consistency, discipline, and progress compound." },
              ].map((solution, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="text-3xl font-bold text-primary min-w-16">{solution.num}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                    <p className="text-muted-foreground">{solution.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663600664020/7YcsuUqY2fWM69qR8ZaZus/person-working-deep-focus-FBE2fcaSFCWzjHPDkEdAYd.webp" 
                alt="Deep Focus Work" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 bg-secondary/5">
        <div className="container">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
            Core Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Multiple Mentors", desc: "Choose from different mentor personalities tailored to your goals." },
              { icon: Target, title: "Daily Challenges", desc: "Tasks tailored to your goals, delivered every morning." },
              { icon: Zap, title: "Proof Submission", desc: "Submit evidence (text/video) to complete tasks." },
              { icon: MessageSquare, title: "AI Verification", desc: "AI asks questions to validate real effort." },
              { icon: Trophy, title: "Progress Tracking", desc: "Visual dashboard of your growth and consistency." },
              { icon: Flame, title: "Levels & Badges", desc: "Earn points and unlock higher levels." },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="p-6 rounded-lg subtle-border bg-card/50 card-hover">
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-20">
        <div className="container">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {[
              { step: "1", title: "Choose Your Mentor", icon: "🧠" },
              { step: "2", title: "Get Daily Challenge", icon: "📋" },
              { step: "3", title: "Complete & Submit Proof", icon: "✅" },
              { step: "4", title: "AI Validates Effort", icon: "🤖" },
              { step: "5", title: "Level Up & Grow", icon: "🚀" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full subtle-border flex items-center justify-center mb-4 bg-card/50">
                  <div className="text-4xl">{item.icon}</div>
                </div>
                <div className="text-sm font-bold text-primary mb-2">STEP {item.step}</div>
                <div className="text-center text-sm font-bold">{item.title}</div>
                {idx < 4 && <div className="hidden md:block text-primary text-2xl mt-4">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors Showcase */}
      <section id="mentors" className="relative py-20 bg-secondary/5">
        <div className="container">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
            Choose Your Mentor
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "The Monk", desc: "Focus & Discipline Mentor", traits: ["Mental Clarity", "Emotional Mastery", "Mindfulness"], image: "person-meditating" },
              { name: "Fitness Coach", desc: "Physical Transformation Mentor", traits: ["Strength", "Endurance", "Peak Performance"], image: "person-fitness" },
              { name: "Deep Work Master", desc: "Productivity Mentor", traits: ["Focus", "Deep Work", "Maximum Output"], image: "person-working-deep-focus" },
              { name: "Life Strategist", desc: "Life Design Mentor", traits: ["Strategy", "Decision Making", "Legacy Building"], image: "team-collaboration" },
            ].map((mentor, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative h-64 rounded-lg overflow-hidden mb-4 shadow-md card-hover">
                  <img 
                    src={mentor.image === "person-meditating" ? "https://d2xsxph8kpxj0f.cloudfront.net/310519663600664020/7YcsuUqY2fWM69qR8ZaZus/person-meditating-EKzucDKsF65G8pL4A4ZhVc.webp" : 
                         mentor.image === "person-fitness" ? "https://d2xsxph8kpxj0f.cloudfront.net/310519663600664020/7YcsuUqY2fWM69qR8ZaZus/person-fitness-LZ4UGFJZXMtyp5YTjB4avT.webp" :
                         mentor.image === "person-working-deep-focus" ? "https://d2xsxph8kpxj0f.cloudfront.net/310519663600664020/7YcsuUqY2fWM69qR8ZaZus/person-working-deep-focus-FBE2fcaSFCWzjHPDkEdAYd.webp" :
                         "https://d2xsxph8kpxj0f.cloudfront.net/310519663600664020/7YcsuUqY2fWM69qR8ZaZus/team-collaboration-nuKYotLiibb6Si4wh49vqW.webp"}
                    alt={mentor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                </div>
                <h3 className="text-xl font-bold mb-1">{mentor.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{mentor.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {mentor.traits.map((trait, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">{trait}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="relative py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold">
                Level Up Your Life
              </h2>
              <p className="text-lg text-muted-foreground">
                Mentor AI uses proven gamification mechanics to keep you engaged and motivated. Every action compounds.
              </p>

              <div className="space-y-4">
                {[
                  { title: "Levels System", desc: "Progress through 100+ levels. Each level requires consistent effort." },
                  { title: "Points & XP", desc: "Earn XP for every completed challenge. Unlock rewards at milestones." },
                  { title: "Badges & Achievements", desc: "Unlock special badges for streaks, milestones, and special challenges." },
                  { title: "Leaderboards", desc: "Compete with friends or the global community. Climb the ranks." },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-96 lg:h-full min-h-96 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663600664020/7YcsuUqY2fWM69qR8ZaZus/team-collaboration-nuKYotLiibb6Si4wh49vqW.webp" 
                alt="Team Growth and Collaboration" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-20 bg-secondary/5">
        <div className="container">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
            Real Transformations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Alex Chen", role: "Software Engineer", quote: "Mentor AI turned my scattered goals into a daily system. I've never been more consistent.", avatar: "👨‍💻" },
              { name: "Sarah Johnson", role: "Entrepreneur", quote: "This isn't just another app. It's a personal accountability partner that actually works.", avatar: "👩‍💼" },
              { name: "Marcus Williams", role: "Student", quote: "I went from procrastinating to completing challenges daily. The gamification keeps me hooked.", avatar: "👨‍🎓" },
              { name: "Emma Davis", role: "Fitness Coach", quote: "My clients are using Mentor AI and seeing real results. The proof submission system is genius.", avatar: "👩‍🏫" },
              { name: "James Rodriguez", role: "Freelancer", quote: "Finally, a tool that understands discipline isn't motivation—it's systems and accountability.", avatar: "👨‍💻" },
              { name: "Lisa Park", role: "Product Manager", quote: "The AI validation is incredible. It prevents cheating and ensures real effort.", avatar: "👩‍💼" },
            ].map((testimonial, idx) => (
              <div key={idx} className="p-6 rounded-lg subtle-border bg-card/50 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5"></div>

        <div className="container relative z-10 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Start Becoming Your Best Version Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stop consuming. Start becoming. Join thousands of users who are transforming their lives through discipline, accountability, and real challenges.
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase font-bold text-lg py-8 px-12 group text-xl">
            Join Now
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition" />
          </Button>
          <p className="text-sm text-muted-foreground mt-6">
            Start free. No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-border bg-card/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold text-primary mb-4">MENTOR AI</div>
              <p className="text-sm text-muted-foreground">Your personal AI mentor for growth, discipline, and transformation.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Features</a></li>
                <li><a href="#" className="hover:text-primary transition">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition">Mentors</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">About</a></li>
                <li><a href="#" className="hover:text-primary transition">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">&copy; 2026 Mentor AI. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary transition">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition">Discord</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
