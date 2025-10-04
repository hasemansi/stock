import Role from "../models/roleModel.js";

// Get all roles
export const getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get role by ID
export const getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) return res.status(404).json({ errorMessage: "Role not found" });
        res.json(role);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Create a new role
export const createRole = async (req, res) => {
    try {
        const { role_id, name } = req.body;

        const role = new Role({ role_id, name });
        await role.save();

        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ errorMessage: error.message });
    }
};

// Update a role
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRole = await Role.findByIdAndUpdate(id, req.body, {
      new: true,   // return updated document
      runValidators: true,
    });

    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({
      message: "Role updated successfully",
      role: updatedRole,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete a role
export const deleteRole = async (req, res) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.params.id);
        if (!deletedRole)
            return res.status(404).json({ errorMessage: "Role not found" });

        res.json({ message: "Role deleted successfully" });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
