import ReactModal from 'react-modal'; // Rename the imported Modal

ReactModal.setAppElement('#root'); // Use the renamed import here

const Modal = ({ isOpen, setIsOpen, children }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  const customStyles = {
    content: {
      width: '90%',
      maxWidth: '572px',
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
      height: 'fit-content',
      maxHeight: '90vh',
      background: 'rgba(239, 239, 239, 0.85)',
      border: '0',
      borderRadius: '15px',
      padding: '2rem',
    },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
