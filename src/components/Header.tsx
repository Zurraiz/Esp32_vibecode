'use client';

export default function Header() {
  return (
    <header className="bg-[#2E4862] text-white h-14 flex items-center justify-between px-8 shadow-md">
      {/* Left side: Logo and Tagline */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">🤖</span>
        <div>
          <h1 className="font-poppins font-semibold text-base leading-tight">
            ESP32 IoT Platform
          </h1>
          <p className="font-poppins text-xs text-gray-300 leading-tight">
            Build real IoT projects visually
          </p>
        </div>
      </div>

      {/* Right side: Badge chips */}
      <div className="flex items-center gap-2">
        <span className="bg-white text-[#2E4862] px-3 py-1 rounded-full text-xs font-poppins font-medium">
          ESP32
        </span>
        <span className="bg-white text-[#2E4862] px-3 py-1 rounded-full text-xs font-poppins font-medium">
          Learn with vibe coding
        </span>
        <span className="bg-white text-[#2E4862] px-3 py-1 rounded-full text-xs font-poppins font-medium">
          Mediatiz Foundation 
        </span>
      </div>
    </header>
  );
}
