import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Markdown } from "@/components/ui/markdown";
import { Bot, Plus, Send, User, LogOut } from "lucide-react";
import * as chat from '@botpress/chat'
import kiitLogo from '../images/kiit.png';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

// const WEBHOOK_ID = '87359b9f-23d2-4961-aa37-16967b80ac34';
const WEBHOOK_ID = process.env.WEBHOOK_ID || '87359b9f-23d2-4961-aa37-16967b80ac34';

let client: any = null;
let conversation: any = null;

export default function Chat() {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "👋 Hello! I'm KIIT MITRA. I'm here to help you with questions, provide information, and have engaging conversations. What would you like to talk about today?",
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);
  const [isPending, setIsPending] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const initializeBot = async () => {
    client = await chat.Client.connect({ webhookId: WEBHOOK_ID });
    const result = await client.createConversation({});
    conversation = result.conversation;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    initializeBot();
  }, []);

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to access the chat.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/auth";
      }, 500);
      return;
    }
  }, [user, isLoading, toast]);

  const sendMessageMutation = async (msg: string) => {
    setIsPending(true);

    try {

      await client.createMessage({ conversationId: conversation.id, payload: { type: 'text', text: msg } })
      const listener = await client.listenConversation({ id: conversation.id })

      interface BotpressReply {
        payload: { text: string }
      }

      const reply = await new Promise<BotpressReply | null>((res) => {
        const onMsg = (ev: any) => {
          if (ev.userId === client.user.id) return
          listener.off('message_created', onMsg)
          res(ev as BotpressReply)
        }
        listener.on('message_created', onMsg)
        setTimeout(() => { listener.off('message_created', onMsg); res(null) }, 30000)
      })

      if (reply) {

        const botMessage: Message = {
          id: Date.now().toString() + '-bot',
          content: reply.payload.text,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };


        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      } else {
        throw new Error('No reply received from bot');
      }

      if (listener.disconnect) await listener.disconnect()

    } catch (error) {
      setIsTyping(false);
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Session expired",
          description: "Please sign in again.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/auth";
        }, 500);
      };
    }

    setIsPending(false);
  }

  const handleSendMessage = () => {
    const message = inputValue.trim();
    if (!message || isPending) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString() + '-user',
      content: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Send to AI
    sendMessageMutation(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    
    setMessages([
      {
        id: '1',
        content: "👋 Hello! I'm KIIT MITRA. I'm here to help you with questions, provide information, and have engaging conversations. What would you like to talk about today?",
        sender: 'bot',
        timestamp: new Date().toISOString()
      }
    ]);
    setInputValue('');
    setIsTyping(false);
  };

  const { logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Bot className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div>
              <img src={kiitLogo} className="w-18 h-12 bg-transparent sm:w-18 sm:h-12 rounded-xl"></img>
            </div>
          <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-semibold text-foreground">KIIT MITRA</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Your KIIT Knowledge Buddy</p>
            </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button
            onClick={handleNewChat}
            size="sm"
            className="flex items-center space-x-1 sm:space-x-2"
            data-testid="button-new-chat"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Chat</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative" data-testid="button-user-menu">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.profileImageUrl || undefined} />
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-foreground">
                  {user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user?.username || 'User'}
                </p>
                {user?.email && (
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                )}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} data-testid="button-logout">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 chat-scroll">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-2 sm:space-x-3 message-animation ${message.sender === 'user' ? 'justify-end' : ''
              }`}
          >
            {message.sender === 'bot' && (
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
              </div>
            )}

            <div className={`flex-1 ${message.sender === 'user' ? 'flex flex-col items-end' : ''}`}>
              <div className={`flex items-center space-x-2 mb-1 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <span className="text-sm font-medium text-foreground">
                  {message.sender === 'user' ? 'You' : 'KIIT Assistant'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatTime(message.timestamp)}
                </span>
              </div>

              <div className={`max-w-[280px] sm:max-w-md lg:max-w-3xl rounded-lg p-3 sm:p-4 ${message.sender === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border'
                }`}>
                {message.sender === 'user' ? (
                  <p>{message.content}</p>
                ) : (
                  <Markdown content={message.content} />
                )}
              </div>
            </div>

            {message.sender === 'user' && (
              <Avatar className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
                <AvatarImage src={user?.profileImageUrl || undefined} />
                <AvatarFallback>
                  <User className="w-3 h-3 sm:w-4 sm:h-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start space-x-2 sm:space-x-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-foreground">KIIT Assistant</span>
                <span className="text-xs text-muted-foreground">typing...</span>
              </div>
              <div className="bg-card border border-border rounded-lg p-3 sm:p-4 max-w-[280px] sm:max-w-md lg:max-w-3xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-border bg-card p-3 sm:p-6">
        <div className="flex space-x-2 sm:space-x-4">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="min-h-[2.5rem] sm:min-h-[3rem] max-h-24 sm:max-h-32 resize-none pr-10 sm:pr-12 text-sm sm:text-base"
              disabled={isPending}
              data-testid="input-message"
            />
            <Button
              size="sm"
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isPending}
              className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 p-0"
              data-testid="button-send"
            >
              <Send className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center hidden sm:block">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
