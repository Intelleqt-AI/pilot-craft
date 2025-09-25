import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Zap, Star, Shield, Clock } from "lucide-react";

const Electricians = () => {
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
              <BreadcrumbPage>Electricians</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-secondary-foreground mb-6">
            Find Local Electricians Near You
          </h1>
          <p className="text-xl text-secondary-foreground/90 mb-8 max-w-2xl mx-auto">
            Get 3 instant quotes from certified local electricians. Emergency callouts, installations, rewiring, and electrical safety services across the UK.
          </p>
          <Button size="lg" asChild>
            <a href="/find-tradespeople?trade=electrician">Get Electrician Quotes</a>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-secondary mb-12">
            Professional Electrical Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-secondary mb-4">Emergency Electrical</h3>
              <p className="text-muted-foreground mb-4">
                24/7 emergency electrician callouts for power outages, faults, and urgent repairs.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Power restoration</li>
                <li>• Emergency fault finding</li>
                <li>• Circuit breaker repairs</li>
                <li>• Electrical safety checks</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-secondary mb-4">House Rewiring</h3>
              <p className="text-muted-foreground mb-4">
                Complete house rewiring and electrical installations by Part P certified electricians.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Full house rewiring</li>
                <li>• Consumer unit upgrades</li>
                <li>• Socket installations</li>
                <li>• Lighting circuits</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-secondary mb-4">Electrical Testing</h3>
              <p className="text-muted-foreground mb-4">
                Electrical inspections, testing, and certification for landlords and homeowners.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• EICR certificates</li>
                <li>• PAT testing</li>
                <li>• Landlord safety checks</li>
                <li>• Electrical condition reports</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-secondary mb-12">
            Why Choose TradePilot Electricians?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-4">Fully Certified</h3>
              <p className="text-muted-foreground">
                All electricians are Part P registered, NICEIC approved, and fully insured for your peace of mind.
              </p>
            </div>
            
            <div className="text-center">
              <Star className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-4">5-Star Rated</h3>
              <p className="text-muted-foreground">
                Only the highest-rated local electricians with proven track records and customer reviews.
              </p>
            </div>
            
            <div className="text-center">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-4">Fast Response</h3>
              <p className="text-muted-foreground">
                Get matched with available electricians instantly. Many offer same-day or emergency services.
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
              <h3 className="text-xl font-semibold text-secondary mb-2">How do I know if I need an electrician?</h3>
              <p className="text-muted-foreground">
                Call an electrician for any electrical work including new sockets, lighting, rewiring, fuse box upgrades, or electrical safety concerns.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-secondary mb-2">Are all electricians Part P certified?</h3>
              <p className="text-muted-foreground">
                Yes, all electricians on TradePilot are Part P registered and can self-certify their work, ensuring compliance with building regulations.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-secondary mb-2">Do I need an electrical safety certificate?</h3>
              <p className="text-muted-foreground">
                EICR certificates are required every 5 years for rental properties and recommended every 10 years for homeowners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-secondary-foreground mb-6">
            Ready to Find Your Local Electrician?
          </h2>
          <p className="text-xl text-secondary-foreground/90 mb-8">
            Get matched with certified electricians in your area. Compare quotes and book today.
          </p>
          <Button size="lg" asChild>
            <a href="/find-tradespeople?trade=electrician">Get Started Now</a>
          </Button>
        </div>
      </section>

      <Footer />

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Find Local Electricians Near You | TradePilot UK",
          "description": "Get 3 instant quotes from certified local electricians. Emergency callouts, installations, rewiring, and electrical safety services across the UK.",
          "url": "https://mytradepilot.io/electricians",
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
                "name": "Electricians"
              }
            ]
          }
        })
      }} />
    </div>
  );
};

export default Electricians;