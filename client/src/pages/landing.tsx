import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, MessageCircle, Sparkles, Zap, Shield, Clock, Users, ArrowRight, CheckCircle } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = '/auth';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center">
              <Bot className="w-4 h-4 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-semibold text-foreground">AI Assistant</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Intelligent conversations await</p>
            </div>
          </div>
          <Button onClick={handleLogin} size="sm" data-testid="button-login">
            <span className="hidden sm:inline">Sign In</span>
            <span className="sm:hidden">Login</span>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
          </div>
          
          <div className="mb-4">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Powered by Advanced AI
            </Badge>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Chat with{" "}
            <span className="text-primary">AI Assistant</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            Experience intelligent conversations powered by advanced AI. 
            Get help, ask questions, and explore ideas through natural dialogue.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6 sm:mb-8">
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary mr-2" />
              Real-time responses
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary mr-2" />
              Markdown formatting
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary mr-2" />
              No file uploads needed
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleLogin}
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-6"
              data-testid="button-get-started"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              onClick={handleLogin}
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-6"
            >
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Why Choose Our AI Assistant?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Powerful features designed for seamless conversations
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12 sm:mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Lightning Fast</CardTitle>
              <CardDescription>
                Get instant responses to your questions with our optimized AI engine
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Natural Conversations</CardTitle>
              <CardDescription>
                Communicate naturally with AI that understands context and nuance
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Rich Responses</CardTitle>
              <CardDescription>
                Receive detailed, formatted responses with examples and explanations
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Secure & Private</CardTitle>
              <CardDescription>
                Your conversations are protected with enterprise-grade security
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">24/7 Available</CardTitle>
              <CardDescription>
                Access your AI assistant anytime, anywhere, on any device
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Easy to Use</CardTitle>
              <CardDescription>
                Simple interface designed for users of all technical backgrounds
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-muted/30 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">1M+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Messages Sent</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">50K+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">99.9%</div>
              <div className="text-sm sm:text-base text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">&lt;2s</div>
              <div className="text-sm sm:text-base text-muted-foreground">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Ready to Start Chatting?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
            Join thousands of users having meaningful conversations with AI
          </p>
          <Button 
            size="lg" 
            onClick={handleLogin}
            className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-6"
            data-testid="button-cta-login"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Sign In Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-border bg-card py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">AI Assistant</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 AI Assistant. Built with modern technology for intelligent conversations.
          </p>
        </div>
      </footer>
    </div>
  );
}
