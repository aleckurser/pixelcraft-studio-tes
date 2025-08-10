import { Button } from "@/components/ui/button";
import { Upload, Sparkles, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="AI Photo Editing Interface" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/50 to-background/90" />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>AI-Powered Photo & Video Editing</span>
          </div>
          
          {/* Main heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="gradient-text">Transform</span>
            <br />
            Your Visual
            <br />
            <span className="gradient-text">Content</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Professional AI-powered editing tools for photos and videos. 
            Remove backgrounds, enhance colors, and create stunning content in seconds.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="ai-glow group text-lg px-8 py-6">
              <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Editing
            </Button>
            <Button variant="outline" size="lg" className="glass-card text-lg px-8 py-6 border-primary/30 hover:border-primary">
              <Zap className="w-5 h-5 mr-2" />
              View Features
            </Button>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16">
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AI Background Removal</h3>
              <p className="text-sm text-muted-foreground">Remove backgrounds instantly with AI precision</p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Smart Filters</h3>
              <p className="text-sm text-muted-foreground">Apply cinematic and vintage filters automatically</p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-primary-glow/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-primary-glow" />
              </div>
              <h3 className="font-semibold mb-2">Easy Upload</h3>
              <p className="text-sm text-muted-foreground">Drag & drop your photos and videos effortlessly</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;