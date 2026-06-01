import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MeVsMarket() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Me vs. the Market</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Market comparison coming soon.
        </p>
      </CardContent>
    </Card>
  );
}
