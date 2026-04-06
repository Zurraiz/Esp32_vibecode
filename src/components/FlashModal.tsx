'use client';

import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'esp-web-install-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        manifest?: string;
      };
    }
  }
}

interface FlashModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeviceLinked: (deviceId: string) => void;
}

export default function FlashModal({ isOpen, onClose, onDeviceLinked }: FlashModalProps) {
  const [deviceIdInput, setDeviceIdInput] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleLink = () => {
    const trimmed = deviceIdInput.trim();

    if (!trimmed.startsWith('esp32_')) {
      setErrorMessage('Device ID must start with esp32_');
      return;
    }

    setErrorMessage('');
    onDeviceLinked(trimmed);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md mx-4 rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#2E4862]">⚡ Setup Your ESP32</h2>
            <p className="mt-0.5 text-xs text-gray-400">Flash firmware once, control over WiFi forever</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Step 1 - Install Firmware
          </h3>

          <div className="mb-3 rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs text-blue-700">
            Requires Chrome or Edge browser. Connect your ESP32-S3 via USB before clicking install.
          </div>

          <esp-web-install-button manifest="/firmware/manifest.json">
            <button
              slot="activate"
              className="w-full rounded-lg bg-[#2E4862] py-2.5 text-sm font-medium text-white hover:bg-[#1f3346]"
            >
              ⚡ Install Firmware to ESP32
            </button>
          </esp-web-install-button>

          <p className="mt-1 text-center text-xs text-gray-400">
            This will erase the device and install the IoT Platform firmware
          </p>
        </section>

        <div className="my-4 border-t border-gray-100" />

        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Step 2 - Link Your Device
          </h3>

          <p className="mb-3 text-xs text-gray-500">
            After flashing, your ESP32 creates a WiFi hotspot. Connect to it, enter your WiFi password,
            then copy the Device ID shown and paste it below.
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="esp32_XXXXXXXX"
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 font-mono text-sm focus:outline-none focus:border-[#2E4862]"
              value={deviceIdInput}
              onChange={(event) => {
                setDeviceIdInput(event.target.value);
                if (errorMessage) {
                  setErrorMessage('');
                }
              }}
            />

            <button
              type="button"
              onClick={handleLink}
              className="rounded-lg bg-[#2E4862] px-4 py-2 text-sm font-medium text-white hover:bg-[#1f3346]"
            >
              🔗 Link
            </button>
          </div>

          {errorMessage && <p className="mt-1 text-xs text-red-500">{errorMessage}</p>}
        </section>
      </div>
    </div>
  );
}
