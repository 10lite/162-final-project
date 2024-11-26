"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const dummyData = [
  { time: '00:00', cars: 20, motorcycles: 15, jeepneys: 5, multicabs: 3 },
  { time: '04:00', cars: 15, motorcycles: 10, jeepneys: 3, multicabs: 2 },
  { time: '08:00', cars: 100, motorcycles: 80, jeepneys: 25, multicabs: 15 },
  { time: '12:00', cars: 80, motorcycles: 60, jeepneys: 20, multicabs: 12 },
  { time: '16:00', cars: 120, motorcycles: 90, jeepneys: 30, multicabs: 18 },
  { time: '20:00', cars: 60, motorcycles: 45, jeepneys: 15, multicabs: 9 },
]

export default function TrafficPatterns() {
  const [timeFrame, setTimeFrame] = useState("daily")

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Traffic Patterns</h2>
      <div>
        <Label htmlFor="time-frame">Time Frame</Label>
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger id="time-frame">
            <SelectValue placeholder="Select time frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dummyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cars" fill="#8884d8" />
            <Bar dataKey="motorcycles" fill="#82ca9d" />
            <Bar dataKey="jeepneys" fill="#ffc658" />
            <Bar dataKey="multicabs" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <Button>Generate Report</Button>
    </div>
  )
}

