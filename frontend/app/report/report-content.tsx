import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportContent() {
  return (
    <a href="https://www.facebook.com/davaocityreports/" target="_blank">
      <Card className="md:max-w-[75%]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Report Traffic Incident</CardTitle>
          <CardDescription>Have something to report?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Davao City has hotlines for traffic incidents. You may click this card for details.</p>
        </CardContent>
      </Card>
    </a>
  )
}