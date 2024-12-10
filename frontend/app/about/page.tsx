import AboutContent from './about-content'

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex justify-center items-center">
        <main className="flex justify-center">
          <AboutContent />
        </main>
      </div>
    </div>
  )
}
