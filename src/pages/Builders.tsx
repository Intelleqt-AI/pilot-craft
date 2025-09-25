import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Hammer, Star, Shield, Clock } from "lucide-react";

const Builders = () => {
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
              <BreadcrumbPage>Builders</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Hammer className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-secondary-foreground mb-6">
            Find Local Builders Near You
          </h1>
          <p className="text-xl text-secondary-foreground/90 mb-8 max-w-2xl mx-auto">
            Get 3 instant quotes from experienced local builders. Extensions, renovations, new builds, and construction services across the UK.
          </p>
          <Button size="lg" asChild>
            <a href="/find-tradespeople?trade=builder">Get Builder Quotes</a>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-secondary mb-12">
            Professional Building Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-secondary mb-4">Home Extensions</h3>
              <p className="text-muted-foreground mb-4">
                Single and double-storey extensions, conservatories, and loft conversions.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Single storey extensions</li>
                <li>• Double storey extensions</li>
                <li>• Loft conversions</li>
                <li>• Conservatories</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-secondary mb-4">House Renovations</h3>
              <p className="text-muted-foreground mb-4">
                Complete house renovations, refurbishments, and property improvements.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Full house renovations</li>
                <li>• Kitchen extensions</li>
                <li>• Bathroom renovations</li>
                <li>• Property refurbishments</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-secondary mb-4">New Builds</h3>
              <p className="text-muted-foreground mb-4">
                New house builds, commercial construction, and structural work.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• New house builds</li>
                <li>• Foundation work</li>
                <li>• Structural alterations</li>
                <li>• Commercial builds</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-secondary mb-12">
            Why Choose TradePilot Builders?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-4">Fully Insured</h3>
              <p className="text-muted-foreground">
                All builders are fully insured with public liability and employer's liability insurance up to £2 million.
              </p>
            </div>
            
            <div className="text-center">
              <Star className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-4">Quality Guaranteed</h3>
              <p className="text-muted-foreground">
                Only highly-rated builders with extensive portfolios and verified customer reviews join our platform.
              </p>
            </div>
            
            <div className="text-center">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-4">Project Management</h3>
              <p className="text-muted-foreground">
                Experienced project managers ensure your build stays on time, on budget, and meets all regulations.
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
              <h3 className="text-xl font-semibold text-secondary mb-2">Do I need planning permission for an extension?</h3>
              <p className="text-muted-foreground">
                Many extensions fall under permitted development rights, but larger projects may need planning permission. Our builders can advise on requirements.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-secondary mb-2">How long does a typical house extension take?</h3>
              <p className="text-muted-foreground">
                Single storey extensions typically take 8-12 weeks, while double storey extensions can take 16-20 weeks depending on size and complexity.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-secondary mb-2">What's included in a builder's quote?</h3>
              <p className="text-muted-foreground">
                Quotes include materials, labour, waste disposal, and project management. Building control and planning fees are usually separate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-secondary-foreground mb-6">
            Ready to Find Your Local Builder?
          </h2>
          <p className="text-xl text-secondary-foreground/90 mb-8">
            Get matched with experienced builders in your area. Compare quotes and book today.
          </p>
          <Button size="lg" asChild>
            <a href="/find-tradespeople?trade=builder">Get Started Now</a>
          </Button>
        </div>
      </section>

      <Footer />

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Find Local Builders Near You | TradePilot UK",
          "description": "Get 3 instant quotes from experienced local builders. Extensions, renovations, new builds, and construction services across the UK.",
          "url": "https://mytradepilot.io/builders",
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
                "name": "Builders"
              }
            ]
          }
        })
      }} />
    </div>
  );
};

export default Builders;