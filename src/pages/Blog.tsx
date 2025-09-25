import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, User, ArrowRight, Calendar, TrendingUp, Star, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Blog = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // SEO: Update page title and meta description
    document.title = "Trade Pilot Blog - Expert Home Improvement Tips & Guides";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content", 
      "Get expert home improvement tips, tradesperson advice, and project guides from Trade Pilot. Your ultimate resource for DIY projects and finding trusted professionals."
    );
  }, []);

  const featuredPost = {
    id: 1,
    title: "The Complete Guide to Kitchen Renovation: From Planning to Completion",
    excerpt: "Transform your kitchen with our comprehensive guide covering everything from initial planning to final touches. Learn from industry experts.",
    author: "Sarah Mitchell",
    date: "January 15, 2025",
    readTime: "12 min read",
    category: "Home Renovation",
    image: "/lovable-uploads/b63cd1f9-6e40-4716-bda0-9c34b9f6d061.png",
    featured: true
  };

  const blogPosts = [
    {
      id: 2,
      title: "10 Signs You Need an Emergency Plumber",
      excerpt: "Don't wait for a small leak to become a major flood. Learn the warning signs that require immediate professional attention.",
      author: "Mike Thompson",
      date: "January 12, 2025",
      readTime: "5 min read",
      category: "Plumbing",
      image: "/lovable-uploads/31f52746-1420-439c-9f35-555016c7e6ba.png"
    },
    {
      id: 3,
      title: "Electrical Safety: What Every Homeowner Should Know",
      excerpt: "Stay safe with our essential electrical safety guide. Learn when to DIY and when to call a professional electrician.",
      author: "David Lee",
      date: "January 10, 2025",
      readTime: "7 min read",
      category: "Electrical",
      image: "/lovable-uploads/a5c5ec1d-c610-4a2f-999d-0f3695ecbbde.png"
    },
    {
      id: 4,
      title: "How to Choose the Right Tradesperson for Your Project",
      excerpt: "Find trusted professionals with confidence. Our expert tips for vetting, comparing quotes, and ensuring quality work.",
      author: "Emma Wilson",
      date: "January 8, 2025",
      readTime: "6 min read",
      category: "General",
      image: "/lovable-uploads/3ee8a739-9971-4a96-86e1-14de2728d255.png"
    },
    {
      id: 5,
      title: "Garden Landscaping Trends for 2025",
      excerpt: "Discover the latest garden design trends that will transform your outdoor space into a beautiful retreat.",
      author: "James Green",
      date: "January 5, 2025",
      readTime: "8 min read",
      category: "Landscaping",
      image: "/lovable-uploads/99134710-63b8-4cbe-901f-9652d4524ca1.png"
    },
    {
      id: 6,
      title: "Bathroom Renovation on a Budget: Smart Tips",
      excerpt: "Achieve a stunning bathroom makeover without breaking the bank. Professional tips for maximum impact on minimum budget.",
      author: "Lisa Parker",
      date: "January 3, 2025",
      readTime: "9 min read",
      category: "Home Renovation",
      image: "/lovable-uploads/78c45c37-043b-4102-be34-98a64df6bb17.png"
    },
    {
      id: 7,
      title: "Central Heating Maintenance: Essential Winter Prep",
      excerpt: "Keep your home warm and energy-efficient this winter. Expert tips for maintaining your heating system and reducing energy bills.",
      author: "Tom Richardson",
      date: "December 30, 2024",
      readTime: "6 min read",
      category: "Heating",
      image: "/lovable-uploads/83024a87-a532-41bf-b008-9b758244f734.png"
    }
  ];

  const categories = [
    "All Posts",
    "Home Renovation",
    "Plumbing",
    "Electrical", 
    "General",
    "Landscaping",
    "Heating",
    "Roofing"
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All Posts" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* SEO: Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Trade Pilot Blog",
          "description": "Expert home improvement tips, guides, and tradesperson advice",
          "url": "https://tradepilot.com/blog",
          "publisher": {
            "@type": "Organization",
            "name": "Trade Pilot",
            "logo": {
              "@type": "ImageObject",
              "url": "https://tradepilot.com/logo.png"
            }
          }
        })}
      </script>

      <Navigation />
      
      {/* Featured Article Hero */}
      <section className="relative min-h-screen flex">
        {/* Left 50% - Image */}
        <div className="w-1/2 relative overflow-hidden h-screen">
          <img 
            src={featuredPost.image} 
            alt={featuredPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6">
            <Badge className="bg-primary text-primary-foreground">Featured</Badge>
          </div>
        </div>
        
        {/* Right 50% - Content */}
        <div className={`w-1/2 bg-secondary h-screen flex items-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-6 lg:p-12 xl:p-16 w-full">
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <Badge variant="secondary">{featuredPost.category}</Badge>
              <div className="flex items-center gap-2 text-white/80">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{featuredPost.date}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{featuredPost.readTime}</span>
              </div>
            </div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 leading-tight">
              Trade Pilot <span className="text-primary-foreground">Blog</span>
            </h1>
            <p className="text-white/90 text-lg mb-6 leading-relaxed">
              Expert advice, tips, and guides for all your home improvement projects. From finding trusted tradespeople to DIY insights from industry professionals.
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-white">{featuredPost.author}</span>
              </div>
              <Button asChild size="lg" className="group/btn rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to={`/blog/${featuredPost.id}`}>
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="py-8 bg-white border-b">
        <div className="w-full px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg rounded-xl border shadow-sm bg-white"
                />
              </div>
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 text-sm ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted text-secondary hover:bg-primary hover:text-primary-foreground shadow-sm border"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-secondary">Latest Articles</h2>
            </div>
            {filteredPosts.length > 0 && (
              <p className="text-muted-foreground">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {setSelectedCategory("All Posts"); setSearchTerm("");}}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-secondary mb-3 leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-secondary">{post.author}</span>
                      </div>
                      <Button variant="ghost" size="sm" asChild className="group/btn">
                        <Link to={`/blog/${post.id}`}>
                          Read More
                          <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto bg-primary text-white rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-4 text-white">Stay Updated</h2>
            <p className="text-white/80 mb-8 text-lg max-w-2xl mx-auto">
              Get the latest home improvement tips and trade insights delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 h-12 bg-white border-0 text-foreground placeholder:text-muted-foreground rounded-xl"
              />
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground hover:text-secondary-foreground rounded-xl shadow-lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;