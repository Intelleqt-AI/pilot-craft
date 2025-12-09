import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, User, ArrowRight, Calendar, TrendingUp, Star, Zap } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import { fetchArticles } from '@/lib/api';

const Blog = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchArticles,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // SEO: Update page title and meta description
    document.title = 'Trade Pilot Blog - Expert Home Improvement Tips & Guides';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        'Get expert home improvement tips, tradesperson advice, and project guides from Trade Pilot. Your ultimate resource for DIY projects and finding trusted professionals.'
      );
  }, []);

  // fallback data (kept so design doesn't break while API data loads or if API returns empty)
  const fallbackFeaturedPost = {
    id: 1,
    title: 'The Complete Guide to Kitchen Renovation: From Planning to Completion',
    excerpt:
      'Transform your kitchen with our comprehensive guide covering everything from initial planning to final touches. Learn from industry experts.',
    author: 'Sarah Mitchell',
    date: 'January 15, 2025',
    readTime: '12 min read',
    category: 'Home Renovation',
    image: '/lovable-uploads/b63cd1f9-6e40-4716-bda0-9c34b9f6d061.png',
    featured: true,
  };

  // fallback blog posts removed — we rely on API data and show skeletons while loading

  // Map Strapi response (`data?.data`) into the shape the component expects.
  const postsFromApi = (data?.data || []).map(item => {
    const attr = item.attributes || item || {};

    const title = attr.title || '';

    // excerpt/description: prefer description, then excerpt, then first block body
    let excerpt = attr.description || attr.excerpt || '';
    if (!excerpt && Array.isArray(attr.blocks) && attr.blocks.length > 0) {
      const first = attr.blocks[0];
      if (first && typeof first.body === 'string') {
        // very small markdown strip: remove headings and HTML tags for a short preview
        excerpt = first.body
          .replace(/[#>*_`]/g, '')
          .replace(/<[^>]+>/g, '')
          .slice(0, 220);
      }
    }

    // author might be a relation or a simple string
    const author = attr.author?.data?.attributes?.name || attr.authorName || attr.author || 'Trade Pilot';

    // format published date if present
    const date = attr.publishedAt
      ? new Date(attr.publishedAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
      : attr.date || '';

    const readTime = attr.readTime || attr.read_time || attr.read || '5 min read';

    // category might be a relation object or simple object with name
    const category =
      attr.category?.data?.attributes?.name ||
      attr.category?.name ||
      (typeof attr.category === 'string' ? attr.category : '') ||
      attr.categories?.data?.[0]?.attributes?.name ||
      'General';

    // resolve image url defensively (Strapi: cover/formats/url)
    let image = '';
    if (attr.cover?.formats?.large?.url) {
      image = attr.cover.formats.large.url;
    } else if (attr.cover?.formats?.medium?.url) {
      image = attr.cover.formats.medium.url;
    } else if (attr.cover?.formats?.thumbnail?.url) {
      image = attr.cover.formats.thumbnail.url;
    } else if (attr.cover?.url) {
      image = attr.cover.url;
    } else if (attr.image?.data?.attributes?.url) {
      image = attr.image.data.attributes.url;
    } else if (attr.image?.url) {
      image = attr.image.url;
    } else if (attr.thumbnail?.data?.attributes?.url) {
      image = attr.thumbnail.data.attributes.url;
    }

    return {
      id: item.id || attr.id,
      title,
      excerpt,
      author,
      date,
      readTime,
      category,
      image,
      featured: !!attr.featured,
    };
  });

  // use API posts directly; show skeleton while loading — keep fallback featured post for hero if API returns empty
  const blogPosts = postsFromApi;
  const featuredPost = (postsFromApi.find(p => p.featured) || postsFromApi[0]) ?? fallbackFeaturedPost;

  // revert to the original category list (useful when posts share same category)
  const categories = ['All Posts', 'Home Renovation', 'Plumbing', 'Electrical', 'General', 'Landscaping', 'Heating', 'Roofing'];

  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All Posts' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* SEO: Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@type': 'Blog',
          name: 'Trade Pilot Blog',
          description: 'Expert home improvement tips, guides, and tradesperson advice',
          url: 'https://tradepilot.com/blog',
          publisher: {
            '@type': 'Organization',
            name: 'Trade Pilot',
            logo: {
              '@type': 'ImageObject',
              url: 'https://tradepilot.com/logo.png',
            },
          },
        })}
      </script>

      <Navigation />

      {/* Featured Article Hero (show skeleton while loading) */}
      {isLoading ? (
        <section className="relative min-h-screen flex">
          <div className="w-1/2 h-screen bg-muted/30 animate-pulse" />
          <div className="w-1/2 bg-secondary h-screen flex items-center">
            <div className="p-6 lg:p-12 xl:p-16 w-full">
              <div className="space-y-4">
                <div className="h-6 bg-white/20 rounded w-40" />
                <div className="h-8 bg-white/20 rounded w-64" />
                <div className="h-4 bg-white/10 rounded w-3/4" />
                <div className="h-4 bg-white/10 rounded w-2/3" />
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full" />
                    <div className="h-4 bg-white/20 rounded w-24" />
                  </div>
                  <div className="h-10 w-32 bg-white/20 rounded" />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative min-h-screen flex">
          {/* Left 50% - Image */}
          <div className="w-1/2 relative overflow-hidden h-screen">
            <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
            <div className="absolute top-6 left-6">
              <Badge className="bg-primary text-primary-foreground">Featured</Badge>
            </div>
          </div>

          {/* Right 50% - Content */}
          <div
            className={`w-1/2 bg-secondary h-screen flex items-center transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
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
                Expert advice, tips, and guides for all your home improvement projects. From finding trusted tradespeople to DIY insights
                from industry professionals.
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium text-white">{featuredPost.author}</span>
                </div>
                <Button asChild size="lg" className="group/btn rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link to={`/blog/${featuredPost?.slug ?? featuredPost?.attributes?.slug ?? featuredPost?.id}`}>
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

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
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg rounded-xl border shadow-sm bg-white"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 text-sm ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-muted text-secondary hover:bg-primary hover:text-primary-foreground shadow-sm border'
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

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-muted/30" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted/40 rounded w-3/4" />
                    <div className="h-3 bg-muted/40 rounded w-5/6" />
                    <div className="h-3 bg-muted/40 rounded w-1/2" />
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted/40 rounded-full" />
                        <div className="h-3 bg-muted/40 rounded w-20" />
                      </div>
                      <div className="h-8 w-24 bg-muted/40 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory('All Posts');
                  setSearchTerm('');
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
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
                    <h3 className="text-lg line-clamp-2 font-bold text-secondary mb-3 leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 mb-4 text-sm leading-relaxed">{post?.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-secondary">{post.author}</span>
                      </div>
                      <Button variant="ghost" size="sm" asChild className="group/btn">
                        <Link to={`/blog/${post?.slug ?? post?.attributes?.slug ?? post?.id}`}>
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
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground hover:text-secondary-foreground rounded-xl shadow-lg"
              >
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
