import React from "react";

type AlertDialogProps = {
  modalMessage: string;
  setModalVisible: Function;
};

const AlertDialog = ({ modalMessage, setModalVisible }: AlertDialogProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg font-medium">{modalMessage}</p>
        <button
          className="mt-4 px-4 py-2 bg-[#FF6D00] text-white rounded-md font-semibold hover:bg-[#FFB600]"
          onClick={() => {
            setModalVisible(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AlertDialog;
