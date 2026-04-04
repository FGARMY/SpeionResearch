export default function Footer() {
  return (
    <footer className="border-t border-[#EEEEEE] py-12 mt-20">
      <div className="max-w-[800px] mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-2">
          <p className="font-serif font-bold text-lg">Speion Research Labs</p>
          <p className="text-[12px] text-[#999999] max-w-[300px] leading-relaxed">
            Advancing the frontiers of software engineering, artificial intelligence, and applied neuroscience through rigorous independent research.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-12 text-[12px]">
          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-[#111111] mb-4">Nav</p>
            <a href="/papers" className="block text-[#666666] hover:text-[#111111] hover:underline">Research</a>
            <a href="/areas" className="block text-[#666666] hover:text-[#111111] hover:underline">Areas</a>
            <a href="/about" className="block text-[#666666] hover:text-[#111111] hover:underline">About</a>
          </div>
          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-[#111111] mb-4">Connect</p>
            <a href="https://github.com/FGARMY/SpeionResearch" className="block text-[#666666] hover:text-[#111111] hover:underline">GitHub</a>
            <a href="mailto:research@speion.com" className="block text-[#666666] hover:text-[#111111] hover:underline">Email</a>
            <a href="/contact" className="block text-[#666666] hover:text-[#111111] hover:underline">Contact</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-[800px] mx-auto px-6 mt-12 pt-8 border-t border-[#F5F5F5] flex justify-between items-center text-[10px] text-[#BBBBBB] uppercase tracking-widest font-medium">
        <span>&copy; {new Date().getFullYear()} Speion Labs</span>
        <span>Independent Research Publication</span>
      </div>
    </footer>
  );
}
