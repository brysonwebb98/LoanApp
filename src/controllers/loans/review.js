import { getAllApplications } from "../../models/forms/application.js";

function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export async function buildManagerDashboard(req, res) {
    const applications = await getAllApplications();

    res.render("review", {title: "Credit Manager Dashboard", applications, capitalize});
}
