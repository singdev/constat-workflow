
const createassuranceDialog = document.querySelector("#newassurance-dialog");
if (!createassuranceDialog.showModal) {
    dialogPolyfill.registerDialog(createassuranceDialog);
}
createassuranceDialog.querySelector('.create').addEventListener('click', () => {
    createassuranceDialog.close();
})
createassuranceDialog.querySelector('.close').addEventListener('click', () => {
    createassuranceDialog.close();
})
document.querySelector("#add-assurance-button").addEventListener('click', () => {
    createassuranceDialog.showModal();
})

function showUpdateassuranceModal(assuranceJson) {

    const assurance = JSON.parse(assuranceJson);

    const updateassuranceDialog = document.querySelector("#updateassurance-dialog");
    if (!updateassuranceDialog.showModal) {
        dialogPolyfill.registerDialog(updateassuranceDialog);
    }
    updateassuranceDialog.querySelector('.update').addEventListener('click', () => {
        updateassuranceDialog.close();
    })
    updateassuranceDialog.querySelector('.close').addEventListener('click', () => {
        updateassuranceDialog.close();
    })
    updateassuranceDialog.showModal();
    const form = document.querySelector('.update-form');
    form.setAttribute('action', 'assurances/' + assurance._id);
    form.querySelector('#email').value = assurance.email;
    form.querySelector('#tf-email').MaterialTextfield.checkDirty();
    document.querySelector('#update-logo').src = "/images/logo-assurances/" + assurance.logo;

    form.querySelector('#isActive').value = assurance.isActive;
    form.querySelector('#tf-isActive').MaterialTextfield.checkDirty();
}