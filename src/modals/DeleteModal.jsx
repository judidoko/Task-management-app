import { PropTypes } from "prop-types";

const DeleteModal = ({
  type,
  title,
  setIsCloseOpenModal,
  onDeleteBtnClick,
}) => {
  return (
    <>
      <div
        className="fixed right-0 bottom-0 left-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 justify-center items-center flex bg-[#00000080]"
        onClick={(e) => {
          if (e.target !== e.currentTarget) {
            return;
          }
          setIsCloseOpenModal(false);
        }}
      >
        <div className="scroll-hide max-w-md max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white w-full px-8 py-8 rounded-xl">
          <h3 className="font-bold text-red-500 text-xl">Delete this {type}</h3>
          {type === "task" ? (
            <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">
              Are you sure you want to delete this &quot;{title}&quot; task and
              it subtasks? NOTE:This action can not be reversed
            </p>
          ) : (
            <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">
              Are you sure you want to delete this &quot;{title}&quot; task and
              it subtasks? <b>NOTE:</b>This action can not be reversed
            </p>
          )}
          <div className="flex w-full mt-4 items-center justify-center space-x-4">
            <button
              onClick={onDeleteBtnClick}
              className="w-full items-center font-semibold text-white hover:opacity-75 bg-red-500 py-2 rounded-full"
            >
              Delete
            </button>
            <button
              onClick={() => setIsCloseOpenModal(false)}
              className="w-full items-center font-semibold hover:opacity-75 bg-[#635fc71a] text-[#655fc7] py-2 rounded-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
DeleteModal.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  onDeleteBtnClick: PropTypes.func,
  setIsCloseOpenModal: PropTypes.func,
};

export default DeleteModal;
