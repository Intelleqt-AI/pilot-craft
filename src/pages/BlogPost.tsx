import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageCircle,
  Eye,
  CheckCircle,
  AlertTriangle,
  Info,
  Lightbulb,
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { fetchArticleBySlug } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import BLockWrapper from '@/components/blocks/BLockWrapper';

const BlogPost = () => {
  const { id } = useParams();

  const {
    data: article,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['blogs', id],
    queryFn: () => fetchArticleBySlug(id),
    enabled: !!id,
  });

  console.log(article);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  // Mock blog post data - in a real app, this would come from an API
  const blogPost = {
    id: parseInt(id || '1'),
    title: 'The Complete Guide to Kitchen Renovation: From Planning to Completion',
    excerpt:
      'Transform your kitchen with our comprehensive guide covering everything from initial planning to final touches. Learn from industry experts.',
    author: 'Sarah Mitchell',
    authorBio:
      'Sarah is a certified interior designer with over 15 years of experience in home renovations. She specializes in kitchen and bathroom design.',
    date: 'January 15, 2025',
    readTime: '12 min read',
    category: 'Home Renovation',
    image: '/lovable-uploads/b63cd1f9-6e40-4716-bda0-9c34b9f6d061.png',
    views: '2,847',
    content: `
      <p>Planning a kitchen renovation can feel overwhelming, but with the right approach, you can transform your space into the heart of your home. This comprehensive guide will walk you through every step of the process.</p>

      <h2>1. Setting Your Budget</h2>
      <p>Before you start dreaming about marble countertops and professional-grade appliances, it's crucial to establish a realistic budget. Here's how to approach it:</p>
      
      <ul>
        <li><strong>Research average costs:</strong> Kitchen renovations typically range from £10,000 to £50,000+</li>
        <li><strong>Add a 20% buffer:</strong> Unexpected issues always arise during renovations</li>
        <li><strong>Prioritize your must-haves:</strong> List what's most important to you</li>
        <li><strong>Consider financing options:</strong> Explore loans, savings, or home equity</li>
      </ul>

      <div class="callout callout-tip">
        <strong>Pro Tip:</strong> Start saving early and get multiple quotes from different contractors to understand the true cost of your project.
      </div>

      <h2>2. Design and Layout Planning</h2>
      <p>The layout is the foundation of your kitchen's functionality. Consider the classic work triangle between your sink, stove, and refrigerator:</p>

      <h3>Popular Kitchen Layouts:</h3>
      <ul>
        <li><strong>Galley Kitchen:</strong> Perfect for narrow spaces</li>
        <li><strong>L-Shaped:</strong> Great for open floor plans</li>
        <li><strong>U-Shaped:</strong> Maximizes storage and counter space</li>
        <li><strong>Island Kitchen:</strong> Adds extra workspace and storage</li>
      </ul>

      <h2>3. Choosing Materials and Finishes</h2>
      <p>Material selection impacts both aesthetics and functionality. Here are key considerations:</p>

      <h3>Countertops:</h3>
      <ul>
        <li><strong>Quartz:</strong> Durable, non-porous, consistent patterns</li>
        <li><strong>Granite:</strong> Natural beauty, heat resistant, unique patterns</li>
        <li><strong>Marble:</strong> Elegant, cool surface for baking, requires maintenance</li>
        <li><strong>Butcher Block:</strong> Warm, affordable, requires regular care</li>
      </ul>

      <div class="callout callout-warning">
        <strong>Important:</strong> Consider maintenance requirements when choosing materials. Some options require more care than others.
      </div>

      <h3>Cabinetry:</h3>
      <p>Cabinets typically account for 35-40% of your kitchen renovation budget. Options include:</p>
      <ul>
        <li><strong>Stock cabinets:</strong> Most affordable, limited customization</li>
        <li><strong>Semi-custom:</strong> Balance of price and personalization</li>
        <li><strong>Custom cabinets:</strong> Unlimited options, highest cost</li>
      </ul>

      <h2>4. Finding the Right Professionals</h2>
      <p>A successful kitchen renovation requires a team of skilled professionals:</p>

      <h3>Key Team Members:</h3>
      <ul>
        <li><strong>Kitchen Designer:</strong> Creates functional and beautiful layouts</li>
        <li><strong>General Contractor:</strong> Manages the overall project</li>
        <li><strong>Electrician:</strong> Handles wiring for appliances and lighting</li>
        <li><strong>Plumber:</strong> Manages water lines and drainage</li>
        <li><strong>Flooring Specialist:</strong> Installs your chosen flooring</li>
      </ul>

      <div class="callout callout-info">
        <strong>Trade Pilot Tip:</strong> Use our platform to find vetted, reviewed professionals in your area. All our tradespeople are background-checked and insured.
      </div>

      <h2>5. The Renovation Timeline</h2>
      <p>A typical kitchen renovation follows this timeline:</p>

      <h3>Week 1-2: Demolition and Preparation</h3>
      <ul>
        <li>Remove old cabinets, appliances, and fixtures</li>
        <li>Address any structural changes</li>
        <li>Update electrical and plumbing rough-ins</li>
      </ul>

      <h3>Week 3-4: Infrastructure</h3>
      <ul>
        <li>Install new electrical wiring</li>
        <li>Update plumbing</li>
        <li>Drywall repairs and painting</li>
      </ul>

      <h3>Week 5-6: Installation</h3>
      <ul>
        <li>Install flooring</li>
        <li>Cabinet installation</li>
        <li>Countertop fabrication and installation</li>
      </ul>

      <h3>Week 7-8: Finishing Touches</h3>
      <ul>
        <li>Appliance installation</li>
        <li>Backsplash installation</li>
        <li>Final electrical and plumbing connections</li>
        <li>Hardware installation</li>
      </ul>

      <h2>6. Managing the Renovation Process</h2>
      <p>Stay organized and communicate regularly with your team:</p>

      <ul>
        <li><strong>Daily check-ins:</strong> Visit the site regularly and address concerns immediately</li>
        <li><strong>Document everything:</strong> Take photos of progress and keep receipts</li>
        <li><strong>Prepare for disruption:</strong> Set up a temporary kitchen space</li>
        <li><strong>Stay flexible:</strong> Be prepared for unexpected issues and delays</li>
      </ul>

      <div class="callout callout-success">
        <strong>Success Tip:</strong> Good communication with your contractors is key to a successful renovation. Don't hesitate to ask questions or voice concerns.
      </div>

      <h2>7. Final Inspection and Completion</h2>
      <p>Before signing off on the project:</p>

      <ul>
        <li>Test all appliances and fixtures</li>
        <li>Check cabinet doors and drawers</li>
        <li>Verify electrical outlets and switches</li>
        <li>Ensure proper water pressure and drainage</li>
        <li>Address any punch list items</li>
      </ul>

      <h2>Conclusion</h2>
      <p>A kitchen renovation is a significant investment that can transform your home and daily life. With proper planning, the right team, and realistic expectations, you can create a space that serves your family for years to come.</p>

      <p>Remember, the key to a successful renovation is preparation, communication, and working with trusted professionals. Take your time in the planning phase – it will save you time, money, and stress during construction.</p>
    `,
    tags: ['Kitchen Renovation', 'Home Improvement', 'Interior Design', 'DIY', 'Contractors'],
    relatedPosts: [
      {
        id: 2,
        title: '10 Signs You Need an Emergency Plumber',
        image: '/lovable-uploads/31f52746-1420-439c-9f35-555016c7e6ba.png',
      },
      {
        id: 3,
        title: 'Electrical Safety: What Every Homeowner Should Know',
        image: '/lovable-uploads/a5c5ec1d-c610-4a2f-999d-0f3695ecbbde.png',
      },
      {
        id: 6,
        title: 'Bathroom Renovation on a Budget: Smart Tips',
        image: '/lovable-uploads/78c45c37-043b-4102-be34-98a64df6bb17.png',
      },
    ],
  };

  useEffect(() => {
    // SEO: Update page title and meta description
    document.title = `${article?.title} | Trade Pilot Blog`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', article?.description);
  }, [article?.title, article?.description]);

  return (
    <div className="min-h-screen bg-background">
      {/* SEO: Structured Data for Article */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article?.title,
          description: article?.description,
          image: article?.cover?.url,
          author: {
            '@type': 'Person',
            name: article?.author?.name,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Trade Pilot',
            logo: {
              '@type': 'ImageObject',
              url: 'https://tradepilot.com/logo.png',
            },
          },
          datePublished: '2025-01-15',
          dateModified: '2025-01-15',
        })}
      </script>

      <Navigation />

      {/* Back to Blog */}
      <div className="container mx-auto px-4 pt-6">
        <Button variant="ghost" asChild className="group">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-4 py-6">
        <header
          className={`max-w-4xl mx-auto mb-8 transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="mb-6">
            <Badge className="mb-3">{article?.category?.name}</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4 leading-tight">{article?.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{article?.description}</p>
          </div>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-secondary">Trade Pilot</p>
                <p className="text-sm text-muted-foreground">Author</p>
              </div>
            </div>
            <Separator orientation="vertical" className="h-12" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {' '}
                {new Date(article?.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{blogPost.readTime}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{blogPost.views} views</span>
            </div>
          </div>

          {/* Featured Image */}
          <div
            className={`max-w-5xl mx-auto mb-10 transition-all duration-700 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img src={article?.cover?.url} alt={blogPost.title} className="w-full h-64 sm:h-96 object-cover" />
            </div>
          </div>

          <BLockWrapper article={article} />

          {/* Article Actions */}
          <div className="flex mt-10 items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2 rounded-xl">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2 rounded-xl">
              <Bookmark className="h-4 w-4" />
              Save
            </Button>
          </div>
        </header>

        {/* Related Posts */}
        {/* <section className="max-w-5xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-secondary mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPost.relatedPosts.map(post => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-secondary group-hover:text-primary transition-colors">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section> */}

        {/* Comments Section */}
        <section className="max-w-4xl mx-auto mt-12">
          <div className="border-t pt-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-secondary">Comments</h2>
            </div>
            <div className="bg-muted/50 rounded-2xl p-8 text-center">
              <p className="text-muted-foreground mb-4">We'd love to hear your thoughts on this article.</p>
              <Button className="rounded-xl">Leave a Comment</Button>
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
