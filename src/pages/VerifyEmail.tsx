import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Mail, RefreshCw, ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const email = useMemo(() => params.get("email") || "", [params]);

  useEffect(() => {
    // Advise about spam/junk
    if (email) {
      toast({
        title: "Check your inbox",
        description: `We've sent a verification link to ${email}. Check spam/junk if you don't see it.`,
      });
    }
  }, [email, toast]);

  const resend = async () => {
    try {
      setSending(true);
      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: { emailRedirectTo: redirectUrl },
      });
      if (error) throw error;
      toast({ title: "Email sent", description: "Verification link resent." });
    } catch (err: any) {
      toast({ title: "Could not resend", description: err.message, variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-secondary font-semibold mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to home
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Verify your email</h1>
          <p className="text-muted-foreground mt-2">
            We just sent a verification link to <span className="font-medium text-foreground">{email}</span>.
          </p>
        </div>

        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">1</div>
                <span className="text-sm">Open the email titled “Verify your email”</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">2</div>
                <span className="text-sm">Click the verification button to activate your account</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">3</div>
                <span className="text-sm">Return here and sign in</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button variant="outline" asChild className="flex-1">
            <a href={`mailto:${email}`}>
              <Mail className="h-4 w-4 mr-2" /> Open email app
            </a>
          </Button>
          <Button onClick={resend} disabled={!email || sending} className="flex-1">
            <RefreshCw className="h-4 w-4 mr-2" /> {sending ? "Resending..." : "Resend verification email"}
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Haven't received it? Check spam/junk, or verify your Supabase Auth URL settings.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
