import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import saiLogo from "@/assets/sai-logo.png";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="flex items-center justify-center gap-4 mb-8">
          <img src={saiLogo} alt="Sai Financial Services" className="h-16 w-16 object-contain" />
          <h1 className="text-3xl font-bold text-foreground">Sai Financial Services</h1>
        </div>
        
        <div className="grid md:grid-cols-1 gap-6">
          <Card 
            className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer" 
            onClick={() => navigate("/loan-form")}
          >
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <FileText className="h-12 w-12 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">Apply for Loan</CardTitle>
              <CardDescription>Submit your loan application</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Fill out our simple form to apply for personal, housing, business, or vehicle loans.
              </p>
              <Button size="lg" className="w-full">
                Start Application
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
