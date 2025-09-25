import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Star, Shield, Clock } from "lucide-react";

const Roofers = () => {
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
              <BreadcrumbPage>Roofers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Home className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-secondary-foreground mb-6">
            Find Local Roofers Near You
          </h1>
          <p className="text-xl text-secondary-foreground/90 mb-8 max-w-2xl mx-auto">
            Get 3 instant quotes from experienced local roofers. Roof repairs, installations, maintenance, and emergency services across the UK.
          </p>
          <Button size="lg" asChild>
            <a href="/find-tradespeople?trade=roofer">Get Roofer Quotes</a>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-secondary mb-12">
            Professional Roofing Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-secondary mb-4">Roof Repairs</h3>
              <p className="text-muted-foreground mb-4">
                Emergency roof repairs, leak fixes, and storm damage restoration.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Leak repairs</li>
                <li>• Tile replacements</li>
                <li>• Storm damage fixes</li>
                <li>• Emergency callouts</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-secondary mb-4">New Roofs</h3>
              <p className="text-muted-foreground mb-4">
                Complete roof installations, replacements, and new build roofing.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Complete re-roofing</li>
                <li>• New build roofs</li>
                <li>• Flat roof installation</li>
                <li>• Pitched roof systems</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-secondary mb-4">Guttering & Fascias</h3>
              <p className="text-muted-foreground mb-4">
                Gutter installation, cleaning, repairs, and fascia board replacement.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Gutter installation</li>
                <li>• Gutter cleaning</li>
                <li>• Fascia boards</li>
                <li>• Soffit repairs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-secondary-foreground mb-6">
            Ready to Find Your Local Roofer?
          </h2>
          <p className="text-xl text-secondary-foreground/90 mb-8">
            Get matched with experienced roofers in your area. Compare quotes and book today.
          </p>
          <Button size="lg" asChild>
            <a href="/find-tradespeople?trade=roofer">Get Started Now</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Roofers;