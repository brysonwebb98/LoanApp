import { getUsers, deleteUser, updateRole } from "../models/users.js";

const usersPage = async (req, res) => {
    const users = await getUsers();
    res.render('users', {title: "users", users});
}

const updateUser = async (req, res) => {
    const {user_id, role, action, current_role} = req.body;

    try {
        if (action === 'delete') {

            if (String(user_id) === String(req.session.user_id)) {
                req.flash("error", "Unable to delete admin");
                return res.redirect("/users");
            }
            await deleteUser(user_id)
            req.flash("success", "User Deleted");
            return res.redirect("/users");
        } 
        
        if (action === 'update') {

            if (!role) {
                req.flash("error", "Please select a role.");
                return res.redirect("/users");
            }

            if (String(user_id) === String(req.session.user_id)) {
                req.flash("error", "You cannot update your own role.");
                return res.redirect("/users");
            }

            if (role === current_role) {
                req.flash("error", "You must select a different role.");
                return res.redirect("/users");
            }

            await updateRole(role, user_id)
            req.flash("success", "User Updated");
            return res.redirect("/users");
        }
    } catch(err) {
        console.error("User update error:", err);
        req.flash("error", "Unable to update user");
        return res.redirect("/users");
    }
}

export {usersPage, updateUser};

