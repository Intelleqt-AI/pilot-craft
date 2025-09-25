import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Wrench, Star, Shield, Clock, MapPin, Phone, Mail } from "lucide-react";

const Plumbers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink to="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Plumbers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Wrench className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-secondary-foreground mb-6">
            Find Local Plumbers Near You
          </h1>
          <p className="text-xl text-secondary-foreground/90 mb-8 max-w-2xl mx-auto">
            Get 3 instant quotes from verified local plumbers. Emergency callouts, installations, repairs, and maintenance services across the UK.
          </p>
          <Button size="lg" asChild>
            <a href="/find-tradespeople?trade=plumber">Get Plumber Quotes</a>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-secondary mb-12">
            Professional Plumbing Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-secondary mb-4">Emergency Plumbing</h3>
              <p className="text-muted-foreground mb-4">
                24/7 emergency plumber callouts for burst pipes, leaks, and urgent repairs.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Burst pipe repairs</li>
                <li>• Emergency leak fixes</li>
                <li>• Blocked drain clearance</li>
                <li>• Boiler breakdowns</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-secondary mb-4">Bathroom Installation</h3>
              <p className="text-muted-foreground mb-4">
                Complete bathroom installations and renovations by certified plumbers.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Full bathroom refits</li>
                <li>• Shower installations</li>
                <li>• Toilet replacements</li>
                <li>• Basin and tap fitting</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-secondary mb-4">Central Heating</h3>
              <p className="text-muted-foreground mb-4">
                Boiler services, radiator installations, and heating system maintenance.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Boiler installations</li>
                <li>• Radiator fitting</li>
                <li>• System power flushing</li>
                <li>• Annual boiler service</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-secondary mb-12">
            Why Choose TradePilot Plumbers?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-4">Fully Verified</h3>
              <p className="text-muted-foreground">
                All plumbers are Gas Safe registered, insured, and background checked for your peace of mind.
              </p>
            </div>
            
            <div className="text-center">
              <Star className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-4">5-Star Rated</h3>
              <p className="text-muted-foreground">
                Only the highest-rated local plumbers with proven track records and customer reviews.
              </p>
            </div>
            
            <div className="text-center">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-4">Fast Response</h3>
              <p className="text-muted-foreground">
                Get matched with available plumbers instantly. Many offer same-day or emergency services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-semibold text-center text-secondary mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-secondary mb-2">How quickly can I get a plumber?</h3>
              <p className="text-muted-foreground">
                Most plumbers on TradePilot can respond within 2-4 hours for emergency callouts, with many offering same-day service for urgent repairs.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-secondary mb-2">Are all plumbers Gas Safe registered?</h3>
              <p className="text-muted-foreground">
                Yes, all plumbers handling gas work are Gas Safe registered and fully qualified. We verify all certifications before they join our platform.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-secondary mb-2">What's included in a plumber's quote?</h3>
              <p className="text-muted-foreground">
                Quotes typically include labour costs, materials, and any call-out charges. All quotes are transparent with no hidden fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-secondary-foreground mb-6">
            Ready to Find Your Local Plumber?
          </h2>
          <p className="text-xl text-secondary-foreground/90 mb-8">
            Get matched with verified plumbers in your area. Compare quotes and book today.
          </p>
          <Button size="lg" asChild>
            <a href="/find-tradespeople?trade=plumber">Get Started Now</a>
          </Button>
        </div>
      </section>

      <Footer />

      {/* Structured Data for Local Business */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Find Local Plumbers Near You | TradePilot UK",
          "description": "Get 3 instant quotes from verified local plumbers. Emergency callouts, installations, repairs, and maintenance services across the UK.",
          "url": "https://mytradepilot.io/plumbers",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://mytradepilot.io"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Plumbers"
              }
            ]
          },
          "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How quickly can I get a plumber?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most plumbers on TradePilot can respond within 2-4 hours for emergency callouts, with many offering same-day service for urgent repairs."
                }
              },
              {
                "@type": "Question",
                "name": "Are all plumbers Gas Safe registered?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, all plumbers handling gas work are Gas Safe registered and fully qualified. We verify all certifications before they join our platform."
                }
              }
            ]
          }
        })
      }} />
    </div>
  );
};

export default Plumbers;