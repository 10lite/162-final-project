import Dashboard from '@/components/dashboard'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex">
        <main className="flex-1 p-6">
          <Dashboard />
        </main>
      </div>
    </div>
  ) 
}

