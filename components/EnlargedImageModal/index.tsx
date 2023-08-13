import React from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";

interface EnlargedImageModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

const EnlargedImageModal: React.FC<EnlargedImageModalProps> = ({
  imageUrl,
  onClose,
}) => {
  if (!imageUrl) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="relative w-auto h-[80%]">
        <img
          src={imageUrl}
          alt="Enlarged"
          className="rounded-lg shadow-lg max-w-auto max-h-full"
        />
        <button
          type="button"
          className="absolute top-2 right-2  rounded-full bg-[#FF6D00] shadow-md hover:bg-[#ff5100]"
          onClick={onClose}
        >
          <XCircleIcon className="h-10 w-10 text-gray-100" />
        </button>
      </div>
    </div>
  );
};

export default EnlargedImageModal;
