'use client';

interface PDFViewerProps {
  url: string;
  title?: string;
}

export default function PDFViewer({ url, title }: PDFViewerProps) {
  const cleanUrl = `${url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;

  const handleFullScreen = () => {
    window.open(url, '_blank');
  };

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={handleFullScreen}
        className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-lg bg-[#2E4862] px-3 py-1.5 text-xs font-medium text-white shadow hover:bg-[#3a5a7a] transition-colors"
      >
        ⛶ Full Screen
      </button>
      <iframe
        src={cleanUrl}
        title={title ?? 'PDF Viewer'}
        className="h-full w-full border-0"
        style={{ display: 'block', background: 'white' }}
      />
    </div>
  );
}
