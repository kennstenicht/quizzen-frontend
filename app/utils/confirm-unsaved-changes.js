export default function confirmUnsavedChanges(transition, controller) {
  console.log(controller.changeset);
  if (controller.changeset.isDirty) {
    if (!confirm('You have unsaved changes.  Are you sure you want to leave this page?')){
      transition.abort();
    } else {
      controller.changeset.rollback();
    }
  }

  controller.model.rollbackAttributes();
}
