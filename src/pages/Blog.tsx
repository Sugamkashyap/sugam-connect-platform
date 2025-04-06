
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Blog = () => {
  const featuredPosts = [
    {
      id: 1,
      title: "5 Ways Doctors Can Improve Patient Engagement Online",
      excerpt: "Discover proven strategies to enhance patient communication and engagement through digital platforms.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      category: "Healthcare",
      date: "Apr 2, 2023",
      author: "Dr. Anand Sharma"
    },
    {
      id: 2,
      title: "Digital Marketing Essentials for Legal Professionals",
      excerpt: "Learn how lawyers and advocates can leverage digital marketing to attract more qualified clients.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      category: "Legal",
      date: "Mar 15, 2023",
      author: "Priya Mehta"
    }
  ];

  const recentPosts = [
    {
      id: 3,
      title: "How to Choose the Right Appointment Scheduling System",
      excerpt: "A comprehensive guide to selecting the perfect appointment booking solution for your professional practice.",
      image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      category: "Technology",
      date: "Feb 28, 2023",
      author: "Rajiv Mehta"
    },
    {
      id: 4,
      title: "The Importance of Mobile-Friendly Websites for Professionals",
      excerpt: "Why having a responsive website is no longer optional for doctors, lawyers, and other service providers.",
      image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      category: "Web Design",
      date: "Feb 12, 2023",
      author: "Ananya Patel"
    },
    {
      id: 5,
      title: "Building Trust Online: Website Elements That Inspire Confidence",
      excerpt: "Key components that help professional service providers establish trust and credibility through their online presence.",
      image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      category: "User Experience",
      date: "Jan 25, 2023",
      author: "Sugam Kashyap"
    },
    {
      id: 6,
      title: "HIPAA Compliance for Healthcare Websites: What You Need to Know",
      excerpt: "Essential guidelines for ensuring your medical practice website maintains proper patient privacy and data security.",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      category: "Healthcare",
      date: "Jan 10, 2023",
      author: "Dr. Meera Singh"
    }
  ];

  const categories = [
    "Healthcare",
    "Legal",
    "Technology",
    "Web Design",
    "User Experience",
    "Client Management",
    "Marketing"
  ];

  return (
    <>
      {/* Blog Hero */}
      <section className="bg-gradient-to-br from-brand-light via-white to-white py-12 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional Insights Blog</h1>
            <p className="text-xl text-gray-600 mb-8">
              Expert advice, industry trends, and practical tips for professionals who want to succeed in the digital age.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90">
                <Link to="/contact">Subscribe to Updates</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="section">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Featured Articles</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="bg-brand-light text-brand-blue px-3 py-1 rounded-full">{post.category}</span>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <User size={14} className="mr-1" />
                      {post.author}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} className="inline-flex items-center text-brand-blue font-medium hover:underline">
                    Read more <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts and Sidebar */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - Recent Posts */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Recent Articles</h2>
              
              <div className="space-y-8">
                {recentPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row">
                    <div className="md:w-1/3 aspect-video md:aspect-square overflow-hidden">
                      <img 
                        src={post.image}
                        alt={post.title}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="bg-brand-light text-brand-blue px-3 py-1 rounded-full">{post.category}</span>
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {post.date}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <Link to={`/blog/${post.id}`} className="inline-flex items-center text-brand-blue font-medium hover:underline">
                          Read more <ArrowRight size={16} className="ml-2" />
                        </Link>
                        <div className="text-sm text-gray-500 flex items-center">
                          <User size={14} className="mr-1" />
                          {post.author}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-10 flex justify-center">
                <nav className="flex items-center gap-1">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" className="bg-brand-blue text-white">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <span className="px-2">...</span>
                  <Button variant="outline" size="sm">8</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </nav>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Search */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <h3 className="text-lg font-semibold mb-4">Search Articles</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                  />
                  <button className="bg-brand-blue text-white px-4 py-2 rounded-r-lg hover:bg-brand-blue/90">
                    Search
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link 
                        to={`/blog/category/${category.toLowerCase()}`} 
                        className="flex items-center justify-between text-gray-600 hover:text-brand-blue"
                      >
                        <span>{category}</span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {Math.floor(Math.random() * 10) + 1}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-brand-blue to-brand-teal text-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h3>
                <p className="mb-4 text-white/80">
                  Get the latest articles and industry updates delivered to your inbox.
                </p>
                <form>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full mb-3 border border-white/20 bg-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                  <Button className="w-full bg-white text-brand-blue hover:bg-white/90">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
