import Form from "@/components/Form";

export default function Modal() {
  return (
    <div
      class="modal fade"
      id="applyModal"
      tabindex="-1"
      aria-labelledby="applyModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="applyModalLabel">
              Apply for Job
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <Form modal={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
