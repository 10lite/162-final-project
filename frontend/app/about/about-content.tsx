import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutContent() {
  return (
    <Card className="md:max-w-[75%]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">About BantayTrapiko</CardTitle>
        <CardDescription>CMSC 162 Final Project</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>BantayTrapiko is a final project for CMSC 162 - Introduction to Image and Video Processing</p>
        <p>This app is developed by three 4-BSCS students from the University of the Philippines Mindanao.</p>
        <p>You may view the full project <a className="underline" href="https://docs.google.com/document/d/1BNaOna-T7Q7VWgPO_YpREI5EVUHaSkIjpHJx1utA8SE/edit?usp=sharing" target="_blank">paper here</a> and the <a className="underline" href="https://github.com/ASPactores/bantay-trapiko" target="_blank">GitHub repository here</a>.</p>
      </CardContent>
    </Card>
  )
}