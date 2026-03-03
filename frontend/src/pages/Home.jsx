import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from '../hooks/use-toast';
import {
  Play,
  Download,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  ArrowRight,
  Video,
  Sparkles,
  Image,
  Sun,
  Star,
  ExternalLink,
  Send,
  Menu,
  X
} from 'lucide-react';
import {
  portfolioProjects,
  skills,
  services,
  testimonials,
  processSteps,
  contactInfo
} from '../mock';

const Home = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });

  const filteredProjects = activeFilter === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === activeFilter);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out! I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', projectType: '', message: '' });
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#07071a] via-[#0a0a20] to-[#0f0f2b] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#07071a]/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-[#7b5cff] to-[#00e6ff] bg-clip-text text-transparent">
            DJ MANIKANTA
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="hover:text-[#00e6ff] transition-colors">Home</button>
            <button onClick={() => scrollToSection('work')} className="hover:text-[#00e6ff] transition-colors">Work</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-[#00e6ff] transition-colors">Services</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-[#00e6ff] transition-colors">About</button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-[#7b5cff] to-[#00e6ff] hover:opacity-90"
            >
              Hire Me
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0a0a20]/95 backdrop-blur-lg border-t border-white/5">
            <nav className="flex flex-col gap-4 p-6">
              <button onClick={() => scrollToSection('home')} className="text-left hover:text-[#00e6ff] transition-colors">Home</button>
              <button onClick={() => scrollToSection('work')} className="text-left hover:text-[#00e6ff] transition-colors">Work</button>
              <button onClick={() => scrollToSection('services')} className="text-left hover:text-[#00e6ff] transition-colors">Services</button>
              <button onClick={() => scrollToSection('about')} className="text-left hover:text-[#00e6ff] transition-colors">About</button>
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-[#7b5cff] to-[#00e6ff] hover:opacity-90"
              >
                Hire Me
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Crisp edits.
              <span className="block bg-gradient-to-r from-[#7b5cff] to-[#00e6ff] bg-clip-text text-transparent">
                Cinematic motion.
              </span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              I'm DJ Manikanta — 20. Motion editor & photo retoucher who turns raw footage into shareable stories using Premiere Pro, After Effects, Photoshop, and Lightroom.
            </p>

            {/* Skills Badges */}
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Badge key={skill.name} variant="outline" className="px-4 py-2 border-[#7b5cff]/30 bg-[#7b5cff]/10 text-white">
                  {skill.name} • {skill.level}
                </Badge>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#7b5cff] to-[#00e6ff] hover:opacity-90 px-8"
                onClick={() => scrollToSection('work')}
              >
                <Play className="mr-2" size={20} />
                Watch Reel
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#00e6ff]/30 hover:bg-[#00e6ff]/10"
                onClick={() => scrollToSection('contact')}
              >
                <Download className="mr-2" size={20} />
                Contact Me
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-[#7b5cff]/20 border border-white/10 hover:border-[#7b5cff]/50 transition-all">
                <Instagram size={20} />
              </a>
              <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-[#00e6ff]/20 border border-white/10 hover:border-[#00e6ff]/50 transition-all">
                <Linkedin size={20} />
              </a>
              <a href={contactInfo.youtube} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-[#7b5cff]/20 border border-white/10 hover:border-[#7b5cff]/50 transition-all">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Showreel Placeholder */}
          <div className="relative animate-fade-in-delay">
            <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
              <div className="aspect-video bg-gradient-to-br from-[#7b5cff]/20 to-[#00e6ff]/20 flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8088373/pexels-photo-8088373.jpeg')] bg-cover bg-center opacity-30"></div>
                <Button
                  size="lg"
                  className="relative z-10 rounded-full w-20 h-20 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 group-hover:scale-110 transition-transform"
                >
                  <Play className="text-white" size={32} />
                </Button>
              </div>
              <div className="p-4 bg-white/5 backdrop-blur-sm">
                <p className="text-sm text-gray-400">Showreel • 00:15</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="bg-gradient-to-r from-[#7b5cff] to-[#00e6ff] bg-clip-text text-transparent">Work</span>
            </h2>
            <p className="text-gray-400 text-lg">Projects that made an impact</p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['all', 'video', 'motion-graphics', 'photo-retouch', 'color-grade'].map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                onClick={() => setActiveFilter(filter)}
                className={activeFilter === filter
                  ? 'bg-gradient-to-r from-[#7b5cff] to-[#00e6ff]'
                  : 'border-white/20 hover:border-[#7b5cff]/50'}
              >
                {filter.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="glass-card border-white/10 overflow-hidden group hover:border-[#7b5cff]/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="relative overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Button size="sm" className="bg-white/20 backdrop-blur-md hover:bg-white/30">
                      View Project <ExternalLink size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-[#00e6ff] mb-2">{project.role}</p>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{project.platform}</span>
                    <span className="text-xs text-[#7b5cff]">{project.views} views</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About/Process Section */}
      <section id="about" className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How I <span className="bg-gradient-to-r from-[#7b5cff] to-[#00e6ff] bg-clip-text text-transparent">Work</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Video editor & motion designer. Created the viral college fest reel and ongoing creator work for food pages. Fast turnaround, cinematic results.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {processSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7b5cff] to-[#00e6ff] flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="glass-card border-white/10 p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#00e6ff] text-[#00e6ff]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#7b5cff] to-[#00e6ff] bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-gray-400 text-lg">What I can do for you</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="glass-card border-white/10 p-6 hover:border-[#7b5cff]/50 transition-all">
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-center gap-2">
                      <ArrowRight size={14} className="text-[#00e6ff]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-[#7b5cff] font-semibold">{service.pricing}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Let's <span className="bg-gradient-to-r from-[#7b5cff] to-[#00e6ff] bg-clip-text text-transparent">Work Together</span>
            </h2>
            <p className="text-gray-400 text-lg">Have a project in mind? Let's discuss!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-white/5 border-white/10 focus:border-[#7b5cff]"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-white/5 border-white/10 focus:border-[#7b5cff]"
              />
              <Input
                placeholder="Project Type (e.g., Video Edit, Motion Graphics)"
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                required
                className="bg-white/5 border-white/10 focus:border-[#7b5cff]"
              />
              <Textarea
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="bg-white/5 border-white/10 focus:border-[#7b5cff]"
              />
              <Button type="submit" className="w-full bg-gradient-to-r from-[#7b5cff] to-[#00e6ff] hover:opacity-90">
                Send Message <Send size={16} className="ml-2" />
              </Button>
            </form>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="glass-card border-white/10 p-6">
                <h3 className="font-bold text-xl mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 text-gray-300 hover:text-[#00e6ff] transition-colors">
                    <Mail size={20} className="text-[#7b5cff]" />
                    {contactInfo.email}
                  </a>
                  <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-3 text-gray-300 hover:text-[#00e6ff] transition-colors">
                    <Phone size={20} className="text-[#7b5cff]" />
                    {contactInfo.phone}
                  </a>
                </div>
              </Card>

              <Card className="glass-card border-white/10 p-6">
                <h3 className="font-bold text-xl mb-4">Quick Connect</h3>
                <div className="flex gap-3">
                  <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="flex-1 p-4 rounded-lg bg-white/5 hover:bg-[#7b5cff]/20 border border-white/10 hover:border-[#7b5cff]/50 transition-all text-center">
                    <Instagram className="mx-auto mb-2" size={24} />
                    <p className="text-xs">Instagram</p>
                  </a>
                  <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 p-4 rounded-lg bg-white/5 hover:bg-[#00e6ff]/20 border border-white/10 hover:border-[#00e6ff]/50 transition-all text-center">
                    <Linkedin className="mx-auto mb-2" size={24} />
                    <p className="text-xs">LinkedIn</p>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2025 DJ Manikanta. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;