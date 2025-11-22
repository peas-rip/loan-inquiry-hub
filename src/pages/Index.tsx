import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Loan Application Portal</h1>
          <p className="text-xl text-muted-foreground">
            Apply for loans quickly & easily
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-6">
          {/* ONLY USER LOAN FORM CARD */}
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