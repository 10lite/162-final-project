import ReportContent from "./report-content"

export default function Report() {
  return (
      <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex justify-center items-center">
        <main className="flex justify-center">
          <ReportContent />
        </main>
      </div>
    </div>
  )
}

