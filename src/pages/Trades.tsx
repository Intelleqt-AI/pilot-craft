import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Star, Shield, Zap, Clock, ChevronDown, Users, DollarSign, FileCheck, Bot, CreditCard, Smartphone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "/lovable-uploads/9d2e5008-c118-46d3-b5ea-c41c7e4e9286.png";

const Trades = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const proofChips = [
    "invoice-verified reviews",
    "fair lead fees", 
    "modern, mobile-first",
    "fast responses"
  ];

  const whyFeatures = [
    {
      icon: Shield,
      title: "Verified Reviews",
      description: "All reviews are verified against completed invoices, giving you credible feedback from real customers."
    },
    {
      icon: DollarSign,
      title: "Fair Lead Fees + Optional Pro",
      description: "Pay only for leads you accept, with the option to upgrade to Pro for reduced lead fees and priority matching."
    },
    {
      icon: Smartphone,
      title: "Mobile-First Platform",
      description: "Manage your business on the go with our modern, responsive platform designed for busy tradespeople."
    },
    {
      icon: Zap,
      title: "Fast Response System",
      description: "Get matched with interested homeowners quickly and respond to opportunities faster than the competition."
    }
  ];

  const faqs = [
    {
      question: "How do the lead fees work?",
      answer: "You only pay when you accept a lead that matches your preferences. Free members pay standard lead fees, while Pro members get reduced rates and priority matching."
    },
    {
      question: "What's included in the Pro plan?",
      answer: "Pro includes reduced lead fees, priority matching, featured placement in search results, response insights, and a verified business badge to stand out from competitors."
    },
    {
      question: "Are the reviews really verified?",
      answer: "Yes, all reviews are verified against completed invoices to ensure they come from real customers who have paid for completed work."
    },
    {
      question: "Do you handle payments?",
      answer: "No, you handle payments directly with your customers. We focus on connecting you with quality leads, not payment processing."
    },
    {
      question: "How quickly can I start receiving leads?",
      answer: "Once your profile is approved (usually within 24 hours), you can start receiving matched leads immediately based on your service areas and preferences."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="trade-hero-overlay absolute inset-0"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl text-left">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              Get matched to the jobs you actually want
            </h1>
            <p className={`text-lg sm:text-xl md:text-2xl text-white/90 font-light mb-8 transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              Trade Pilot for business is your platform to book, track and manage trade jobs at scale. We pre-match homeowners to you based on proximity, reviews and availability.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <Button size="lg" asChild>
                <a href="/trades/join-free">Join free</a>
              </Button>
              <Button variant="outline" size="lg" className="border-transparent text-white bg-secondary hover:bg-white hover:text-foreground" asChild>
                <a href="#pricing">See pricing</a>
              </Button>
            </div>
            
            {/* Proof Chips */}
            <div className={`flex flex-wrap gap-3 transition-all duration-700 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {proofChips.map((chip, index) => (
                <span key={index} className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-sm font-medium text-white">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Trade Pilot Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-center text-secondary mb-16">Why Trade Pilot is the reliable choice?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {whyFeatures.map((feature, index) => (
              <div key={index} className="trade-card text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-secondary mb-6">Your professional dashboard</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Manage your leads, track your jobs, and grow your business with our comprehensive trade management platform.
              </p>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border">
                <img 
                  src="/lovable-uploads/713dfec0-02b5-4897-a0c0-eb4b21bd8639.png" 
                  alt="Trade Pilot CRM Dashboard" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-secondary mb-6">Choose your plan</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free and upgrade to Pro for lower lead fees and premium features.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="trade-card relative flex flex-col">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-secondary mb-2">Free</h3>
                <p className="text-muted-foreground mb-6">Perfect to get started</p>
                <div className="text-4xl font-bold text-secondary mb-2">£0</div>
                <p className="text-muted-foreground">per month</p>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>Profile & listing</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>Request to quote</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>Standard lead fee</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>Basic support</span>
                </li>
              </ul>
              
              <div className="mt-auto">
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground mb-4" asChild>
                  <a href="/trades/join-free">Start free</a>
                </Button>
                <div className="h-12"></div> {/* Spacer to match Pro plan button height */}
              </div>
            </div>

            {/* Pro Plan */}
            <div className="trade-card relative border-2 border-secondary flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-secondary mb-2">Pro</h3>
                <p className="text-muted-foreground mb-6">For serious professionals</p>
                <div className="text-4xl font-bold text-secondary mb-2">£29</div>
                <p className="text-muted-foreground">per month</p>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>All Free features</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span><strong>Reduced lead fee</strong></span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>Priority matching</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>Featured placement</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>Response insights</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>Verified business badge</span>
                </li>
              </ul>
              
              <div className="mt-auto">
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground mb-4" asChild>
                  <a href="/trades/join-free">Start free</a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/trades/premium">Compare plans</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-center text-secondary mb-16">Frequently asked questions</h2>
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-border">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full py-6 px-0 text-left flex justify-between items-center hover:text-primary transition-colors"
                  >
                    <span className="text-lg font-semibold text-secondary">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="pb-6 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto bg-primary rounded-2xl p-8 text-center shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-primary-foreground mb-6">
              Ready to win better jobs?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of tradespeople who are growing their business with Trade Pilot.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
                <a href="/trades/join-free">Join free today</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Trades;