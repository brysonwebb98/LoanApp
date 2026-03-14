import { getAllApplications } from "../../models/forms/application.js";

export async function buildManagerDashboard(req, res) {
    const applications = await getAllApplications();

    res.render("review", {title: "Credit Manager Dashboard", applications});
}
