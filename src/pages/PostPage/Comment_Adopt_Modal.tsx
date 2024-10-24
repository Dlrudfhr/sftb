import React from "react";

interface CommentAdoptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CommentAdoptModal: React.FC<CommentAdoptModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>이 댓글을 채택하면 더이상 취소할 수 없습니다.</h2>
        <div className="modal-buttons">
          <button onClick={onConfirm}>예</button>
          <button onClick={onClose}>아니오</button>
        </div>
      </div>
    </div>
  );
};

export default CommentAdoptModal;