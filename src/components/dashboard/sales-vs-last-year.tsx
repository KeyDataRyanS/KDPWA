import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SalesVsLastYear() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales vs. Last Year</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Sales comparison coming soon.
        </p>
      </CardContent>
    </Card>
  );
}
