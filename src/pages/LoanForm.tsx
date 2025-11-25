import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";
import { BACKEND_URL } from "@/config";
import { useState } from "react";
import saiLogo from "@/assets/sai-logo.png";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").max(15),
  primaryContactNumber: z.string().min(10, "Primary contact must be at least 10 digits"),
  address: z.string().min(10, "Address must be at least 10 characters").max(500),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Please select a gender"),
  loanCategory: z.string().min(1, "Please select a loan category"),
  loanCategoryOther: z.string().optional(),
  referralName: z.string().optional(),
  referralPhone: z.string().optional(),
});

export default function LoanForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showOtherField, setShowOtherField] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      primaryContactNumber: "",
      address: "",
      dateOfBirth: "",
      gender: "",
      loanCategory: "",
      loanCategoryOther: "",
      referralName: "",
      referralPhone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // If "other" category is chosen, override loanCategory
    if (values.loanCategory === "other" && values.loanCategoryOther) {
      values.loanCategory = values.loanCategoryOther;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Submission Failed",
          description: data.message || "Unable to submit loan application",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Application Submitted",
        description: "Your loan application has been successfully submitted.",
      });

      form.reset();
      navigate("/thank-you");

    } catch (error) {
      console.error(error);
      toast({
        title: "Server Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header with Logo */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <img src={saiLogo} alt="Sai Financial Services" className="h-12 w-12 object-contain" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Sai Financial Services</h1>
              <p className="text-xs text-muted-foreground">Your Trusted Financial Partner</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container max-w-3xl mx-auto py-12 px-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-xl border-2">
          <CardHeader className="text-center bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-2xl shadow-lg">
                <FileText className="h-12 w-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">Loan Application Form</CardTitle>
            <CardDescription className="text-base">Fill in your details to apply for a loan</CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Primary Contact */}
                <FormField
                  control={form.control}
                  name="primaryContactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Contact Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your complete address" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  {/* DOB */}
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Gender */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Loan Category */}
                <FormField
                  control={form.control}
                  name="loanCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Category *</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setShowOtherField(value === "other");
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select loan category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="personal">Personal Loan</SelectItem>
                          <SelectItem value="housing">Housing Loan</SelectItem>
                          <SelectItem value="business">Business Loan</SelectItem>
                          <SelectItem value="vehicle-old">Vehicle Loan (Old)</SelectItem>
                          <SelectItem value="vehicle-new">Vehicle Loan (New)</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Other Loan Category Input */}
                {showOtherField && (
                  <FormField
                    control={form.control}
                    name="loanCategoryOther"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specify Loan Category *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter loan type" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Referral Information (Optional)</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Referral Name */}
                    <FormField
                      control={form.control}
                      name="referralName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Referral Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter referral name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Referral Phone */}
                    <FormField
                      control={form.control}
                      name="referralPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Referral Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 1234567890" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="finance" 
                  className="w-full" 
                  size="lg"
                >
                  Submit Application
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={saiLogo} alt="Sai Financial Services" className="h-8 w-8 object-contain" />
            <span className="font-semibold">Sai Financial Services</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Sai Financial Services. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

