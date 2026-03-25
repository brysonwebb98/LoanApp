import { getAllApplicationsWithDebts } from "../../models/forms/application.js";
import { updateStatus, deleteApplication } from "../../models/loans/review.js";

function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export async function buildManagerDashboard(req, res) {
    const applications = await getAllApplicationsWithDebts();

    console.log(applications);

    res.render("review", {title: "Credit Manager Dashboard", applications, capitalize});
}

async function updateLoanStatus(req, res) {
  try {
    const {application_id, status} = req.body;

    if (!application_id || !status ){
      req.flash("error", "Application ID and status are required.");
      return res.redirect("/review");
    }

    await updateStatus(application_id, status);

    req.flash("success", "Application status updated successfully.")
    return res.redirect("/review");
  } catch(err) {
    console.error("Error updating application status:", err);
    req.flash("error", "Unable to update application status");
    return res.redirect("/review");
  }
}

async function deleteLoanApplication(req, res) {
  try {
    const {application_id} = req.body;

    if (!application_id) {
      req.flash("error", "Application ID not Found");
      return res.redirect("/review");
    }

    const deleted = await deleteApplication(application_id);

    if (!deleted) {
      req.flash("error", "Application not found");
      return res.redirect("/reivew");
    }

    req.flash("success", "Application deleted successfully.")
    return res.redirect("/review");

  } catch(err) {
    console.error(err);
    req.flash("error", "Unable to delete application");
    return res.redirect("/review")
  }
}


export {updateLoanStatus, deleteLoanApplication};