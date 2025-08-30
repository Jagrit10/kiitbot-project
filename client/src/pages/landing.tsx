import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, MessageCircle, Sparkles, Zap } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = '/api/login';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">AI Assistant</h1>
              <p className="text-sm text-muted-foreground">Intelligent conversations await</p>
            </div>
          </div>
          <Button onClick={handleLogin} data-testid="button-login">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Bot className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Chat with{" "}
            <span className="text-primary">AI Assistant</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Experience intelligent conversations powered by advanced AI. 
            Get help, ask questions, and explore ideas through natural dialogue.
          </p>
          
          <Button 
            size="lg" 
            onClick={handleLogin}
            className="text-lg px-8 py-6"
            data-testid="button-get-started"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Get Started
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Choose Our AI Assistant?
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed for seamless conversations
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Get instant responses to your questions with our optimized AI engine
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Natural Conversations</CardTitle>
              <CardDescription>
                Communicate naturally with AI that understands context and nuance
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Rich Responses</CardTitle>
              <CardDescription>
                Receive detailed, formatted responses with examples and explanations
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Chatting?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users having meaningful conversations with AI
          </p>
          <Button 
            size="lg" 
            onClick={handleLogin}
            className="text-lg px-8 py-6"
            data-testid="button-cta-login"
          >
            Sign In Now
          </Button>
        </div>
      </section>
    </div>
  );
}
