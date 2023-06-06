import Form from "@/components/Form";

export default function Modal() {
  return (
    <div
      className="modal fade"
      id="applyModal"
      tabIndex="-1"
      aria-labelledby="applyModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="applyModalLabel">
              Apply for Job
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <Form modal={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
