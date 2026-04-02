import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Navigate } from "react-router-dom";
import { LogOut, Save } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = ({ onLogin }: { onLogin: (email: string, password: string) => Promise<void> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onLogin(email, password);
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <p className="text-muted-foreground text-sm">UIS Office 1320 Content Management</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const DonationProgressEditor = () => {
  const queryClient = useQueryClient();
  const { data: progress } = useQuery({
    queryKey: ["donation-progress"],
    queryFn: async () => {
      const { data, error } = await supabase.from("donation_progress").select("*").limit(1).single();
      if (error) throw error;
      return data;
    },
  });

  const [currentAmount, setCurrentAmount] = useState<number>(0);

  useState(() => {
    if (progress) setCurrentAmount(progress.current_amount ?? 0);
  });

  const mutation = useMutation({
    mutationFn: async (amount: number) => {
      if (!progress) return;
      const { error } = await supabase
        .from("donation_progress")
        .update({ current_amount: amount } as any)
        .eq("id", progress.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donation-progress"] });
      toast.success("Progress updated!");
    },
    onError: (err: any) => toast.error(err.message),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Donation Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Current Amount (MVR)</Label>
            <Input
              type="number"
              value={currentAmount || (progress as any)?.current_amount || 0}
              onChange={(e) => setCurrentAmount(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>Target Amount (MVR)</Label>
            <Input value={(progress as any)?.total_amount || 1700000} disabled />
          </div>
        </div>
        <Button onClick={() => mutation.mutate(currentAmount)} disabled={mutation.isPending}>
          <Save className="w-4 h-4" /> Save Progress
        </Button>
      </CardContent>
    </Card>
  );
};

const BankAccountEditor = () => {
  const queryClient = useQueryClient();
  const { data: accounts } = useQuery({
    queryKey: ["admin-bank-accounts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("bank_accounts").select("*");
      if (error) throw error;
      return data;
    },
  });

  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  const account = accounts?.[0];

  const mutation = useMutation({
    mutationFn: async () => {
      if (!account) return;
      const { error } = await supabase
        .from("bank_accounts")
        .update({
          bank_name: bankName || account.bank_name,
          account_number: accountNumber || account.account_number,
          account_holder: accountHolder || account.account_holder,
        })
        .eq("id", account.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bank-accounts"] });
      queryClient.invalidateQueries({ queryKey: ["admin-bank-accounts"] });
      toast.success("Bank details updated!");
    },
    onError: (err: any) => toast.error(err.message),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Bank Account Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Bank Name</Label>
          <Input value={bankName || account?.bank_name || ""} onChange={(e) => setBankName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Account Number</Label>
          <Input
            value={accountNumber || account?.account_number || ""}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Account Name</Label>
          <Input
            value={accountHolder || account?.account_holder || ""}
            onChange={(e) => setAccountHolder(e.target.value)}
          />
        </div>
        <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
          <Save className="w-4 h-4" /> Save Bank Details
        </Button>
      </CardContent>
    </Card>
  );
};

const SiteContentEditor = () => {
  const queryClient = useQueryClient();
  const { data: content } = useQuery({
    queryKey: ["admin-site-content"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_content").select("*").order("key");
      if (error) throw error;
      return data;
    },
  });

  const [newKey, setNewKey] = useState("");
  const [newLocale, setNewLocale] = useState("en");
  const [newValue, setNewValue] = useState("");

  const addMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("site_content").upsert(
        {
          key: newKey,
          locale: newLocale,
          value: newValue,
        },
        { onConflict: "key,locale" },
      );
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-site-content"] });
      setNewKey("");
      setNewValue("");
      toast.success("Content saved!");
    },
    onError: (err: any) => toast.error(err.message),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Site Content (Multilingual)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <Label>Key</Label>
            <Input value={newKey} onChange={(e) => setNewKey(e.target.value)} placeholder="hero.title" />
          </div>
          <div className="space-y-1">
            <Label>Locale</Label>
            <select
              value={newLocale}
              onChange={(e) => setNewLocale(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="en">English</option>
              <option value="dv">Dhivehi</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
          <div className="space-y-1">
            <Label>Value</Label>
            <Textarea value={newValue} onChange={(e) => setNewValue(e.target.value)} rows={1} />
          </div>
        </div>
        <Button onClick={() => addMutation.mutate()} disabled={addMutation.isPending || !newKey}>
          <Save className="w-4 h-4" /> Save Content
        </Button>

        {content && content.length > 0 && (
          <div className="mt-6 space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Existing Content</h4>
            <div className="max-h-60 overflow-y-auto space-y-1">
              {content.map((item) => (
                <div key={item.id} className="flex items-center gap-2 text-xs bg-secondary/50 rounded p-2">
                  <span className="font-mono text-primary">{item.key}</span>
                  <span className="text-muted-foreground">({item.locale})</span>
                  <span className="truncate flex-1">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Admin = () => {
  const { user, isAdmin, loading, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={signIn} />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center space-y-4">
            <p className="text-foreground">You do not have admin access.</p>
            <p className="text-muted-foreground text-sm">Signed in as {user.email}</p>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground text-sm">UIS Office 1320 Content Management</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>

        <DonationProgressEditor />
        <BankAccountEditor />
        <SiteContentEditor />
      </div>
    </div>
  );
};

export default Admin;
