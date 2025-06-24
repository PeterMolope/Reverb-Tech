const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {/* Outer container for the spinner itself */}
      <div className="relative w-24 h-24">
        {" "}
        {/* Increased size for more impact */}
        {/* Static Background Ring - slightly darker blue for depth */}
        <div className="absolute inset-0 w-full h-full border-[3px] border-solid border-blue-900 rounded-full opacity-60"></div>
        {/* Main Spinning Ring - primary active blue */}
        <div
          className="absolute inset-0 w-full h-full border-[3px] border-solid border-transparent border-t-blue-400 border-r-blue-400 rounded-full animate-spin"
          // Custom speed/timing if extended in tailwind.config.js: animate-[spin_1.2s_linear_infinite]
        ></div>
        {/* Second Spinning Ring - slightly smaller, different color, and opposite direction */}
        <div
          className="absolute inset-2 w-20 h-20 border-[2px] border-solid border-transparent border-b-cyan-300 border-l-cyan-300 rounded-full animate-[spin_1s_linear_infinite_reverse]"
          // If you define custom animations in tailwind.config.js, you'd use them like this:
          // className="... animate-spin-slow-reverse"
        ></div>
        {/* Optional: Inner pulsating circle for a "core" effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-12 h-12 bg-blue-600 rounded-full animate-pulse-custom opacity-75"
            // For animate-pulse-custom, you'd define it in tailwind.config.js:
            // animation: { 'pulse-custom': 'pulse-custom 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' },
            // keyframes: { 'pulse-custom': { '0%, 100%': { opacity: 0.75, transform: 'scale(1)' }, '50%': { opacity: 0.5, transform: 'scale(0.9)' } } }
          ></div>
        </div>
        <div className="sr-only">Loading</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
